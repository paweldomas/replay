"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const dawnOfTime = new Date(0);
const minimumDvrLength = 100; // seconds

const defaultLiveEdgeMargin = 10; // seconds

const dvrStartCorrection = 10; // yep, seconds

function getSeekableNetRange(videoElement) {
  return videoElement.seekable.length > 0 ? videoElement.seekable.end(0) - videoElement.seekable.start(0) : 0;
}

function getPosition(videoElement) {
  return videoElement.currentTime - (videoElement.seekable.length > 0 ? videoElement.seekable.start(0) : 0);
}

function getDuration(videoElement, isLive, seekableRange) {
  return isLive ? seekableRange : videoElement.duration;
}

function getStartOffset(videoElement) {
  return videoElement.seekable.length > 0 ? videoElement.seekable.start(0) : 0;
}

function resolvePlayMode(videoElement, seekableRange, isLive) {
  if (isLive) {
    if (seekableRange === Infinity || seekableRange === 0 || seekableRange < minimumDvrLength) {
      return 'live';
    } else {
      return 'livedvr';
    }
  } else {
    return 'ondemand';
  }
}

function getAbsolutePositions(videoElement, isLive, position) {
  if (isLive) {
    // $FlowFixMe getStartDate() is Safari only and not part of the DOM standard API.
    const startDate = videoElement.getStartDate && videoElement.getStartDate();

    if (isNaN(startDate)) {
      const absolutePosition = new Date();
      const absoluteStartPosition = new Date(absolutePosition.getTime() - position * 1000);
      return {
        absolutePosition,
        absoluteStartPosition
      };
    } else {
      return {
        absolutePosition: new Date(startDate.getTime() + videoElement.currentTime * 1000),
        absoluteStartPosition: new Date(startDate.getTime() + getStartOffset(videoElement) * 1000)
      };
    }
  } else {
    return {
      absolutePosition: dawnOfTime,
      absoluteStartPosition: dawnOfTime
    };
  }
}

const getStreamRangeHelper = (videoElement, configuration) => {
  const liveMargin = configuration && configuration.liveEdgeMargin || defaultLiveEdgeMargin;

  function calculateNewState() {
    const seekableRange = getSeekableNetRange(videoElement);
    const isLive = videoElement.duration === Infinity;
    const position = getPosition(videoElement);
    const duration = getDuration(videoElement, isLive, seekableRange);
    const playMode = resolvePlayMode(videoElement, seekableRange, isLive);
    const isAtLiveEdge = isLive && position > duration - liveMargin;

    const _getAbsolutePositions = getAbsolutePositions(videoElement, isLive, position),
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
    if (videoElement && videoElement.paused && videoElement.duration === Infinity) {
      const seekableStart = getStartOffset(videoElement);

      if (seekableStart !== Infinity && seekableStart >= videoElement.currentTime) {
        videoElement.currentTime = seekableStart + dvrStartCorrection;
      }
    }
  }

  function setPosition(newPosition) {
    if (!(isNaN(newPosition) && newPosition === Infinity)) {
      videoElement.currentTime = getStartOffset(videoElement) + newPosition;
    }
  }

  function gotoLive() {
    if (videoElement.duration === Infinity && videoElement.seekable.length > 0) {
      videoElement.currentTime = videoElement.seekable.end(0);
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
//# sourceMappingURL=streamRangeHelper.js.map