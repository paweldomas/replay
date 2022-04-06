"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadcastHlsInstance = broadcastHlsInstance;
exports.hlsjsSetup = hlsjsSetup;
exports.hlsjsCleanup = hlsjsCleanup;

var _hls = _interopRequireDefault(require("hls.js"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function broadcastHlsInstance(instanceKeeper, preposition) {
  const hls = instanceKeeper.hls;
  hls && instanceKeeper.subscribers.forEach(subscriber => subscriber(hls, preposition));
}

const debugEnabledLogLevels = ['DEBUG', 'VERBOSE', 'INFO'];

function hlsjsSetup(videoElement, configuration) {
  return new Promise((resolve, reject) => {
    if (_hls.default.isSupported()) {
      const customConfiguration = configuration && configuration.hlsjs && configuration.hlsjs.customConfiguration;

      const hlsConfig = _objectSpread({
        autoStartLoad: false,
        debug: configuration && debugEnabledLogLevels.indexOf(configuration.logLevel) >= 0
      }, customConfiguration);

      const hls = new _hls.default(hlsConfig);
      hls.on(_hls.default.Events.MEDIA_ATTACHED, () => {
        resolve(hls);
      });
      hls.attachMedia(videoElement);
    } else {
      reject(new _types.PlaybackError('STREAM_ERROR_TECHNOLOGY_UNSUPPORTED', 'hlsjs', 'Hls.js is not supported in this browser.'));
    }
  });
}

function hlsjsCleanup(instanceKeeper) {
  const hls = instanceKeeper.hls;

  if (hls) {
    hls.stopLoad();
    broadcastHlsInstance(instanceKeeper, 'off');
    return Promise.resolve(hls.destroy());
  } else {
    return Promise.resolve();
  }
}
//# sourceMappingURL=hlsjsSetup.js.map