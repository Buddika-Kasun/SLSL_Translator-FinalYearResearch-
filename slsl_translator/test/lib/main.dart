import 'dart:async';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'services/feature_extractor.dart';
import 'services/model_service.dart';

late List<CameraDescription> _cameras;
const double minConfidence = 0.6;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  print("🔵 APP STARTING - Getting cameras...");
  _cameras = await availableCameras();
  print("🔵 Cameras found: ${_cameras.length}");
  runApp(const SLSLApp());
}

class SLSLApp extends StatelessWidget {
  const SLSLApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SLSL → Sinhala',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  CameraController? _controller;
  bool _isCameraReady = false;
  bool _isModelReady = false;
  bool _isInitializing = true;
  bool _isCapturing = false;
  String _prediction = "Loading model...";
  String _confidence = "";
  final List<CameraImage> _frameBuffer = [];
  int _requiredFrames = 280;
  Timer? _captureTimer;
  int _elapsedSeconds = 0;
  Timer? _countdownTimer;

  late ModelService _modelService;
  late FeatureExtractor _extractor;

  final List<Map<String, dynamic>> _history = [];

  @override
  void initState() {
    super.initState();
    print("🟢 HomeScreen initState called");
    _initializeApp();
  }

  Future<void> _initializeApp() async {
    print("\n🟡 === STARTING APP INITIALIZATION === 🟡");

    setState(() {
      _prediction = "Loading model...";
      _isInitializing = true;
    });

    // Initialize services
    print("📦 Creating ModelService instance...");
    _modelService = ModelService();
    print("📦 Creating FeatureExtractor instance...");
    _extractor = FeatureExtractor();

    // Load model - only once
    try {
      print("📱 Calling _modelService.loadModel()...");
      await _modelService.loadModel();

      print("✅ Model load completed successfully");

      setState(() {
        _isModelReady = true;
        _requiredFrames = _modelService.sequenceLength;
        _prediction = "Model loaded! Initializing camera...";
      });

      print("✅ Model ready, sequence length: $_requiredFrames");
    } catch (e, stackTrace) {
      print("❌❌❌ FAILED TO LOAD MODEL ❌❌❌");
      print("Error: $e");
      print("StackTrace: $stackTrace");
      setState(() {
        _isModelReady = false;
        _prediction = "Failed to load model: ${e.toString()}";
        _isInitializing = false;
      });
      return;
    }

    // Initialize camera only if model loaded
    print("📷 Initializing camera...");
    await _initializeCamera();

    setState(() {
      _isInitializing = false;
      _isCameraReady = true;
      _prediction = "Tap START to begin recording";
    });

    print("🟢 === APP FULLY INITIALIZED === 🟢");
    print("   Model Ready: $_isModelReady");
    print("   Camera Ready: $_isCameraReady");
  }

  Future<void> _initializeCamera() async {
    try {
      print("📷 Requesting camera permission...");
      await Permission.camera.request();
      print("📷 Camera permission granted");

      print("📷 Creating CameraController...");
      _controller = CameraController(_cameras[0], ResolutionPreset.medium,
          enableAudio: false);
      await _controller!.initialize();
      print("📷 CameraController initialized");

      await _controller!.startImageStream(_processCameraImage);
      print("📷 Image stream started");
      print("✅ Camera initialized successfully");
    } catch (e) {
      print("❌ Camera initialization failed: $e");
      setState(() {
        _prediction = "Camera error. Check permissions.";
      });
    }
  }

  void _processCameraImage(CameraImage image) {
    if (_isCapturing && _controller != null) {
      _frameBuffer.add(image);
      const int MAX_FRAMES = 280;
      if (_frameBuffer.length >= MAX_FRAMES) {
        print("📹 Max frames reached, stopping capture");
        _stopCapture();
      }
    }
  }

