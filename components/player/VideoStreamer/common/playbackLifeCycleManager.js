"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.emptyTracks = void 0;
const emptyTracks = []; // Keeping the same array instance for all updates as long as not in use.

exports.emptyTracks = emptyTracks;
const emptyBitrates = [];
const dawnOfTime = new Date(0);

function notifyInitialState(updateStreamState) {
  updateStreamState({
    duration: 0,
    position: 0,
    playMode: 'ondemand',
    playState: 'inactive',
    isBuffering: false,
    isPaused: false,
    isSeeking: false,
    volume: 1,
    muted: false,
    bufferedAhead: 0,
    isPipAvailable: false,
    isAirPlayAvailable: false,
    isPipActive: false,
    isAirPlayActive: false,
    bitrates: emptyBitrates,
    audioTracks: emptyTracks,
    textTracks: emptyTracks,
    absolutePosition: dawnOfTime,
    absoluteStartPosition: dawnOfTime
  });
}

function notifyTerminalState(updateStreamState) {
  updateStreamState({
    // duration: 0,
    // position: 0,
    // playMode: 'ondemand',
    playState: 'inactive',
    // Different
    isBuffering: false,
    isPaused: false,
    isSeeking: false,
    // volume: 1,
    // muted: false,
    // bufferedAhead: 0,
    isPipAvailable: false,
    isAirPlayAvailable: false // isPipActive: false,
    // isAirPlayActive: false,
    // bitrates: emptyBitrates,
    // audioTracks: emptyTracks,
    // textTracks: emptyTracks,
    // absolutePosition: dawnOfTime,
    // absoluteStartPosition: dawnOfTime

  });
}

function getPlaybackLifeCycleManager(updateStreamState, pauseStreamRangeUpdater, log) {
  let lifeCycleStage = 'unknown';
  log && log(lifeCycleStage);

  function getStage() {
    return lifeCycleStage;
  }

  function setStage(newValue) {
    log && log(newValue);
    lifeCycleStage = newValue;
  }

  function startPlaybackSession() {
    setStage('new');
    notifyInitialState(updateStreamState);
    pauseStreamRangeUpdater.stop();
  }

  function endPlaybackSession(endStage) {
    if (endStage) {
      setStage(endStage);
    }

    notifyTerminalState(updateStreamState);
    pauseStreamRangeUpdater.stop();
  }

  function cleanup() {
    pauseStreamRangeUpdater.stop();
  }

  return {
    startPlaybackSession,
    endPlaybackSession,
    getStage,
    setStage,
    cleanup
  };
}

var _default = getPlaybackLifeCycleManager;
exports.default = _default;
//# sourceMappingURL=playbackLifeCycleManager.js.map