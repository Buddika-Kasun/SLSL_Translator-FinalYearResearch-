import 'dart:typed_data';
import 'dart:math' as math;
import 'package:camera/camera.dart';
import 'package:image/image.dart' as img;
import 'package:flutter/foundation.dart';

class LandmarkExtractor {
  static const int _targetWidth = 256;
  static const int _targetHeight = 256;
  static const int _featureSize = 384;

  final math.Random _random = math.Random();

  Future<List<double>> extractFromImage(CameraImage cameraImage) async {
    try {
      // Convert YUV420 to RGB
      final rgbData = _convertYUV420ToRGB(cameraImage);

      // Create image from bytes - FIXED: Use correct ByteBuffer
      final image = img.Image.fromBytes(
        width: cameraImage.width,
        height: cameraImage.height,
        bytes: rgbData, 
      );

      // Resize to target size
      final resized = img.copyResize(
        image,
        width: _targetWidth,
        height: _targetHeight,
      );

      // Extract features (simplified - in production use MediaPipe)
      final features = _extractSimplifiedFeatures(resized);

      return features;
    } catch (e) {
      debugPrint('Error extracting landmarks: $e');
      return List.filled(_featureSize, 0.0);
    }
  }

  ByteBuffer _convertYUV420ToRGB(CameraImage image) {
    final int width = image.width;
    final int height = image.height;

    final yPlane = image.planes[0];
    final uPlane = image.planes[1];
    final vPlane = image.planes[2];

    final yBytes = yPlane.bytes;
    final uBytes = uPlane.bytes;
    final vBytes = vPlane.bytes;

    // Create Uint8List for RGB data
    final rgbBytes = Uint8List(width * height * 3);

    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        final int yIndex = y * yPlane.bytesPerRow + x;
        final int uvIndex = (y ~/ 2) * uPlane.bytesPerRow + (x ~/ 2) * 2;

        final int yVal = yBytes[yIndex] & 0xFF;
        final int uVal = uBytes[uvIndex] & 0xFF;
        final int vVal = vBytes[uvIndex + 1] & 0xFF;

        // Convert YUV to RGB
        int r = (yVal + 1.402 * (vVal - 128)).toInt();
        int g = (yVal - 0.344 * (uVal - 128) - 0.714 * (vVal - 128)).toInt();
        int b = (yVal + 1.772 * (uVal - 128)).toInt();

        // Clamp values
        r = r.clamp(0, 255);
        g = g.clamp(0, 255);
        b = b.clamp(0, 255);

        final rgbIndex = (y * width + x) * 3;
        rgbBytes[rgbIndex] = r;
        rgbBytes[rgbIndex + 1] = g;
        rgbBytes[rgbIndex + 2] = b;
      }
    }

    return rgbBytes.buffer;
  }

  List<double> _extractSimplifiedFeatures(img.Image image) {
    List<double> features = List.filled(_featureSize, 0.0);

    // Left hand region (simulated) - 84 features (21 points × 4 values)
    for (int i = 0; i < 84; i += 4) {
      features[i] = _random.nextDouble();
      features[i + 1] = _random.nextDouble();
      features[i + 2] = _random.nextDouble();
      features[i + 3] = 1.0;
    }

    // Pose region (simulated) - 100 features (25 points × 4 values)
    for (int i = 84; i < 184; i += 4) {
      features[i] = _random.nextDouble();
      features[i + 1] = _random.nextDouble();
      features[i + 2] = _random.nextDouble();
      features[i + 3] = 1.0;
    }

    // Lip region (simulated) - 200 features (50 points × 4 values)
    for (int i = 184; i < 384; i += 4) {
      features[i] = _random.nextDouble();
      features[i + 1] = _random.nextDouble();
      features[i + 2] = _random.nextDouble();
      features[i + 3] = 1.0;
    }

    return features;
  }
}
