"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _basicVideoEventHandlers = _interopRequireDefault(require("../BasicVideoStreamer/basicVideoEventHandlers"));

var _hls = _interopRequireDefault(require("hls.js"));

var _hlsjsErrorMapper = require("./hlsjsErrorMapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getHlsjsEventHandlers = ({
  streamer,
  videoElement,
  instanceKeeper,
  streamRangeHelper,
  configuration,
  applyProperties,
  updateStreamState,
  log
}) => {
  const htmlVideoHandlers = (0, _basicVideoEventHandlers.default)({
    streamer,
    videoElement,
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

  function handleActualError(detail) {
    log && log('hlsjs.error');
    const playbackError = (0, _hlsjsErrorMapper.mapHlsjsError)(lifeCycleManager.getStage() === 'started', detail);

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
  }

  function setLifeCycleManager(manager) {
    lifeCycleManager = manager;
    htmlVideoHandlers.setLifeCycleManager(manager);
  }

  const hlsjsEventHandlers = {
    [_hls.default.Events.ERROR]: (evt, data) => {
      switch (data.details) {
        case _hls.default.ErrorDetails.BUFFER_STALLED_ERROR:
          updateStreamState({
            isBuffering: true
          });

          if (lifeCycleManager.getStage() === 'started') {
            updateStreamState({
              playState: 'buffering'
            });
          }

          break;

        case _hls.default.ErrorDetails.BUFFER_SEEK_OVER_HOLE:
        case _hls.default.ErrorDetails.BUFFER_NUDGE_ON_STALL:
          break;

        case _hls.default.ErrorDetails.MANIFEST_PARSING_ERROR:
          if (data.url && !data.url.endsWith('undefined')) {
            handleActualError(data);
          }

          break;

        default:
          handleActualError(data);
      }
    },
    [_hls.default.Events.MANIFEST_LOADING]: () => {
      log && log('hlsjs.loading');

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
    [_hls.default.Events.FRAG_BUFFERED]: () => {
      updateStreamState({
        isBuffering: false
      });
    },
    [_hls.default.Events.MANIFEST_PARSED]: () => {
      log && log('hlsjs.parsed');

      if (streamer.props.initialPlaybackProps) {
        const _streamer$props$initi2 = streamer.props.initialPlaybackProps,
              isPaused = _streamer$props$initi2.isPaused,
              bitrateFix = _streamer$props$initi2.bitrateFix,
              bitrateCap = _streamer$props$initi2.bitrateCap;

        if (isPaused) {
          videoElement.pause();
        }

        applyProperties({
          bitrateFix,
          bitrateCap
        });

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

      updateStreamState(streamRangeHelper.calculateNewState());
    }
  };

  function onHlsInstance(hlsInstance, preposition) {
    Object.entries(hlsjsEventHandlers).forEach(([name, handler]) => {
      // $FlowFixMe
      hlsInstance[preposition](name, handler);
    });
  }

  instanceKeeper.subscribers.push(onHlsInstance);
  const onCanPlay = videoElementEventHandlers.onCanPlay,
        onPlaying = videoElementEventHandlers.onPlaying,
        onPause = videoElementEventHandlers.onPause,
        onSeeking = videoElementEventHandlers.onSeeking,
        onSeeked = videoElementEventHandlers.onSeeked,
        onDurationChange = videoElementEventHandlers.onDurationChange,
        onTimeUpdate = videoElementEventHandlers.onTimeUpdate,
        onVolumeChange = videoElementEventHandlers.onVolumeChange,
        onProgress = videoElementEventHandlers.onProgress,
        onEnded = videoElementEventHandlers.onEnded,
        onError = videoElementEventHandlers.onError;
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
      onEnded,
      onError
    },
    pauseStreamRangeUpdater,
    setLifeCycleManager
  };
};

var _default = getHlsjsEventHandlers;
exports.default = _default;
//# sourceMappingURL=hlsjsEventHandlers.js.map