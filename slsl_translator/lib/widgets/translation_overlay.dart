import 'package:flutter/material.dart';

class TranslationOverlay extends StatelessWidget {
  final String translatedText;
  final double confidence;
  final int bufferSize;
  final int totalBuffer;

  const TranslationOverlay({
    Key? key,
    required this.translatedText,
    required this.confidence,
    required this.bufferSize,
    required this.totalBuffer,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 50,
      left: 20,
      right: 20,
      child: Container(
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.8),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: confidence > 0.8 ? Colors.green : Colors.orange,
            width: 2,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Translation
            Text(
              translatedText,
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontWeight: FontWeight.bold,
                fontFamily: 'NotoSansSinhala',
              ),
              textAlign: TextAlign.center,
            ),

            SizedBox(height: 12),

            // Confidence Bar
            Row(
              children: [
                Text('විශ්වාසය:', style: TextStyle(color: Colors.white70)),
                SizedBox(width: 8),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: confidence,
                      backgroundColor: Colors.grey[800],
                      valueColor: AlwaysStoppedAnimation<Color>(
                        confidence > 0.8 ? Colors.green : Colors.orange,
                      ),
                      minHeight: 8,
                    ),
                  ),
                ),
                SizedBox(width: 8),
                Text(
                  '${(confidence * 100).toStringAsFixed(0)}%',
                  style: TextStyle(color: Colors.white70),
                ),
              ],
            ),

            SizedBox(height: 8),

            // Buffer Progress
            Row(
              children: [
                Icon(Icons.slow_motion_video, color: Colors.white70, size: 16),
                SizedBox(width: 4),
                Text(
                  'රාමු: $bufferSize/$totalBuffer',
                  style: TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
