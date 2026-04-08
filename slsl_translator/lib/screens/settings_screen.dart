import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:device_info_plus/device_info_plus.dart';
import '../providers/translation_provider.dart';

class SettingsScreen extends StatefulWidget {
  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String _deviceModel = 'Loading...';
  String _appVersion = '1.0.0';

  @override
  void initState() {
    super.initState();
    _getDeviceInfo();
  }

  Future<void> _getDeviceInfo() async {
    try {
      final deviceInfo = DeviceInfoPlugin();
      final androidInfo = await deviceInfo.androidInfo;
      setState(() {
        _deviceModel = '${androidInfo.brand} ${androidInfo.model}';
      });
    } catch (e) {
      setState(() {
        _deviceModel = 'Unknown';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('සැකසුම්'),
        elevation: 0,
      ),
      body: Consumer<TranslationProvider>(
        builder: (context, provider, child) {
          return ListView(
            children: [
              // Appearance Section
              _buildSection(
                title: 'පෙනුම',
                children: [
                  SwitchListTile(
                    title: Text('අඳුරු තේමාව'),
                    subtitle: Text('Dark mode'),
                    value: provider.isDarkMode,
                    onChanged: (value) {
                      provider.updateDarkMode(value);
                      // Here you would implement theme switching
                    },
                    secondary: Icon(Icons.dark_mode),
                  ),
                ],
              ),

              // Translation Settings
              _buildSection(
                title: 'පරිවර්තන සැකසුම්',
                children: [
                  ListTile(
                    leading: Icon(Icons.verified),
                    title: Text('විශ්වාස සීමාව'),
                    subtitle: Text(
                        '${(provider.confidenceThreshold * 100).toStringAsFixed(0)}%'),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: Slider(
                      value: provider.confidenceThreshold,
                      min: 0.5,
                      max: 0.95,
                      divisions: 9,
                      label:
                          '${(provider.confidenceThreshold * 100).toStringAsFixed(0)}%',
                      onChanged: (value) {
                        provider.updateConfidenceThreshold(value);
                      },
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      'අඩු විශ්වාසයක් සහිත පරිවර්තන පෙරහන් කරන්න',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                      ),
                    ),
                  ),
                ],
              ),

              // Camera Settings
              _buildSection(
                title: 'කැමරා සැකසුම්',
                children: [
                  RadioListTile(
                    title: Text('පසුපස කැමරාව'),
                    subtitle: Text('Back camera'),
                    value: 'back',
                    groupValue: provider.selectedCamera,
                    onChanged: (value) {
                      provider.updateSelectedCamera(value.toString());
                    },
                    secondary: Icon(Icons.camera_rear),
                  ),
                  RadioListTile(
                    title: Text('ඉදිරි කැමරාව'),
                    subtitle: Text('Front camera'),
                    value: 'front',
                    groupValue: provider.selectedCamera,
                    onChanged: (value) {
                      provider.updateSelectedCamera(value.toString());
                    },
                    secondary: Icon(Icons.camera_front),
                  ),
                ],
              ),

              // Statistics
              _buildSection(
                title: 'සංඛ්‍යාලේඛන',
                children: [
                  ListTile(
                    leading: Icon(Icons.history),
                    title: Text('සම්පූර්ණ පරිවර්තන'),
                    trailing: Text(
                      '${provider.history.length}',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  ListTile(
                    leading: Icon(Icons.today),
                    title: Text('අද පරිවර්තන'),
                    trailing: Text(
                      '${provider.getTodaysHistory().length}',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),

              // About Section
              _buildSection(
                title: 'යෙදුම ගැන',
                children: [
                  ListTile(
                    leading: Icon(Icons.info),
                    title: Text('අනුවාදය'),
                    subtitle: Text(_appVersion),
                  ),
                  ListTile(
                    leading: Icon(Icons.phone_android),
                    title: Text('උපාංගය'),
                    subtitle: Text(_deviceModel),
                  ),
                  ListTile(
                    leading: Icon(Icons.folder),
                    title: Text('මොඩල් අනුවාදය'),
                    subtitle: Text('1.0.0'),
                  ),
                ],
              ),

              // Danger Zone
              _buildSection(
                title: 'අවදානම් කලාපය',
                children: [
                  ListTile(
                    leading: Icon(Icons.delete, color: Colors.red),
                    title: Text(
                      'සියලු ඉතිහාසය මකන්න',
                      style: TextStyle(color: Colors.red),
                    ),
                    onTap: () {
                      _showDeleteConfirmation(context, provider);
                    },
                  ),
                ],
              ),

              SizedBox(height: 20),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSection(
      {required String title, required List<Widget> children}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Colors.blue[800],
            ),
          ),
        ),
        Card(
          margin: EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            children: children,
          ),
        ),
      ],
    );
  }

  void _showDeleteConfirmation(
      BuildContext context, TranslationProvider provider) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('ඉතිහාසය මකන්න'),
        content:
            Text('සියලු පරිවර්තන ඉතිහාසය මකා දමන්නද? මෙය ආපසු හැරවිය නොහැක.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('අවලංගු කරන්න'),
          ),
          TextButton(
            onPressed: () {
              provider.clearHistory();
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('ඉතිහාසය මකා දමන ලදී'),
                  backgroundColor: Colors.green,
                ),
              );
            },
            style: TextButton.styleFrom(
              foregroundColor: Colors.red,
            ),
            child: Text('මකන්න'),
          ),
        ],
      ),
    );
  }
}
