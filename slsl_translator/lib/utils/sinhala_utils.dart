class SinhalaUtils {
  // Medical terms in Sinhala
  static const Map<int, String> classNames = {
    0: "මට උණ තියෙනවා",
    1: "මගේ ඔසුසල කොහෙද",
    2: "මට හුස්ම ගන්න අමාරුයි",
    3: "මගේ උදරය රිදෙනවා",
    4: "මට වෛද්‍යවරයෙක් අවශ්‍යයි",
    5: "මගේ අත රිදෙනවා",
    6: "මට බෙහෙත් ඕනේ",
    7: "මට රෝහලට යන්න ඕනේ",
    8: "මට ඔක්කාරය තියෙනවා",
    9: "මගේ හිස රිදෙනවා",
    10: "මට දන්ත වේදනාවක් තියෙනවා",
    11: "මගේ ඇස පෙනීම අඩුයි",
    12: "මට අසාත්මිකතා තියෙනවා",
    13: "මගේ රුධිර පීඩනය වැඩියි",
    14: "මට දියවැඩියාව තියෙනවා",
    15: "මට හදවත රිදෙනවා",
    16: "මගේ කැස්ස නවතින්නේ නැහැ",
    17: "මට උණ සහ මිරිස් ගතිය",
    18: "මගේ පිට කැක්කුම",
    19: "මට ආහාර ජීර්ණ ගැටලු",
  };

  static const Map<int, String> englishTranslations = {
    0: "I have fever",
    1: "Where is my medicine",
    2: "I have difficulty breathing",
    3: "My stomach hurts",
    4: "I need a doctor",
    5: "My hand hurts",
    6: "I need medicine",
    7: "I need to go to hospital",
    8: "I feel nauseous",
    9: "My head hurts",
    10: "I have toothache",
    11: "My vision is blurry",
    12: "I have allergies",
    13: "My blood pressure is high",
    14: "I have diabetes",
    15: "My heart hurts",
    16: "My cough won't stop",
    17: "I have fever and chills",
    18: "My back hurts",
    19: "I have digestive issues",
  };

  static String getSinhalaText(int index) {
    return classNames[index] ?? "නොදනී";
  }

  static String getEnglishText(int index) {
    return englishTranslations[index] ?? "Unknown";
  }

  static String formatConfidence(double confidence) {
    int percent = (confidence * 100).round();
    if (percent >= 90) return "ඉතා හොඳ";
    if (percent >= 70) return "හොඳයි";
    if (percent >= 50) return "සාමාන්‍ය";
    return "අඩුයි";
  }

  static String formatDateSinhala(DateTime date) {
    final months = [
      'ජනවාරි',
      'පෙබරවාරි',
      'මාර්තු',
      'අප්‍රේල්',
      'මැයි',
      'ජූනි',
      'ජූලි',
      'අගෝස්තු',
      'සැප්තැම්බර්',
      'ඔක්තෝබර්',
      'නොවැම්බර්',
      'දෙසැම්බර්'
    ];

    return '${date.year} ${months[date.month - 1]} ${date.day}';
  }

  static List<String> getSuggestions(String query) {
    if (query.isEmpty) return [];

    return classNames.values.where((term) => term.contains(query)).toList();
  }
}
