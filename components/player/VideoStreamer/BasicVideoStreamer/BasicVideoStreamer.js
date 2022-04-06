"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImplementationResolver = getImplementationResolver;
exports.default = void 0;

var _createVideoStreamerComponent = _interopRequireDefault(require("../common/createVideoStreamerComponent"));

var _streamRangeHelper = _interopRequireDefault(require("./streamRangeHelper"));

var _filteredStreamStateUpdater = _interopRequireDefault(require("../common/filteredStreamStateUpdater"));

var _textTrackManager = _interopRequireDefault(require("./textTrackManager"));

var _audioTrackManager = _interopRequireDefault(require("./audioTrackManager"));

var _propertyApplier = require("../common/propertyApplier");

var _playbackLifeCycleManager = _interopRequireDefault(require("../common/playbackLifeCycleManager"));

var _basicVideoEventHandlers = _interopRequireDefault(require("./basicVideoEventHandlers"));

var _renderers = require("../common/renderers");

var _logger = require("../common/logger");

var _sourceChangeHandler = _interopRequireDefault(require("./sourceChangeHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getImplementationResolver(sourceChangeHandlerFactory) {
  return function resolveImplementation(streamer, configuration, videoElement, onTrackElementDataChange) {
    const streamRangeHelper = (0, _streamRangeHelper.default)(videoElement, configuration); // S

    const handleSourceChange = sourceChangeHandlerFactory(videoElement);
    const updateStreamState = (0, _filteredStreamStateUpdater.default)(streamer); // G

    const textTrackManager = (0, _textTrackManager.default)(videoElement, updateStreamState, onTrackElementDataChange);
    const audioTrackManager = (0, _audioTrackManager.default)(videoElement, updateStreamState);
    const applyProperties = (0, _propertyApplier.getPropertyApplier)(videoElement, streamRangeHelper, textTrackManager, audioTrackManager); // G

    const _getArrayLogger = (0, _logger.getArrayLogger)(window, 'videoEvents'),
          log = _getArrayLogger.log;

    const basicHandlers = (0, _basicVideoEventHandlers.default)({
      streamer,
      videoElement,
      streamRangeHelper,
      configuration,
      applyProperties,
      updateStreamState,
      log
    });
    const videoElementEventHandlers = basicHandlers.videoElementEventHandlers,
          setLifeCycleManager = basicHandlers.setLifeCycleManager;
    const playbackLifeCycleManager = (0, _playbackLifeCycleManager.default)(updateStreamState, basicHandlers.pauseStreamRangeUpdater, (0, _logger.getArrayLogger)(window, 'lifecycle').log);
    setLifeCycleManager(playbackLifeCycleManager);

    function cleanup() {
      textTrackManager.cleanup();
      audioTrackManager.cleanup();
      playbackLifeCycleManager.cleanup();
      basicHandlers.cleanup();
      return Promise.resolve();
    }

    const startPlaybackSession = playbackLifeCycleManager.startPlaybackSession,
          endPlaybackSession = playbackLifeCycleManager.endPlaybackSession;
    const render = _renderers.renderWithoutSource;
    return Promise.resolve({
      cleanup,
      render,
      textTrackManager,
      audioTrackManager,
      applyProperties,
      handleSourceChange,
      startPlaybackSession,
      endPlaybackSession,
      videoElementEventHandlers
    });
  };
}

const BasicVideoStreamer = (0, _createVideoStreamerComponent.default)('BasicVideoStreamer', getImplementationResolver(_sourceChangeHandler.default));
var _default = BasicVideoStreamer;
exports.default = _default;
//# sourceMappingURL=BasicVideoStreamer.js.map