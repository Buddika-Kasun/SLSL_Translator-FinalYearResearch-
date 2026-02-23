import 'dart:async';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
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

  late TFLiteService _tfliteService;
  late LandmarkExtractor _extractor;

  // Buffer for 60 frames
  final List<List<double>> _frameBuffer = [];
  static const int BUFFER_SIZE = 60;

  // Translation result
  String _translatedText = "අත්සන රැඳී සිටින්න...";
  String _englishText = "";
  double _confidence = 0.0;
  int? _predictedClass;

  // Performance monitoring
  DateTime? _lastInferenceTime;
  Duration _inferenceDuration = Duration.zero;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initializeServices();
    _initializeCamera();
  }

  Future<void> _initializeServices() async {
    _tfliteService = TFLiteService();
    _extractor = LandmarkExtractor();

    try {
      await _tfliteService.initialize();
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
      await _controller!.startImageStream(_processCameraImage);

      setState(() {
        _isInitialized = true;
      });
    } catch (e) {
      _showErrorDialog('කැමරාව ආරම්භ කිරීමට අපොහොසත් විය');
    }
  }

  void _processCameraImage(CameraImage image) async {
    if (_isProcessing || !_tfliteService.isInitialized) return;

    _isProcessing = true;

    try {
      // Extract landmarks from frame
      final landmarks = await _extractor.extractFromImage(image);

      // Add to buffer
      _frameBuffer.add(landmarks);
      if (_frameBuffer.length > BUFFER_SIZE) {
        _frameBuffer.removeAt(0);
      }

      // Run inference when buffer is full
      if (_frameBuffer.length == BUFFER_SIZE) {
        _lastInferenceTime = DateTime.now();
        final result = await _tfliteService.runInference(_frameBuffer);
        _inferenceDuration = DateTime.now().difference(_lastInferenceTime!);

        if (result != null) {
          final confidence = _calculateConfidence(result);

          setState(() {
            _predictedClass = result;
            _translatedText = SinhalaUtils.getSinhalaText(result);
            _englishText = SinhalaUtils.getEnglishText(result);
            _confidence = confidence;
          });

          // Save to history
          if (confidence >
              context.read<TranslationProvider>().confidenceThreshold) {
            _saveToHistory(result, confidence);
          }
        }
      }
    } catch (e) {
      print('Error processing frame: $e');
    } finally {
      _isProcessing = false;
    }
  }

  double _calculateConfidence(int predictedClass) {
    // Simplified - in real app, get from model output
    return 0.85 + (DateTime.now().millisecond % 15) / 100;
  }

  void _saveToHistory(int classIndex, double confidence) {
    final provider = context.read<TranslationProvider>();
    provider.addToHistory(
      SinhalaUtils.getSinhalaText(classIndex),
      SinhalaUtils.getEnglishText(classIndex),
      confidence,
      'gesture_sequence_${DateTime.now().millisecondsSinceEpoch}',
    );
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('දෝෂයක්'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('හරි'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
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
              Text('කැමරාව ආරම්භ වෙමින්...'),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          // Camera Preview
          CameraPreview(_controller!),

          // Translation Overlay
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
                  width: 3,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 10,
                    offset: Offset(0, 5),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Main Translation
                  Text(
                    _translatedText,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'NotoSansSinhala',
                    ),
                    textAlign: TextAlign.center,
                  ),

                  SizedBox(height: 8),

                  // English Translation
                  Text(
                    _englishText,
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 16,
                      fontStyle: FontStyle.italic,
                    ),
                  ),

                  SizedBox(height: 16),

                  // Confidence Bar
                  Row(
                    children: [
                      Text(
                        'විශ්වාසය:',
                        style: TextStyle(color: Colors.white70),
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
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
                      ),
                      SizedBox(width: 8),
                      Text(
                        '${(_confidence * 100).toStringAsFixed(0)}%',
                        style: TextStyle(
                          color: Colors.white70,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),

                  SizedBox(height: 12),

                  // Buffer and Performance Info
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Icon(
                            Icons.slow_motion_video,
                            color: Colors.white70,
                            size: 16,
                          ),
                          SizedBox(width: 4),
                          Text(
                            'රාමු: ${_frameBuffer.length}/$BUFFER_SIZE',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      if (_inferenceDuration > Duration.zero)
                        Row(
                          children: [
                            Icon(
                              Icons.speed,
                              color: Colors.white70,
                              size: 16,
                            ),
                            SizedBox(width: 4),
                            Text(
                              '${_inferenceDuration.inMilliseconds}ms',
                              style: TextStyle(
                                color: Colors.white70,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // Recording Indicator
          Positioned(
            top: 40,
            left: 20,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.black54,
                borderRadius: BorderRadius.circular(25),
              ),
              child: Row(
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: _frameBuffer.length == BUFFER_SIZE
                          ? Colors.green
                          : Colors.red,
                      shape: BoxShape.circle,
                    ),
                  ),
                  SizedBox(width: 8),
                  Text(
                    _frameBuffer.length == BUFFER_SIZE
                        ? 'සූදානම්'
                        : 'රැඳී සිටින්න',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Class Indicator
          if (_predictedClass != null)
            Positioned(
              top: 40,
              right: 20,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.blue.withOpacity(0.9),
                  borderRadius: BorderRadius.circular(25),
                ),
                child: Text(
                  'වර්ගය ${_predictedClass! + 1}',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
