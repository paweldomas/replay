"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const dawnOfTime = new Date(0);
const minimumDvrLength = 100; // seconds

const defaultLiveEdgeMargin = 10; // seconds

const dvrStartCorrection = 10; // yep, seconds

function resolvePlayMode(duration, isLive) {
  if (isLive) {
    if (duration === Infinity || duration === 0 || duration < minimumDvrLength) {
      return 'live';
    } else {
      return 'livedvr';
    }
  } else {
    return 'ondemand';
  }
}

function getAbsolutePositions(isLive, startDateTime, seekRange, position) {
  if (isLive) {
    if (isNaN(startDateTime)) {
      const absolutePosition = new Date();
      const absoluteStartPosition = new Date(absolutePosition.getTime() - position * 1000);
      return {
        absolutePosition,
        absoluteStartPosition
      };
    } else {
      return {
        absolutePosition: new Date(startDateTime.getTime() + (position + seekRange.start) * 1000),
        absoluteStartPosition: new Date(startDateTime.getTime() + seekRange.start * 1000)
      };
    }
  } else {
    return {
      absolutePosition: dawnOfTime,
      absoluteStartPosition: dawnOfTime
    };
  }
}

const getStreamRangeHelper = (videoElement, shakaPlayer, configuration) => {
  const liveMargin = configuration && configuration.liveEdgeMargin || defaultLiveEdgeMargin;

  function calculateNewState() {
    const seekRange = shakaPlayer.seekRange();
    const isLive = shakaPlayer.isLive();
    const startDateTime = isLive ? shakaPlayer.getPresentationStartTimeAsDate() : new Date();
    const position = videoElement.currentTime - seekRange.start;
    const duration = seekRange.end !== 0 || seekRange.start !== 0 ? seekRange.end - seekRange.start : videoElement.duration === Infinity || isNaN(videoElement.duration) ? 0 : videoElement.duration;
    const playMode = resolvePlayMode(duration, isLive);
    const isAtLiveEdge = isLive && position > duration - liveMargin;

    const _getAbsolutePositions = getAbsolutePositions(isLive, startDateTime, seekRange, position),
          absolutePosition = _getAbsolutePositions.absolutePosition,
          absoluteStartPosition = _getAbsolutePositions.absoluteStartPosition;

    return {
      position,
      duration,
      playMode,
      isAtLiveEdge,
      absolutePosition,
      absoluteStartPosition
    };
  }

  function adjustForDvrStartOffset() {
    if (videoElement && videoElement.paused && shakaPlayer.isLive()) {
      const seekableStart = shakaPlayer.seekRange().start || 0;

      if (seekableStart >= videoElement.currentTime) {
        videoElement.currentTime = seekableStart + dvrStartCorrection;
      }
    }
  }

  function setPosition(newPosition) {
    if (!(isNaN(newPosition) && newPosition === Infinity)) {
      videoElement.currentTime = shakaPlayer.seekRange().start + newPosition;
    }
  }

  function gotoLive() {
    if (shakaPlayer.isLive()) {
      videoElement.currentTime = shakaPlayer.seekRange().end;
    }
  }

  return {
    adjustForDvrStartOffset,
    calculateNewState,
    setPosition,
    gotoLive
  };
};

var _default = getStreamRangeHelper;
exports.default = _default;
//# sourceMappingURL=shakaStreamRangeHelper.js.map