import 'package:flutter/material.dart';

class TextSearch extends StatefulWidget {
  final Function(String) onChange;

  const TextSearch({super.key, required this.onChange});

  @override
  State<TextSearch> createState() => _TextSearchState();
}

class _TextSearchState extends State<TextSearch> {
  final _filterController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _filterController
        .addListener(() => widget.onChange(_filterController.text));
  }

  @override
  void dispose() {
    _filterController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: _filterController,
      decoration: InputDecoration(
        labelText: 'Filter',
        border: InputBorder.none,
        prefixIcon: const Icon(Icons.search),
        suffixIcon: _filterController.text.isNotEmpty
            ? IconButton(
                icon: const Icon(Icons.clear),
                onPressed: () {
                  _filterController.clear();
                },
              )
            : null,
      ),
    );
  }
}