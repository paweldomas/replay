"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createVideoStreamerComponent = _interopRequireDefault(require("../common/createVideoStreamerComponent"));

var _shakaSetup = require("./shakaSetup");

var _shakaStreamRangeHelper = _interopRequireDefault(require("./shakaStreamRangeHelper"));

var _shakaSourceChangeHandler = _interopRequireDefault(require("./shakaSourceChangeHandler"));

var _filteredStreamStateUpdater = _interopRequireDefault(require("../common/filteredStreamStateUpdater"));

var _propertyApplier = require("../common/propertyApplier");

var _playbackLifeCycleManager = _interopRequireDefault(require("../common/playbackLifeCycleManager"));

var _shakaEventHandlers = _interopRequireDefault(require("./shakaEventHandlers"));

var _renderers = require("../common/renderers");

var _logger = require("../common/logger");

var _shakaBitrateManager = _interopRequireDefault(require("./shakaBitrateManager"));

var _shakaTextTrackManager = _interopRequireDefault(require("./shakaTextTrackManager"));

var _shakaAudioTrackManager = _interopRequireDefault(require("./shakaAudioTrackManager"));

var _shakaErrorMapper = _interopRequireDefault(require("./shakaErrorMapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const withShakaLibrary = shakaLib => (streamer, configuration, videoElement) => {
  let shakaPlayer;

  try {
    shakaPlayer = (0, _shakaSetup.shakaSetup)(shakaLib, videoElement, configuration);
  } catch (e) {
    return Promise.reject((0, _shakaErrorMapper.default)(shakaLib, false, e));
  }

  const streamRangeHelper = (0, _shakaStreamRangeHelper.default)(videoElement, shakaPlayer, configuration); // S

  const handleSourceChange = (0, _shakaSourceChangeHandler.default)(shakaLib, shakaPlayer); // S

  const updateStreamState = (0, _filteredStreamStateUpdater.default)(streamer); // G

  const textTrackManager = (0, _shakaTextTrackManager.default)(shakaPlayer, updateStreamState);
  const audioTrackManager = (0, _shakaAudioTrackManager.default)(shakaPlayer, updateStreamState);
  const bitrateManager = (0, _shakaBitrateManager.default)(streamer, shakaPlayer, updateStreamState, (0, _logger.getArrayLogger)(window, 'bitrateManager').log);
  const applyProperties = (0, _propertyApplier.getPropertyApplier)(videoElement, streamRangeHelper, textTrackManager, audioTrackManager, bitrateManager); // G

  const _getArrayLogger = (0, _logger.getArrayLogger)(window, 'videoEvents'),
        log = _getArrayLogger.log;

  const shakaEventHandlers = (0, _shakaEventHandlers.default)({
    shakaLib,
    streamer,
    videoElement,
    shakaPlayer,
    streamRangeHelper,
    configuration,
    applyProperties,
    updateStreamState,
    log
  });
  const videoElementEventHandlers = shakaEventHandlers.videoElementEventHandlers,
        setLifeCycleManager = shakaEventHandlers.setLifeCycleManager;
  const playbackLifeCycleManager = (0, _playbackLifeCycleManager.default)(updateStreamState, shakaEventHandlers.pauseStreamRangeUpdater, (0, _logger.getArrayLogger)(window, 'lifecycle').log);
  setLifeCycleManager(playbackLifeCycleManager);

  function cleanup() {
    textTrackManager.cleanup();
    audioTrackManager.cleanup();
    playbackLifeCycleManager.cleanup();
    shakaEventHandlers.cleanup();
    bitrateManager.cleanup();
    return (0, _shakaSetup.shakaCleanup)(shakaPlayer);
  }

  const startPlaybackSession = playbackLifeCycleManager.startPlaybackSession,
        endPlaybackSession = playbackLifeCycleManager.endPlaybackSession;
  const thirdPartyPlayer = shakaPlayer;
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
};

const createVideoStreamerWithShakaLibrary = shakaLibrary => (0, _createVideoStreamerComponent.default)('ShakaVideoStreamer', withShakaLibrary(shakaLibrary));

var _default = createVideoStreamerWithShakaLibrary;
exports.default = _default;
//# sourceMappingURL=injectableShakaVideoStreamer.js.map