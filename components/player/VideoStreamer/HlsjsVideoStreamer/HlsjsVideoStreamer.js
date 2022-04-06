"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createVideoStreamerComponent = _interopRequireDefault(require("../common/createVideoStreamerComponent"));

var _hlsjsSetup = require("./hlsjsSetup");

var _hlsjsStreamRangeHelper = _interopRequireDefault(require("./hlsjsStreamRangeHelper"));

var _hlsjsSourceChangeHandler = _interopRequireDefault(require("./hlsjsSourceChangeHandler"));

var _filteredStreamStateUpdater = _interopRequireDefault(require("../common/filteredStreamStateUpdater"));

var _propertyApplier = require("../common/propertyApplier");

var _playbackLifeCycleManager = _interopRequireDefault(require("../common/playbackLifeCycleManager"));

var _renderers = require("../common/renderers");

var _logger = require("../common/logger");

var _hlsjsAudioTrackManager = _interopRequireDefault(require("./hlsjsAudioTrackManager"));

var _hls = _interopRequireDefault(require("hls.js"));

var _hlsjsTextTrackManager = _interopRequireDefault(require("./hlsjsTextTrackManager"));

var _hlsjsBitrateManager = _interopRequireDefault(require("./hlsjsBitrateManager"));

var _hlsjsEventHandlers = _interopRequireDefault(require("./hlsjsEventHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveImplementation(streamer, configuration, videoElement, onTrackElementDataChange) {
  const instanceKeeper = {
    videoElement,
    subscribers: []
  };
  const streamRangeHelper = (0, _hlsjsStreamRangeHelper.default)(videoElement, instanceKeeper, configuration);
  const handleSourceChange = (0, _hlsjsSourceChangeHandler.default)(instanceKeeper);
  const updateStreamState = (0, _filteredStreamStateUpdater.default)(streamer);
  const textTrackManager = (0, _hlsjsTextTrackManager.default)(videoElement, instanceKeeper, updateStreamState, onTrackElementDataChange);
  const audioTrackManager = (0, _hlsjsAudioTrackManager.default)(instanceKeeper, updateStreamState);
  const bitrateManager = (0, _hlsjsBitrateManager.default)(streamer, instanceKeeper, updateStreamState, (0, _logger.getArrayLogger)(window, 'bitrateManager').log);
  const applyProperties = (0, _propertyApplier.getPropertyApplier)(videoElement, streamRangeHelper, textTrackManager, audioTrackManager, bitrateManager); // G

  const _getArrayLogger = (0, _logger.getArrayLogger)(window, 'videoEvents'),
        log = _getArrayLogger.log;

  const hlsjsEventHandlers = (0, _hlsjsEventHandlers.default)({
    streamer,
    videoElement,
    instanceKeeper,
    streamRangeHelper,
    configuration,
    applyProperties,
    updateStreamState,
    log
  });
  const videoElementEventHandlers = hlsjsEventHandlers.videoElementEventHandlers,
        setLifeCycleManager = hlsjsEventHandlers.setLifeCycleManager;
  const playbackLifeCycleManager = (0, _playbackLifeCycleManager.default)(updateStreamState, hlsjsEventHandlers.pauseStreamRangeUpdater, (0, _logger.getArrayLogger)(window, 'lifecycle').log);
  setLifeCycleManager(playbackLifeCycleManager);

  function cleanup() {
    textTrackManager.cleanup();
    playbackLifeCycleManager.cleanup();
    return (0, _hlsjsSetup.hlsjsCleanup)(instanceKeeper);
  }

  const startPlaybackSession = playbackLifeCycleManager.startPlaybackSession,
        endPlaybackSession = playbackLifeCycleManager.endPlaybackSession;
  const thirdPartyPlayer = instanceKeeper;
  const render = _renderers.renderWithoutSource;
  return Promise.resolve({
    cleanup,
    render,
    textTrackManager,
    audioTrackManager,
    thirdPartyPlayer,
    applyProperties,
    handleSourceChange,
    startPlaybackSession,
    endPlaybackSession,
    videoElementEventHandlers
  });
}

const HlsjsVideoStreamer = (0, _createVideoStreamerComponent.default)('HlsjsVideoStreamer', resolveImplementation);
var _default = HlsjsVideoStreamer;
exports.default = _default;
//# sourceMappingURL=HlsjsVideoStreamer.js.map