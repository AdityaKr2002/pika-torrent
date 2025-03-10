import 'package:pikatorrent/engine/session.dart';
import 'package:pikatorrent/engine/torrent.dart';

enum TorrentAddedResponse { added, duplicated }

class TorrentAddError extends Error {}

/// BitTorrent engine abstraction.
abstract interface class Engine {
  // Initialise the engine
  Future init();

  // Dispose the engine
  Future dispose();

  // Add a torrent
  Future<TorrentAddedResponse> addTorrent(
      String? filename, String? metainfo, String? downloadDir);

  // Fetch all torrents
  Future<List<Torrent>> fetchTorrents();

  // Fetch session information (e.g. default download directory)
  Future<Session> fetchSession();

  // Reset torrents engine settings
  Future resetSettings();
}
