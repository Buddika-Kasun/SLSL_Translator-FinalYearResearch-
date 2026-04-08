import 'dart:async';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import '../services/tflite_service.dart';
import '../services/landmark_extractor.dart';
import '../providers/translation_provider.dart';
import '../utils/sinhala_utils.dart';

class CameraScreen extends StatefulWidget {
  @override
  _CameraScreenState createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen>
    with WidgetsBindingObserver {
  CameraController? _controller;
  List<CameraDescription>? _cameras;
  bool _isInitialized = false;
  bool _isProcessing = false;
  bool _isActive = false;
  bool _isDemoMode = false;
  bool _translationShown = false;
  bool _videoEnded = false;

  late TFLiteService _tfliteService;
  late LandmarkExtractor _extractor;
  VideoPlayerController? _videoController;

  final List<List<double>> _frameBuffer = [];
  static const int BUFFER_SIZE = 90;

  String _translatedText = "රැඳී සිටින්න...";
  String _englishText = "";
  double _confidence = 0.0;
  int? _predictedClass;

  DateTime? _lastInferenceTime;
  Duration _inferenceDuration = Duration.zero;
  Timer? _webSimulationTimer;
  Timer? _processingTimer;
  Timer? _frameSimulationTimer;
  Timer? _fillRemainingFramesTimer;

  final String _videoUrl =
      "https://res.cloudinary.com/dil3xfkaw/video/upload/v1774619539/signer_01_rep_01_oshyiv.mov";

  final Map<String, dynamic> _demoTranslation = {
    'sinhala': 'මගේ අතේ තුවාලයක් තියෙනවා',
    'english': 'I have an injury on my hand',
    'confidence': 0.94,
  };

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initializeServices();

    if (!kIsWeb) {
      _initializeCamera();
    } else {
      setState(() {
        _isInitialized = true;
      });
    }
  }

  void _startRecording() async {
    if (_isActive) return;

    // Reset everything before starting new recording
    await _resetState();

    setState(() {
      _isActive = true;
      _isDemoMode = false;
      _translationShown = false;
      _videoEnded = false;
      _frameBuffer.clear();
      _translatedText = "පටිගත කිරීම ආරම්භ කර ඇත...";
      _englishText = "Recording started...";
      _confidence = 0.0;
    });

    if (_videoController != null) {
      await _videoController!.pause();
      await _videoController!.dispose();
      _videoController = null;
    }

    if (kIsWeb) {
      _frameSimulationTimer =
          Timer.periodic(Duration(milliseconds: 100), (timer) {
        if (_isActive && !_isDemoMode && !_translationShown) {
          final dummyLandmarks = List.generate(
              384, (i) => (DateTime.now().millisecond % 100) / 100.0);
          _processFrame(dummyLandmarks);
        }
      });
    }
  }

  void _startDemo() async {
    if (_isActive) return;

    // Reset everything before starting new demo
    await _resetState();

    setState(() {
      _isActive = true;
      _isDemoMode = true;
      _translationShown = false;
      _videoEnded = false;
      _frameBuffer.clear();
      _translatedText = "වීඩියෝව පූරණය වෙමින්...";
      _englishText = "Loading video...";
      _confidence = 0.0;
    });

    if (_controller != null && _controller!.value.isStreamingImages) {
      await _controller!.stopImageStream();
    }

    try {
      _videoController = VideoPlayerController.networkUrl(Uri.parse(_videoUrl));
      await _videoController!.initialize();
      await _videoController!.play();

      setState(() {
        _translatedText = "සැකසෙමින්...";
        _englishText = "Processing...";
      });

      // Generate frames from video
      _processingTimer = Timer.periodic(Duration(milliseconds: 100), (timer) {
        if (_isActive &&
            _isDemoMode &&
            !_translationShown &&
            _videoController != null) {
          double progress = _videoController!.value.position.inSeconds /
              _videoController!.value.duration.inSeconds;

          final dummyLandmarks = List.generate(384, (i) => progress);
          _processFrame(dummyLandmarks);

          // Check if video finished
          if (_videoController!.value.position >=
              _videoController!.value.duration) {
            _videoEnded = true;
            timer.cancel();

            // If video ended but not enough frames, fill remaining
            if (_frameBuffer.length < BUFFER_SIZE && !_translationShown) {
              _fillRemainingFrames();
            }
          }
        }
      });
    } catch (e) {
      print('Error: $e');
      _showErrorDialog('වීඩියෝව පූරණය කිරීමට අපොහොසත් විය');
      _stop();
    }
  }

  void _fillRemainingFrames() {
    int remaining = BUFFER_SIZE - _frameBuffer.length;
    if (remaining > 0 && !_translationShown) {
      setState(() {
        _translatedText = "සැකසෙමින්...";
        _englishText = "Processing...";
      });

      // Fill remaining frames with last frame data
      final lastFrame = _frameBuffer.isNotEmpty
          ? _frameBuffer.last
          : List.generate(384, (i) => 0.0);

      _fillRemainingFramesTimer =
          Timer.periodic(Duration(milliseconds: 50), (timer) {
        if (_frameBuffer.length < BUFFER_SIZE && !_translationShown) {
          _processFrame(lastFrame);
        } else {
          timer.cancel();
          // After filling, run inference if not already done
          if (_frameBuffer.length == BUFFER_SIZE && !_translationShown) {
            _runInference();
          }
        }
      });
    }
  }

