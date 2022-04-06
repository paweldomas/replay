"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hls = _interopRequireDefault(require("hls.js"));

var _types = require("../types");

var _hlsjsSetup = require("./hlsjsSetup");

var _sourceNormalizer = _interopRequireDefault(require("../common/sourceNormalizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSourceChangeHandler = instanceKeeper => (nextProps, prevProps) => {
  const videoElement = instanceKeeper.videoElement;
  (0, _hlsjsSetup.hlsjsCleanup)(instanceKeeper);
  const source = (0, _sourceNormalizer.default)(nextProps.source);

  if (source) {
    return (0, _hlsjsSetup.hlsjsSetup)(videoElement, nextProps.configuration).then(hls => {
      instanceKeeper.hls = hls; // window.hls = hls;

      (0, _hlsjsSetup.broadcastHlsInstance)(instanceKeeper, 'on');
      return new Promise((resolve, reject) => {
        const onMediaLoaded = () => {
          hls.off(_hls.default.Events.MANIFEST_PARSED, onMediaLoaded);

          try {
            if (source.startPosition) {
              hls.startLoad(source.startPosition);
            } else {
              hls.startLoad();
            }

            resolve();
          } catch (e) {
            reject(new _types.PlaybackError('STREAM_ERROR', 'hlsjs', 'Stream load start failed.', 'FATAL', e));
          }
        };

        try {
          hls.on(_hls.default.Events.MANIFEST_PARSED, onMediaLoaded);
          hls.loadSource(source.streamUrl);
        } catch (e) {
          reject(new _types.PlaybackError('STREAM_ERROR', 'hlsjs', 'Stream load failed.', 'FATAL', e));
        }
      });
    });
  }
  /* else if (prevProps && prevProps.source) {
  // And no new source.
  return Promise.resolve(instanceKeeper.hls && instanceKeeper.hls.stopLoad());
  }*/
  else {
      return Promise.resolve();
    }
};

var _default = getSourceChangeHandler;
exports.default = _default;
//# sourceMappingURL=hlsjsSourceChangeHandler.js.map