  void _startCapture() {
    print("\n🎬 START CAPTURE REQUESTED");
    print("   _isModelReady: $_isModelReady");
    print("   _isCameraReady: $_isCameraReady");
    print("   _isCapturing: $_isCapturing");

    if (!_isModelReady) {
      print("❌ Capture blocked: Model not ready");
      setState(() {
        _prediction = "Model not ready. Please restart app.";
      });
      return;
    }

    if (!_isCameraReady || _controller == null) {
      print("❌ Capture blocked: Camera not ready");
      setState(() {
        _prediction = "Camera not ready. Please wait...";
      });
      return;
    }

    if (_isCapturing) {
      print("⚠️ Already capturing, ignoring start");
      return;
    }

    print("✅ Starting capture...");
    setState(() {
      _isCapturing = true;
      _prediction = "Recording... 0s";
      _confidence = "";
      _elapsedSeconds = 0;
    });
    _frameBuffer.clear();
    print("   Frame buffer cleared");

    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      _elapsedSeconds++;
      if (_elapsedSeconds >= 10) {
        print("⏰ 10 seconds elapsed, auto-stopping");
        _stopCapture();
      } else {
        if (mounted) {
          setState(() {
            _prediction = "Recording... ${_elapsedSeconds}s";
          });
        }
      }
    });

    _captureTimer = Timer(const Duration(seconds: 10), () {
      print("⏰ Capture timer finished");
      _stopCapture();
    });
  }

  void _stopCapture() {
    if (!_isCapturing) {
      print("⚠️ Stop capture called but not capturing");
      return;
    }

    print("\n🛑 STOP CAPTURE");
    print("   Frames captured: ${_frameBuffer.length}");

    _captureTimer?.cancel();
    _countdownTimer?.cancel();

    if (_frameBuffer.isEmpty) {
      print("❌ No frames captured");
      if (mounted) {
        setState(() {
          _isCapturing = false;
          _prediction = "❌ No frames captured";
        });
      }
      return;
    }

    _processGesture();
  }

  Future<void> _processGesture() async {
    if (mounted) {
      setState(() {
        _isCapturing = false;
        _prediction = "Processing...";
      });
    }

    try {
      // Check model is loaded
      if (!_modelService.isLoaded) {
        throw Exception("Model not loaded");
      }

      print("Processing ${_frameBuffer.length} frames...");

      // Extract features (now includes person detection)
      final features = await _extractor.extractFromFrames(_frameBuffer);

      // Check if person is detected
      if (!features.personDetected) {
        print("❌ No person detected in video");
        if (mounted) {
          setState(() {
            _prediction = "No person detected. Please ensure you are in frame.";
            _confidence = "";
          });
        }
        _frameBuffer.clear();
        return;
      }

      print(
          "✅ Person detected with ${(features.personConfidence * 100).toStringAsFixed(1)}% confidence");
      print("Features extracted: ${features.left.length} frames");

      // Run inference only if person detected
      final result = await _modelService.runInference(
        left: features.left,
        right: features.right,
        pose: features.pose,
        lip: features.lip,
      );

      if (result.confidence >= minConfidence) {
        setState(() {
          _prediction = result.label;
          _confidence = "${(result.confidence * 100).toStringAsFixed(1)}%";
        });
      } else {
        setState(() {
          _prediction =
              "Low confidence (${(result.confidence * 100).toStringAsFixed(1)}%). Please sign clearly.";
          _confidence = "";
        });
      }

      // Add to history
      final historyItem = {
        'timestamp': DateTime.now(),
        'prediction': result.label,
        'confidence': result.confidence,
        'frames': _frameBuffer.length,
        'personDetected': true,
      };
      _history.insert(0, historyItem);

      if (_history.length > 50) {
        _history.removeRange(50, _history.length);
      }

      if (mounted) {
        setState(() {
          _prediction = result.label;
          _confidence = "${(result.confidence * 100).toStringAsFixed(1)}%";
        });
      }

      print("✅ Prediction: ${result.label} (${result.confidence})");
    } catch (e) {
      print("❌ Error during gesture processing: $e");
      if (mounted) {
        setState(() => _prediction = "Error: ${e.toString().split(':').first}");
      }
    } finally {
      _frameBuffer.clear();
    }
  }

  void _showHistoryScreen() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => HistoryScreen(history: _history),
      ),
    );
  }

  @override
  void dispose() {
    print("🔴 HomeScreen disposing...");
    _captureTimer?.cancel();
    _countdownTimer?.cancel();
    _controller?.dispose();
    _modelService.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_isInitializing) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(height: 16),
              Text(_prediction),
            ],
          ),
        ),
      );
    }

    if (!_isModelReady) {
      return Scaffold(
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error, size: 64, color: Colors.red),
                const SizedBox(height: 16),
                Text(_prediction, textAlign: TextAlign.center),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _initializeApp,
                  child: const Text("Retry"),
                ),
              ],
            ),
          ),
        ),
      );
    }

    if (!_isCameraReady || _controller == null) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(height: 16),
              Text(_prediction),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          CameraPreview(_controller!),
          SafeArea(
            child: Column(
              children: [
                Container(
                  color: Colors.black.withOpacity(0.7),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.history, color: Colors.white),
                        onPressed: _showHistoryScreen,
                      ),
                      const Expanded(
                        child: Text(
                          "SLSL → Sinhala Sign Translator",
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: _isModelReady ? Colors.green : Colors.red,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          _isModelReady ? "Model Ready" : "Model Error",
                          style: const TextStyle(fontSize: 10),
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.all(16),
                  color: Colors.black.withOpacity(0.7),
                  child: Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: _isCapturing ? Colors.red : Colors.white,
                          borderRadius: BorderRadius.circular(15),
                        ),
                        child: Text(
                          _prediction,
                          style: TextStyle(
                            fontSize: _isCapturing ? 24 : 32,
                            fontWeight: FontWeight.bold,
                            color: _isCapturing ? Colors.white : Colors.black,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton.icon(
                        onPressed: _isCapturing ? _stopCapture : _startCapture,
                        icon:
                            Icon(_isCapturing ? Icons.stop : Icons.play_arrow),
                        label: Text(_isCapturing ? "STOP" : "START"),
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              _isCapturing ? Colors.red : Colors.green,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 30, vertical: 15),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class HistoryScreen extends StatelessWidget {
  final List<Map<String, dynamic>> history;
  const HistoryScreen({super.key, required this.history});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("History")),
      body: history.isEmpty
          ? const Center(child: Text("No predictions yet"))
          : ListView.builder(
              itemCount: history.length,
              itemBuilder: (context, index) {
                final item = history[index];
                return ListTile(
                  title: Text(item['prediction']),
                  subtitle:
                      Text("${(item['confidence'] * 100).toStringAsFixed(1)}%"),
                  trailing: Text((item['timestamp'] as DateTime)
                      .toString()
                      .substring(11, 19)),
                );
              },
            ),
    );
  }
}