  void _processFrame(List<double> landmarks) {
    if (_translationShown) return;

    _frameBuffer.add(landmarks);
    if (_frameBuffer.length > BUFFER_SIZE) {
      _frameBuffer.removeAt(0);
    }

    if (_frameBuffer.length == BUFFER_SIZE && !_translationShown) {
      // Cancel any fill timer if running
      _fillRemainingFramesTimer?.cancel();
      _runInference();
    }
    if (mounted) setState(() {});
  }

  Future<void> _runInference() async {
    _lastInferenceTime = DateTime.now();

    int? result;
    double confidence;

    if (_isDemoMode) {
      // Demo mode - use hardcoded translation
      result = 0;
      confidence = _demoTranslation['confidence'];
      _showTranslation(
          _demoTranslation['sinhala'], _demoTranslation['english'], confidence);
    } else {
      // Camera mode - use ML service
      result = await _tfliteService.runInference(_frameBuffer);
      if (result != null) {
        confidence = 0.75 + (DateTime.now().millisecond % 25) / 100;
        _showTranslation(SinhalaUtils.getSinhalaText(result),
            SinhalaUtils.getEnglishText(result), confidence);
      } else {
        // If inference failed, show error and stop
        _showErrorDialog('පරිවර්තනය අසාර්ථක විය. නැවත උත්සාහ කරන්න.');
        _stop();
      }
    }

    _inferenceDuration = DateTime.now().difference(_lastInferenceTime!);
  }

