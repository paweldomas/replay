"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createVideoStreamerComponent = _interopRequireDefault(require("../common/createVideoStreamerComponent"));

var _rxStreamRangeHelper = _interopRequireDefault(require("./rxStreamRangeHelper"));

var _rxSourceChangeHandler = _interopRequireDefault(require("./rxSourceChangeHandler"));

var _filteredStreamStateUpdater = _interopRequireDefault(require("../common/filteredStreamStateUpdater"));

var _propertyApplier = require("../common/propertyApplier");

var _playbackLifeCycleManager = _interopRequireDefault(require("../common/playbackLifeCycleManager"));

var _rxEventHandlers = _interopRequireDefault(require("./rxEventHandlers"));

var _renderers = require("../common/renderers");

var _logger = require("../common/logger");

var _rxPlayer = _interopRequireDefault(require("rx-player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function resolveImplementation(streamer, configuration, videoElement) {
  const options = configuration && configuration.rxPlayer && configuration.rxPlayer.customConfiguration;
  const logLevel = configuration && configuration.logLevel;

  if (logLevel) {
    if (logLevel === 'VERBOSE') {
      _rxPlayer.default.LogLevel = 'DEBUG';
    } else {
      _rxPlayer.default.LogLevel = logLevel;
    }
  }

  const rxPlayer = new _rxPlayer.default(_objectSpread({
    stopAtEnd: true
  }, options, {
    videoElement
  }));
  videoElement.autoplay = false;
  const streamRangeHelper = (0, _rxStreamRangeHelper.default)(rxPlayer, configuration);
  const handleSourceChange = (0, _rxSourceChangeHandler.default)(rxPlayer);
  const updateStreamState = (0, _filteredStreamStateUpdater.default)(streamer);
  const applyProperties = (0, _propertyApplier.getPropertyApplier)(videoElement, streamRangeHelper);

  const _getArrayLogger = (0, _logger.getArrayLogger)(window, 'videoEvents'),
        log = _getArrayLogger.log;

  const rxEventHandlers = (0, _rxEventHandlers.default)({
    streamer,
    videoElement,
    rxPlayer,
    streamRangeHelper,
    configuration,
    applyProperties,
    updateStreamState,
    log
  });
  const videoElementEventHandlers = rxEventHandlers.videoElementEventHandlers,
        setLifeCycleManager = rxEventHandlers.setLifeCycleManager;
  const playbackLifeCycleManager = (0, _playbackLifeCycleManager.default)(updateStreamState, rxEventHandlers.pauseStreamRangeUpdater, (0, _logger.getArrayLogger)(window, 'lifecycle').log);
  setLifeCycleManager(playbackLifeCycleManager);

  function cleanup() {
    playbackLifeCycleManager.cleanup();
    rxEventHandlers.cleanup();
    rxPlayer.stop();
    rxPlayer.dispose();
    return Promise.resolve();
  }

  const startPlaybackSession = playbackLifeCycleManager.startPlaybackSession,
        endPlaybackSession = playbackLifeCycleManager.endPlaybackSession;
  const thirdPartyPlayer = rxPlayer;
  const render = _renderers.renderWithoutSource;
  return Promise.resolve({
    cleanup,
    render,
    thirdPartyPlayer,
    applyProperties,
    handleSourceChange,
    startPlaybackSession,
    endPlaybackSession,
    videoElementEventHandlers,
    textTrackManager: {
      handleSourcePropChange: () => {},
      cleanup: () => {},
      handleSelectedTextTrackChange: () => {},
      handleTextTracksPropChange: () => {},
      clear: () => {}
    },
    audioTrackManager: {
      handleSourceChange: () => {},
      cleanup: () => {},
      handleSelectedAudioTrackChange: () => {}
    }
  });
}

const RxVideoStreamer = (0, _createVideoStreamerComponent.default)('RxVideoStreamer', resolveImplementation);
var _default = RxVideoStreamer;
exports.default = _default;
//# sourceMappingURL=RxVideoStreamer.js.map