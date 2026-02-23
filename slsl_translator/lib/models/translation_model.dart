class TranslationModel {
  final String sinhalaText;
  final String englishText;
  final DateTime timestamp;
  final double confidence;
  final String gestureSequence;

  TranslationModel({
    required this.sinhalaText,
    required this.englishText,
    required this.timestamp,
    required this.confidence,
    required this.gestureSequence,
  });

  Map<String, dynamic> toJson() {
    return {
      'sinhalaText': sinhalaText,
      'englishText': englishText,
      'timestamp': timestamp.toIso8601String(),
      'confidence': confidence,
      'gestureSequence': gestureSequence,
    };
  }

  factory TranslationModel.fromJson(Map<String, dynamic> json) {
    return TranslationModel(
      sinhalaText: json['sinhalaText'],
      englishText: json['englishText'],
      timestamp: DateTime.parse(json['timestamp']),
      confidence: json['confidence'],
      gestureSequence: json['gestureSequence'],
    );
  }
}

class GestureFrame {
  final List<double> landmarks;
  final double timestamp;

  GestureFrame({
    required this.landmarks,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() {
    return {
      'landmarks': landmarks,
      'timestamp': timestamp,
    };
  }

  factory GestureFrame.fromJson(Map<String, dynamic> json) {
    return GestureFrame(
      landmarks: List<double>.from(json['landmarks']),
      timestamp: json['timestamp'],
    );
  }
}
