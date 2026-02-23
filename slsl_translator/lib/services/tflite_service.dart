import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter/foundation.dart';

class TFLiteService {
  static final TFLiteService _instance = TFLiteService._internal();
  factory TFLiteService() => _instance;
  TFLiteService._internal();

  Interpreter? _interpreter;
  bool get isInitialized => _interpreter != null;

  static const int _sequenceLength = 60;
  static const int _featureSize = 384;

  Future<void> initialize() async {
    try {
      // Load model from assets
      final modelFile =
          await rootBundle.load('assets/models/sentence_model.tflite');

      // Create interpreter with options
      final options = InterpreterOptions()..threads = 4;
      _interpreter = Interpreter.fromBuffer(
        modelFile.buffer.asUint8List(),
        options: options,
      );

      debugPrint('✅ TFLite model initialized');

      // Get input and output details
      if (_interpreter != null) {
        final inputTensors = _interpreter!.getInputTensors();
        final outputTensors = _interpreter!.getOutputTensors();

        debugPrint('Number of input tensors: ${inputTensors.length}');
        debugPrint('Number of output tensors: ${outputTensors.length}');
      }
    } catch (e) {
      debugPrint('❌ Failed to initialize TFLite: $e');
      rethrow;
    }
  }

  Future<int?> runInference(List<List<double>> frameBuffer) async {
    if (_interpreter == null) {
      throw Exception('Model not initialized');
    }

    if (frameBuffer.length < _sequenceLength) {
      return null;
    }

    try {
      // Take only the last _sequenceLength frames
      final recentFrames =
          frameBuffer.sublist(frameBuffer.length - _sequenceLength);

      // Prepare input as List<List<List<double>>> [1, 60, 384]
      final input = <List<List<double>>>[
        recentFrames.map((frame) {
          if (frame.length < _featureSize) {
            return [...frame, ...List.filled(_featureSize - frame.length, 0.0)];
          } else if (frame.length > _featureSize) {
            return frame.sublist(0, _featureSize);
          }
          return frame;
        }).toList()
      ];

      // Prepare output - adjust size based on your model
      // Assuming 20 classes (update this based on your model)
      final output = List.filled(1, List.filled(20, 0.0));

      // Run inference using the simple 'run' method
      _interpreter!.run(input, output);

      // Process results
      final predictions = output[0];
      int predictedClass = 0;
      double maxConfidence = predictions[0];

      for (int i = 1; i < predictions.length; i++) {
        if (predictions[i] > maxConfidence) {
          maxConfidence = predictions[i];
          predictedClass = i;
        }
      }

      debugPrint(
          'Predicted class: $predictedClass, Confidence: $maxConfidence');

      return maxConfidence > 0.7 ? predictedClass : null;
    } catch (e) {
      debugPrint('Inference error: $e');
      return null;
    }
  }

  void dispose() {
    _interpreter?.close();
    _interpreter = null;
  }
}
