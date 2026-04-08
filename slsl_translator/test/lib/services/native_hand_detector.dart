import 'dart:async';
import 'dart:typed_data';
import 'package:flutter/services.dart';

class NativeHandDetector {
  static const MethodChannel _channel =
      MethodChannel('com.example.test/hand_detector');

  final StreamController<HandDetectionResult> _controller =
      StreamController<HandDetectionResult>.broadcast();

  Stream<HandDetectionResult> get onHandsDetected => _controller.stream;

  Future<void> initialize() async {
    await _channel.invokeMethod('initialize');
    _channel.setMethodCallHandler(_handleMethodCall);
  }

  Future<void> detectHands(
      Uint8List imageData, int width, int height, int timestamp) async {
    await _channel.invokeMethod('detectHands', {
      'imageData': imageData,
      'width': width,
      'height': height,
      'timestamp': timestamp,
    });
  }

  Future<dynamic> _handleMethodCall(MethodCall call) async {
    if (call.method == 'onHandsDetected') {
      final args = call.arguments as Map;
      final leftHand = _parseHand(args['leftHand']);
      final rightHand = _parseHand(args['rightHand']);
      _controller
          .add(HandDetectionResult(leftHand: leftHand, rightHand: rightHand));
    }
    return null;
  }

  List<List<double>> _parseHand(List<dynamic> handData) {
    if (handData == null || handData.isEmpty) {
      return List.generate(21, (_) => [0.0, 0.0, 0.0, 0.0]);
    }

    final hand = List.generate(21, (_) => [0.0, 0.0, 0.0, 0.0]);
    for (int i = 0; i < handData.length && i < 21; i++) {
      final point = handData[i] as List<dynamic>;
      hand[i][0] = point[0].toDouble();
      hand[i][1] = point[1].toDouble();
      hand[i][2] = point[2].toDouble();
      hand[i][3] = point[3].toDouble();
    }
    return hand;
  }

  void dispose() {
    _channel.invokeMethod('dispose');
    _controller.close();
  }
}

class HandDetectionResult {
  final List<List<double>> leftHand;
  final List<List<double>> rightHand;

  HandDetectionResult({required this.leftHand, required this.rightHand});
}
