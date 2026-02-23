import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/translation_provider.dart';
import '../utils/sinhala_utils.dart';

class HistoryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ඉතිහාසය'),
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.delete),
            onPressed: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: Text('මකන්නද?'),
                  content: Text('සියලු ඉතිහාසය මකා දමන්නද?'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(ctx),
                      child: Text('නැහැ'),
                    ),
                    TextButton(
                      onPressed: () {
                        context.read<TranslationProvider>().clearHistory();
                        Navigator.pop(ctx);
                      },
                      child: Text('ඔව්'),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
      body: Consumer<TranslationProvider>(
        builder: (context, provider, child) {
          if (provider.history.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.history,
                    size: 80,
                    color: Colors.grey[400],
                  ),
                  SizedBox(height: 16),
                  Text(
                    'ඉතිහාසය හිස්ය',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey[600],
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'කැමරාව භාවිතා කර පරිවර්තන ආරම්භ කරන්න',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[500],
                    ),
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            itemCount: provider.history.length,
            padding: EdgeInsets.all(16),
            itemBuilder: (context, index) {
              final item = provider.history[index];
              final time = item.timestamp;

              return Card(
                margin: EdgeInsets.only(bottom: 12),
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: InkWell(
                  onTap: () {
                    _showTranslationDetails(context, item);
                  },
                  borderRadius: BorderRadius.circular(12),
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Sinhala text
                        Text(
                          item.sinhalaText,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'NotoSansSinhala',
                          ),
                        ),

                        SizedBox(height: 4),

                        // English text
                        Text(
                          item.englishText,
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey[600],
                            fontStyle: FontStyle.italic,
                          ),
                        ),

                        SizedBox(height: 12),

                        // Metadata row
                        Row(
                          children: [
                            // Time
                            Container(
                              padding: EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.blue[50],
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.access_time,
                                    size: 14,
                                    color: Colors.blue[800],
                                  ),
                                  SizedBox(width: 4),
                                  Text(
                                    '${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.blue[800],
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),

                            SizedBox(width: 8),

                            // Confidence
                            Container(
                              padding: EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: _getConfidenceColor(item.confidence)
                                    .withOpacity(0.1),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.verified,
                                    size: 14,
                                    color: _getConfidenceColor(item.confidence),
                                  ),
                                  SizedBox(width: 4),
                                  Text(
                                    '${(item.confidence * 100).toStringAsFixed(0)}%',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color:
                                          _getConfidenceColor(item.confidence),
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),

                            Spacer(),

                            // Confidence level in Sinhala
                            Text(
                              SinhalaUtils.formatConfidence(item.confidence),
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }

  Color _getConfidenceColor(double confidence) {
    if (confidence >= 0.8) return Colors.green;
    if (confidence >= 0.6) return Colors.orange;
    return Colors.red;
  }

  void _showTranslationDetails(BuildContext context, dynamic item) {
    showModalBottomSheet(
      context: context,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Container(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            SizedBox(height: 20),
            Text(
              'විස්තර',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            _buildDetailRow('සිංහල', item.sinhalaText),
            _buildDetailRow('ඉංග්‍රීසි', item.englishText),
            _buildDetailRow(
              'වේලාව',
              '${item.timestamp.year}-${item.timestamp.month}-${item.timestamp.day} ${item.timestamp.hour}:${item.timestamp.minute}',
            ),
            _buildDetailRow(
                'විශ්වාසය', '${(item.confidence * 100).toStringAsFixed(1)}%'),
            _buildDetailRow('අනුක්‍රමය', item.gestureSequence),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 100,
            child: Text(
              '$label:',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.grey[700],
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontFamily: label == 'සිංහල' ? 'NotoSansSinhala' : null,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
