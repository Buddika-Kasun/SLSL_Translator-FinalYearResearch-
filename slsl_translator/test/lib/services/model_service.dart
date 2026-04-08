import 'package:flutter/services.dart';
import 'package:tflite_flutter/tflite_flutter.dart';

class ModelService {
  Interpreter? _interpreter;
  bool _isLoaded = false;
  late int sequenceLength;
  List<String> _labels = [];

  static const int expectedSequenceLength = 280;

  Future<void> loadModel({String modelName = 'model.tflite'}) async {
    print("\n📦 === MODEL SERVICE LOAD START === 📦");

    try {
      print("📂 Loading model file...");
      final modelData = await rootBundle.load('assets/models/$modelName');
      final modelBytes = modelData.buffer.asUint8List();
      print("✅ Model file loaded: ${modelBytes.length} bytes");

      print("🔧 Creating Interpreter...");
      _interpreter = await Interpreter.fromBuffer(modelBytes);

      print("✅ Interpreter created successfully");

      _isLoaded = true;
      sequenceLength = expectedSequenceLength;

      await _loadLabels();
      print("✅✅✅ MODEL LOADED SUCCESSFULLY ✅✅✅");
    } catch (e) {
      print("❌ MODEL LOAD FAILED: $e");
      _isLoaded = false;
      _interpreter = null;
      rethrow;
    }
  }

  Future<void> _loadLabels() async {
    try {
      final labelData = await rootBundle.loadString('assets/labels.txt');
      _labels =
          labelData.split('\n').where((e) => e.trim().isNotEmpty).toList();
      print("✅ Loaded ${_labels.length} labels");
    } catch (e) {
      _labels = List.generate(10, (i) => "Class ${i + 1}");
      print("⚠️ Using fallback labels");
    }
  }

  Future<InferenceResult> runInference({
    required List<List<List<double>>> left,
    required List<List<List<double>>> right,
    required List<List<List<double>>> pose,
    required List<List<List<double>>> lip,
  }) async {
    if (!_isLoaded || _interpreter == null) {
      throw Exception("Model not loaded");
    }

    print("🧠 Running inference...");

    // Model expects exactly 280 frames. Pad or slice to 280.
    const targetFrames = 280;

    // Convert each modality to [280, features] format
    final poseInput =
        _prepareInput(pose, targetFrames, 100); // 25 points × 4 = 100
    final lipInput =
        _prepareInput(lip, targetFrames, 200); // 50 points × 4 = 200
    final leftInput =
        _prepareInput(left, targetFrames, 84); // 21 points × 4 = 84
    final rightInput =
        _prepareInput(right, targetFrames, 84); // 21 points × 4 = 84

    // Add batch dimension: [1, 280, features]
    final poseBatch = [poseInput];
    final lipBatch = [lipInput];
    final leftBatch = [leftInput];
    final rightBatch = [rightInput];

    print(
        "Input shapes: pose=${poseBatch[0].length}x${poseBatch[0][0].length}, "
        "lip=${lipBatch[0].length}x${lipBatch[0][0].length}, "
        "left=${leftBatch[0].length}x${leftBatch[0][0].length}, "
        "right=${rightBatch[0].length}x${rightBatch[0][0].length}");

    // Prepare output
    final output = List.filled(1, List.filled(_labels.length, 0.0));
    final outputs = {0: output};

    final stopwatch = Stopwatch()..start();
    _interpreter!.runForMultipleInputs(
        [poseBatch, lipBatch, leftBatch, rightBatch], outputs);
    stopwatch.stop();

    final scores = outputs[0]![0] as List<double>;
    int predictedClass = 0;
    double maxScore = scores[0];
    for (int i = 1; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
        predictedClass = i;
      }
    }

    final predictedLabel = predictedClass < _labels.length
        ? _labels[predictedClass]
        : "Class ${predictedClass + 1}";

    print(
        "✅ Prediction: $predictedLabel (${(maxScore * 100).toStringAsFixed(2)}%)");
    print("⏱️ Time: ${stopwatch.elapsedMilliseconds}ms");

    return InferenceResult(
      label: predictedLabel,
      confidence: maxScore,
      predictedClass: predictedClass,
      inferenceTimeMs: stopwatch.elapsedMilliseconds.toDouble(),
      allScores: scores,
    );
  }

// Prepare input: convert [frames][points][4] to [targetFrames, expectedFeatures]
  List<List<double>> _prepareInput(
      List<List<List<double>>> data, int targetFrames, int expectedFeatures) {
    final frames = data.length;
    final result = <List<double>>[];

    // Take first targetFrames frames or pad with zeros
    for (int i = 0; i < targetFrames; i++) {
      if (i < frames) {
        // Flatten the frame's points
        final frameFeatures = <double>[];
        for (var point in data[i]) {
          frameFeatures.addAll(point);
        }

        // Pad or truncate to expectedFeatures
        if (frameFeatures.length >= expectedFeatures) {
          result.add(frameFeatures.sublist(0, expectedFeatures));
        } else {
          final padded = List<double>.from(frameFeatures);
          padded.addAll(
              List.filled(expectedFeatures - frameFeatures.length, 0.0));
          result.add(padded);
        }
      } else {
        // Zero pad for missing frames
        result.add(List.filled(expectedFeatures, 0.0));
      }
    }

    return result;
  }
  
  // Convert [frames][points][4] to [1, frames, total_features]
  List<List<List<double>>> _toModelInput(List<List<List<double>>> data) {
    final frames = data.length;
    final frameFeatures = <List<double>>[];

    for (int i = 0; i < frames; i++) {
      final features = <double>[];
      for (var point in data[i]) {
        features.addAll(point);
      }
      frameFeatures.add(features);
    }

    return [frameFeatures]; // Add batch dimension
  }

  void close() {
    _interpreter?.close();
    _isLoaded = false;
  }

  bool get isLoaded => _isLoaded;
  List<String> get labels => _labels;
}

class InferenceResult {
  final String label;
  final double confidence;
  final int predictedClass;
  final double inferenceTimeMs;
  final List<double> allScores;

  InferenceResult({
    required this.label,
    required this.confidence,
    required this.predictedClass,
    required this.inferenceTimeMs,
    required this.allScores,
  });
}
