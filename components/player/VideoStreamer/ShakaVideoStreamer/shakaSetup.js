"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shakaSetup = shakaSetup;
exports.shakaCleanup = shakaCleanup;

var _types = require("../types");

function shakaSetup(shakaLib, videoElement, configuration) {
  if (!!window.MediaSource && !!MediaSource.isTypeSupported) {
    const shakaPlayer = new shakaLib.Player(videoElement);

    if (configuration && configuration.shakaPlayer) {
      const shakaConf = configuration.shakaPlayer;

      if (shakaConf.installPolyfills) {
        shakaLib.polyfill.installAll();
      }

      if (shakaConf.customConfiguration) {
        shakaPlayer.configure(shakaConf.customConfiguration);
      }
    }

    const log = shakaLib.log && shakaLib.log;
    const logLevel = configuration && configuration.logLevel;

    if (logLevel != null && log) {
      if (logLevel === 'VERBOSE') {
        log.setLevel(log.Level['V2']);
      } else {
        log.setLevel(log.Level[logLevel]);
      }
    }

    return shakaPlayer;
  } else {
    throw new _types.PlaybackError('STREAM_ERROR_TECHNOLOGY_UNSUPPORTED', 'shaka', 'MPEG-DASH playback with Shaka Player is not supported in this browser.');
  }
}

function shakaCleanup(shakaPlayer) {
  return Promise.resolve(shakaPlayer && shakaPlayer.destroy());
}
//# sourceMappingURL=shakaSetup.js.map