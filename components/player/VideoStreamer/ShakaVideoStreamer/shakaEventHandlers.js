"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _basicVideoEventHandlers = _interopRequireDefault(require("../BasicVideoStreamer/basicVideoEventHandlers"));

var _shakaErrorMapper = _interopRequireDefault(require("./shakaErrorMapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getShakaEventHandlers = ({
  streamer,
  videoElement,
  shakaPlayer,
  shakaLib,
  streamRangeHelper,
  configuration,
  applyProperties,
  updateStreamState,
  log
}) => {
  const htmlVideoHandlers = (0, _basicVideoEventHandlers.default)({
    streamer,
    videoElement,
    thirdPartyPlayer: shakaPlayer,
    streamRangeHelper,
    configuration,
    log,
    applyProperties,
    updateStreamState
  });
  const videoElementEventHandlers = htmlVideoHandlers.videoElementEventHandlers,
        pauseStreamRangeUpdater = htmlVideoHandlers.pauseStreamRangeUpdater;
  let lifeCycleManager = {
    setStage: _ => {},
    getStage: () => {}
  };
  const shakaEventHandlers = {
    error: ({
      detail
    }) => {
      log && log('shaka.error');
      const playbackError = (0, _shakaErrorMapper.default)(shakaLib, lifeCycleManager.getStage() === 'started', detail, navigator.userAgent, document.location);

      if (streamer.props.onPlaybackError) {
        streamer.props.onPlaybackError(playbackError);
      }

      if (videoElement.error) {
        updateStreamState({
          error: videoElement.error
        });
      }

      if (playbackError.severity === 'FATAL') {
        lifeCycleManager.setStage('dead');
        updateStreamState({
          playState: 'inactive',
          isBuffering: false,
          isSeeking: false
        });
      }

      pauseStreamRangeUpdater.stop();
    },
    loading: () => {
      log && log('shaka.loading');

      if (lifeCycleManager.getStage() === 'new') {
        lifeCycleManager.setStage('starting');

        if (streamer.props.initialPlaybackProps) {
          const _streamer$props$initi = streamer.props.initialPlaybackProps,
                isMuted = _streamer$props$initi.isMuted,
                volume = _streamer$props$initi.volume;
          applyProperties({
            isMuted,
            volume
          });
        }

        updateStreamState({
          playState: 'starting',
          isBuffering: true,
          volume: videoElement.volume,
          isMuted: videoElement.muted,
          isPipAvailable: htmlVideoHandlers.isPipAvailable()
        });
      }
    },
    streaming: () => {
      log && log('shaka.streaming');

      if (streamer.props.initialPlaybackProps) {
        const _streamer$props$initi2 = streamer.props.initialPlaybackProps,
              isPaused = _streamer$props$initi2.isPaused,
              bitrateFix = _streamer$props$initi2.bitrateFix,
              bitrateCap = _streamer$props$initi2.bitrateCap;
        applyProperties({
          bitrateFix,
          bitrateCap
        });

        if (isPaused) {
          videoElement.pause();
        }

        if (bitrateFix == null) {
          updateStreamState({
            bitrateFix: null
          });
        }

        if (bitrateCap == null) {
          updateStreamState({
            bitrateCap: null
          });
        }
      } else {
        updateStreamState({
          bitrateFix: null,
          bitrateCap: null
        });
      }

      updateStreamState(_objectSpread({
        isMuted: videoElement.muted,
        volume: videoElement.volume
      }, streamRangeHelper.calculateNewState()));
    },
    buffering: ({
      buffering: _buffering
    }) => {
      log && log('shaka.buffering.' + _buffering.toString());

      if (lifeCycleManager.getStage() === 'started') {
        updateStreamState({
          isBuffering: _buffering,
          playState: _buffering ? 'buffering' : videoElement.paused ? 'playing' : 'paused'
        });
      } else {
        updateStreamState({
          isBuffering: _buffering
        });
      }
    }
  };

  function cleanup() {
    htmlVideoHandlers.cleanup();
    Object.entries(shakaEventHandlers).forEach(([name, handler]) => {
      shakaPlayer.removeEventListener(name, handler);
    });
  }

  function setLifeCycleManager(manager) {
    lifeCycleManager = manager;
    htmlVideoHandlers.setLifeCycleManager(manager);
  }

  Object.entries(shakaEventHandlers).forEach(([name, handler]) => {
    shakaPlayer.addEventListener(name, handler);
  });
  const onCanPlay = videoElementEventHandlers.onCanPlay,
        onPlaying = videoElementEventHandlers.onPlaying,
        onPause = videoElementEventHandlers.onPause,
        onSeeking = videoElementEventHandlers.onSeeking,
        onSeeked = videoElementEventHandlers.onSeeked,
        onDurationChange = videoElementEventHandlers.onDurationChange,
        onTimeUpdate = videoElementEventHandlers.onTimeUpdate,
        onVolumeChange = videoElementEventHandlers.onVolumeChange,
        onProgress = videoElementEventHandlers.onProgress,
        onEnded = videoElementEventHandlers.onEnded;
  return {
    videoElementEventHandlers: {
      onCanPlay,
      onPlaying,
      onPause,
      onSeeking,
      onSeeked,
      onDurationChange,
      onTimeUpdate,
      onVolumeChange,
      onProgress,
      onEnded
    },
    pauseStreamRangeUpdater,
    setLifeCycleManager,
    cleanup
  };
};

var _default = getShakaEventHandlers;
exports.default = _default;
//# sourceMappingURL=shakaEventHandlers.js.map