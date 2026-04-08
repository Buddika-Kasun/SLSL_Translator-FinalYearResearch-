import 'package:flutter/foundation.dart';

class TFLiteService {
  static final TFLiteService _instance = TFLiteService._internal();
  factory TFLiteService() => _instance;
  TFLiteService._internal();

  bool _isInitialized = false;
  bool get isInitialized => _isInitialized;

  static const int _sequenceLength = 60;
  static const int _featureSize = 384;

  // Mock data for testing UI
  final List<String> _mockSigns = [
    'ආයුබෝවන්',
    'ස්තුතියි',
    'කමක් නැහැ',
    'උදව්',
    'වතුර',
    'කෑම',
    'වැසිකිළිය',
    'රෝහල',
    'වෛද්‍යවරයා',
    'බෙහෙත්',
    'වේදනාව',
    'උණ',
    'හිසරදය',
    'බඩේ අමාරුව',
    'හුස්ම ගැනීම',
    'ඇමතුම',
    'පවුල',
    'මිතුරා',
    'ගෙදර',
    'වැඩ'
  ];

  final List<String> _mockEnglish = [
    'Hello',
    'Thank you',
    'It\'s okay',
    'Help',
    'Water',
    'Food',
    'Bathroom',
    'Hospital',
    'Doctor',
    'Medicine',
    'Pain',
    'Fever',
    'Headache',
    'Stomach ache',
    'Breathing',
    'Call',
    'Family',
    'Friend',
    'Home',
    'Work'
  ];

  Future<void> initialize() async {
    // Simulate loading delay
    await Future.delayed(const Duration(milliseconds: 500));
    _isInitialized = true;
    debugPrint('✅ Mock TFLite Service initialized for UI testing');
    debugPrint('ℹ️ Using mock data - no actual model loaded');
  }

  Future<int?> runInference(List<List<double>> frameBuffer) async {
    if (!_isInitialized) {
      throw Exception('Model not initialized');
    }

    if (frameBuffer.length < _sequenceLength) {
      return null;
    }

    try {
      // Simulate processing delay
      await Future.delayed(const Duration(milliseconds: 80));

      // Generate mock predictions based on buffer content
      // This creates somewhat consistent predictions based on the data
      int predictedClass = _getMockPrediction(frameBuffer);

      // Calculate mock confidence (between 0.6 and 0.95)
      double maxConfidence = 0.65 + (predictedClass % 30) / 100;
      if (maxConfidence > 0.95) maxConfidence = 0.95;

      debugPrint(
          'Mock prediction: class $predictedClass (${_mockSigns[predictedClass]}), Confidence: ${maxConfidence.toStringAsFixed(2)}');

      // Return prediction only if confidence is above threshold
      return maxConfidence > 0.7 ? predictedClass : null;
    } catch (e) {
      debugPrint('Mock inference error: $e');
      return null;
    }
  }

  int _getMockPrediction(List<List<double>> frameBuffer) {
    // Generate a deterministic but varied prediction based on buffer content
    // This makes the UI show different signs over time

    // Calculate a hash from the buffer data
    double sum = 0;
    for (int i = 0; i < frameBuffer.length && i < 10; i++) {
      if (frameBuffer[i].isNotEmpty) {
        sum += frameBuffer[i][frameBuffer[i].length ~/ 2];
      }
    }

    // Use time-based variation to show different signs
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final variation = (timestamp ~/ 2000) % _mockSigns.length;

    // Combine buffer hash and time variation
    int prediction = ((sum * 100).toInt() + variation) % _mockSigns.length;

    return prediction;
  }

  void dispose() {
    _isInitialized = false;
    debugPrint('Mock TFLite Service disposed');
  }
}
