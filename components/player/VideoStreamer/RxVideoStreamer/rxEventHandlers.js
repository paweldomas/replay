"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("../types");

var _basicVideoEventHandlers = _interopRequireDefault(require("../BasicVideoStreamer/basicVideoEventHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapError = (error, severity) => new _types.PlaybackError('STREAM_ERROR', 'rxplayer', 'Rx-player error: ' + error.message, severity, error);

const getRxEventHandlers = ({
  streamer,
  rxPlayer,
  videoElement,
  streamRangeHelper,
  configuration,
  applyProperties,
  updateStreamState,
  log
}) => {
  let lifeCycleManager = {
    setStage: _ => {},
    getStage: () => {}
  };
  const htmlVideoHandlers = (0, _basicVideoEventHandlers.default)({
    streamer,
    videoElement,
    thirdPartyPlayer: rxPlayer,
    streamRangeHelper,
    configuration,
    log,
    applyProperties,
    updateStreamState
  });
  const videoElementEventHandlers = htmlVideoHandlers.videoElementEventHandlers,
        pauseStreamRangeUpdater = htmlVideoHandlers.pauseStreamRangeUpdater;
  const rxEventHandlers = {
    playerStateChange: playerState => {
      log && log(playerState);

      switch (playerState) {
        case 'LOADING':
          lifeCycleManager.setStage('starting');
          updateStreamState({
            playState: 'starting',
            isBuffering: true,
            volume: videoElement.volume,
            isMuted: videoElement.muted,
            isPipAvailable: htmlVideoHandlers.isPipAvailable()
          });
          break;

        case 'LOADED':
          if (streamer.props.initialPlaybackProps) {
            const _streamer$props$initi = streamer.props.initialPlaybackProps,
                  isMuted = _streamer$props$initi.isMuted,
                  volume = _streamer$props$initi.volume,
                  bitrateFix = _streamer$props$initi.bitrateFix,
                  bitrateCap = _streamer$props$initi.bitrateCap;
            applyProperties({
              isMuted,
              volume,
              bitrateFix,
              bitrateCap
            });

            if (volume != null) {
              onVolumeChange();
            }
          }

          lifeCycleManager.setStage('started');

          if (videoElement.paused) {
            updateStreamState({
              playState: 'paused',
              isPaused: true,
              isBuffering: false,
              isSeeking: false
            });
            pauseStreamRangeUpdater.start();
          }

          updateStreamState(streamRangeHelper.calculateNewState());
          break;

        case 'PLAYING':
          updateStreamState({
            playState: 'playing',
            isBuffering: false,
            isPaused: false,
            isSeeking: false
          });
          pauseStreamRangeUpdater.stop();
          break;

        case 'PAUSED':
          updateStreamState({
            playState: 'paused',
            isPaused: true,
            isBuffering: false,
            isSeeking: false
          });
          pauseStreamRangeUpdater.start();
          break;

        case 'BUFFERING':
        case 'RELOADING':
          updateStreamState({
            playState: 'buffering',
            isBuffering: true
          });
          break;

        case 'SEEKING':
          updateStreamState({
            playState: 'seeking',
            isBuffering: true,
            isSeeking: true
          });
          break;

        case 'ENDED':
        case 'STOPPED':
          //if (lifeCycleManager.getStage() === 'started') {
          //  lifeCycleManager.setStage('ended');
          //}
          updateStreamState({
            playState: 'inactive',
            isBuffering: false,
            isSeeking: false
          });
          pauseStreamRangeUpdater.stop();
          break;

        default:
          log && log('Unrecognised player state.');
      }
    },
    positionUpdate: () => {
      updateStreamState(streamRangeHelper.calculateNewState());
    },
    warning: err => {
      const playbackError = mapError(err, 'WARNING');

      if (streamer.props.onPlaybackError) {
        streamer.props.onPlaybackError(playbackError);
      }
    },
    error: err => {
      const playbackError = mapError(err, 'FATAL');

      if (streamer.props.onPlaybackError) {
        streamer.props.onPlaybackError(playbackError);
      }

      lifeCycleManager.setStage('dead');
      updateStreamState({
        playState: 'inactive',
        isBuffering: false,
        isSeeking: false
      });
      pauseStreamRangeUpdater.stop();
    }
  };

  function setLifeCycleManager(manager) {
    lifeCycleManager = manager;
    htmlVideoHandlers.setLifeCycleManager(manager);
  }

  function cleanup() {
    htmlVideoHandlers.cleanup();
    Object.entries(rxEventHandlers).forEach(([name, handler]) => {
      rxPlayer.removeEventListener(name, handler);
    });
  }

  Object.entries(rxEventHandlers).forEach(([name, handler]) => {
    rxPlayer.addEventListener(name, handler);
  });
  const onVolumeChange = videoElementEventHandlers.onVolumeChange,
        onProgress = videoElementEventHandlers.onProgress;
  return {
    videoElementEventHandlers: {
      onVolumeChange,
      onProgress
    },
    pauseStreamRangeUpdater,
    setLifeCycleManager,
    cleanup
  };
};

var _default = getRxEventHandlers;
exports.default = _default;
//# sourceMappingURL=rxEventHandlers.js.map