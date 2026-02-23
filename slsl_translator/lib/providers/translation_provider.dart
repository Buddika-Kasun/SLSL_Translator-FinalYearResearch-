import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/translation_model.dart';
import '../utils/sinhala_utils.dart';

class TranslationProvider extends ChangeNotifier {
  List<TranslationModel> _history = [];
  double _confidenceThreshold = 0.7;
  bool _isDarkMode = false;
  String _selectedCamera = 'back';

  List<TranslationModel> get history => _history;
  double get confidenceThreshold => _confidenceThreshold;
  bool get isDarkMode => _isDarkMode;
  String get selectedCamera => _selectedCamera;

  TranslationProvider() {
    _loadHistory();
    _loadSettings();
  }

  Future<void> addToHistory(
    String sinhalaText,
    String englishText,
    double confidence,
    String gestureSequence,
  ) async {
    final translation = TranslationModel(
      sinhalaText: sinhalaText,
      englishText: englishText,
      timestamp: DateTime.now(),
      confidence: confidence,
      gestureSequence: gestureSequence,
    );

    _history.insert(0, translation);

    // Keep only last 100 items
    if (_history.length > 100) {
      _history = _history.sublist(0, 100);
    }

    await _saveHistory();
    notifyListeners();
  }

  Future<void> clearHistory() async {
    _history.clear();
    await _saveHistory();
    notifyListeners();
  }

  Future<void> _saveHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final historyJson = _history.map((t) => t.toJson()).toList();
    await prefs.setString('translation_history', json.encode(historyJson));
  }

  Future<void> _loadHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final String? historyString = prefs.getString('translation_history');

    if (historyString != null) {
      try {
        final List<dynamic> decoded = json.decode(historyString);
        _history = decoded
            .map((e) => TranslationModel.fromJson(Map<String, dynamic>.from(e)))
            .toList();
      } catch (e) {
        print('Error loading history: $e');
      }
    }
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _confidenceThreshold = prefs.getDouble('confidence_threshold') ?? 0.7;
    _isDarkMode = prefs.getBool('dark_mode') ?? false;
    _selectedCamera = prefs.getString('selected_camera') ?? 'back';
    notifyListeners();
  }

  Future<void> updateConfidenceThreshold(double value) async {
    _confidenceThreshold = value;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble('confidence_threshold', value);
    notifyListeners();
  }

  Future<void> updateDarkMode(bool value) async {
    _isDarkMode = value;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('dark_mode', value);
    notifyListeners();
  }

  Future<void> updateSelectedCamera(String value) async {
    _selectedCamera = value;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('selected_camera', value);
    notifyListeners();
  }

  List<TranslationModel> getTodaysHistory() {
    final today = DateTime.now();
    return _history.where((t) {
      return t.timestamp.year == today.year &&
          t.timestamp.month == today.month &&
          t.timestamp.day == today.day;
    }).toList();
  }

  Map<String, int> getStatistics() {
    Map<String, int> stats = {};
    for (var t in _history) {
      stats[t.sinhalaText] = (stats[t.sinhalaText] ?? 0) + 1;
    }
    return stats;
  }
}
