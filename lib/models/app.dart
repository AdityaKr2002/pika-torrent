import 'package:flutter/material.dart';
import 'package:pikatorrent/storage/shared_preferences.dart';

class AppModel extends ChangeNotifier {
  ThemeMode theme = ThemeMode.system;
  bool termsOfUseAccepted = false;
  bool loaded = false;

  AppModel() {
    _loadSettings();
  }

  _loadSettings() async {
    // Load theme
    final themeName =
        await SharedPrefsStorage.getString('theme') ?? ThemeMode.system.name;
    theme = ThemeMode.values.firstWhere((e) => e.name == themeName);
    // Load terms of use status
    termsOfUseAccepted =
        await SharedPrefsStorage.getBool('termsOfUseAccepted') ??
            termsOfUseAccepted;
    loaded = true;

    notifyListeners();
  }

  void setTheme(ThemeMode value) async {
    SharedPrefsStorage.setString('theme', value.name);
    theme = value;
    notifyListeners();
  }

  void setTermsOfUseAccepted(bool value) async {
    SharedPrefsStorage.setBool('termsOfUseAccepted', value);
    termsOfUseAccepted = value;
    notifyListeners();
  }
}