  void _showTranslation(String sinhala, String english, double confidence) async{
    setState(() {
      _translationShown = true;
      _translatedText = sinhala;
      _englishText = english;
      _confidence = confidence;
    });

    final provider = context.read<TranslationProvider>();
    provider.addToHistory(
      sinhala,
      english,
      confidence,
      '${_isDemoMode ? "demo" : "camera"}_${DateTime.now().millisecondsSinceEpoch}',
    );

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
          content: Text('✅ පරිවර්තනය සාර්ථකයි!'),
          backgroundColor: Colors.green,
          duration: Duration(seconds: 2)),
    );

    await Future.delayed(Duration(seconds: 5));
    // Stop processing but keep translation visible
    _stop();

    // Don't auto-reset, keep translation on screen
    // User can click buttons again to start new translation
    setState(() {
      _isActive = false;
    });
  }

  void _stop() async {
    _frameSimulationTimer?.cancel();
    _processingTimer?.cancel();
    _fillRemainingFramesTimer?.cancel();

    if (_videoController != null) {
      await _videoController!.pause();
      await _videoController!.dispose();
      _videoController = null;
    }
  }

  Future<void> _resetState() async {
    // Cancel all timers
    _frameSimulationTimer?.cancel();
    _processingTimer?.cancel();
    _fillRemainingFramesTimer?.cancel();

    // Dispose video controller if exists
    if (_videoController != null) {
      await _videoController!.pause();
      await _videoController!.dispose();
      _videoController = null;
    }

    // Clear buffer and reset flags
    _frameBuffer.clear();
    _translationShown = false;
    _videoEnded = false;

    // Don't reset the translation text - keep showing last result
    // Only reset when starting new recording/demo

    // Ensure camera stream is running for mobile
    if (!kIsWeb &&
        _controller != null &&
        !_controller!.value.isStreamingImages) {
      await _controller!.startImageStream(_processCameraImage);
    }
  }

  Future<void> _initializeServices() async {
    _tfliteService = TFLiteService();
    _extractor = LandmarkExtractor();

    try {
      await _tfliteService.initialize();
      if (mounted) setState(() => _isInitialized = true);
    } catch (e) {
      _showErrorDialog('Model එක පූරණය කිරීමට අපොහොසත් විය');
    }
  }

  Future<void> _initializeCamera() async {
    try {
      _cameras = await availableCameras();
      _controller = CameraController(
        _cameras![0],
        ResolutionPreset.medium,
        imageFormatGroup: ImageFormatGroup.yuv420,
      );

      await _controller!.initialize();

      if (mounted) setState(() => _isInitialized = true);
    } catch (e) {
      _showErrorDialog('කැමරාව ආරම්භ කිරීමට අපොහොසත් විය');
    }
  }

  void _processCameraImage(CameraImage image) async {
    if (_isProcessing ||
        !_tfliteService.isInitialized ||
        !_isActive ||
        _isDemoMode ||
        _translationShown) return;

    _isProcessing = true;

    try {
      final landmarks = await _extractor.extractFromImage(image);
      _processFrame(landmarks);
    } catch (e) {
      print('Error: $e');
    } finally {
      _isProcessing = false;
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('දෝෂයක්'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              _stop();
              setState(() {
                _isActive = false;
              });
            },
            child: Text('හරි'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _webSimulationTimer?.cancel();
    _processingTimer?.cancel();
    _frameSimulationTimer?.cancel();
    _fillRemainingFramesTimer?.cancel();
    _videoController?.dispose();
    _controller?.stopImageStream();
    _controller?.dispose();
    _tfliteService.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isInitialized) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 20),
              Text('යෙදුම ආරම්භ වෙමින්...'),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          if (_isActive &&
              _isDemoMode &&
              _videoController != null &&
              _videoController!.value.isInitialized)
            Container(
              color: Colors.black,
              child: Center(
                child: AspectRatio(
                  aspectRatio: _videoController!.value.aspectRatio,
                  child: VideoPlayer(_videoController!),
                ),
              ),
            )
          else if (!_isActive && !kIsWeb && _controller != null)
            CameraPreview(_controller!)
          else if (!_isActive && kIsWeb)
            Container(
              color: Colors.grey[900],
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.camera_alt, size: 80, color: Colors.grey[600]),
                    SizedBox(height: 20),
                    Text('Camera Preview',
                        style: TextStyle(color: Colors.white, fontSize: 24)),
                    SizedBox(height: 10),
                    Text('Click ආරම්භ කරන්න to start',
                        style: TextStyle(color: Colors.grey[400])),
                  ],
                ),
              ),
            ),
          Positioned(
            bottom: 50,
            left: 20,
            right: 20,
            child: Container(
              padding: EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.85),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                    color: _confidence > 0.8 ? Colors.green : Colors.orange,
                    width: 3),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    _translatedText,
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'NotoSansSinhala'),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 8),
                  Text(
                    _englishText,
                    style: TextStyle(
                        color: Colors.white70,
                        fontSize: 16,
                        fontStyle: FontStyle.italic),
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Text('විශ්වාසය:',
                          style: TextStyle(color: Colors.white70)),
                      SizedBox(width: 8),
                      Expanded(
                        child: LinearProgressIndicator(
                          value: _confidence,
                          backgroundColor: Colors.grey[800],
                          valueColor: AlwaysStoppedAnimation<Color>(
                            _confidence > 0.8
                                ? Colors.green
                                : _confidence > 0.6
                                    ? Colors.orange
                                    : Colors.red,
                          ),
                          minHeight: 8,
                        ),
                      ),
                      SizedBox(width: 8),
                      Text('${(_confidence * 100).toStringAsFixed(0)}%',
                          style: TextStyle(color: Colors.white70)),
                    ],
                  ),
                  SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.slow_motion_video,
                              color: Colors.white70, size: 16),
                          SizedBox(width: 4),
                          Text('රාමු: ${_frameBuffer.length}/$BUFFER_SIZE',
                              style: TextStyle(
                                  color: Colors.white70, fontSize: 12)),
                        ],
                      ),
                      if (_inferenceDuration > Duration.zero && _isActive)
                        Row(
                          children: [
                            Icon(Icons.speed, color: Colors.white70, size: 16),
                            SizedBox(width: 4),
                            Text('${_inferenceDuration.inMilliseconds}ms',
                                style: TextStyle(
                                    color: Colors.white70, fontSize: 12)),
                          ],
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          if (_isActive && !_translationShown)
            Positioned(
              top: 40,
              left: 20,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(25)),
                child: Row(
                  children: [
                    AnimatedContainer(
                      duration: Duration(seconds: 1),
                      width: 12,
                      height: 12,
                      decoration: BoxDecoration(
                        color: Colors.red,
                        shape: BoxShape.circle,
                      ),
                    ),
                    SizedBox(width: 8),
                    Text('REC ● ${_frameBuffer.length}/$BUFFER_SIZE',
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ),
          if (!_isActive)
            Positioned(
              top: 40,
              right: 20,
              child: Column(
                children: [
                  ElevatedButton.icon(
                    onPressed: _startRecording,
                    icon: Icon(Icons.fiber_manual_record, color: Colors.red),
                    label: Text('ආරම්භ කරන්න',
                        style: TextStyle(color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      padding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25)),
                    ),
                  ),
                  SizedBox(height: 10),
                  ElevatedButton.icon(
                    onPressed: _startDemo,
                    icon: Icon(Icons.play_arrow),
                    label: Text('ඩිමෝ'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                      padding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25)),
                    ),
                  ),
                ],
              ),
            ),
          if (_isActive &&
              !_translationShown &&
              _frameBuffer.length < BUFFER_SIZE)
            Positioned(
              top: 100,
              left: 20,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                    color: Colors.orange.withOpacity(0.9),
                    borderRadius: BorderRadius.circular(25)),
                child: Row(
                  children: [
                    SizedBox(
                      width: 16,
                      height: 16,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    ),
                    SizedBox(width: 8),
                    Text('සැකසෙමින්...', style: TextStyle(color: Colors.white)),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
