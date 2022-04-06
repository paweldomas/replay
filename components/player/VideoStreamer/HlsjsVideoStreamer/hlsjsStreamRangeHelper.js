"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hls = _interopRequireDefault(require("hls.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dawnOfTime = new Date(0);
const minimumDvrLength = 100; // seconds

const defaultLiveEdgeMargin = 10; // seconds

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

function getAbsolutePositions(isLive, startDateTime, position) {
  if (startDateTime instanceof Date && !isNaN(startDateTime)) {
    return {
      absolutePosition: new Date(startDateTime.getTime() + position * 1000),
      absoluteStartPosition: startDateTime
    };
  } else {
    if (isLive) {
      const absolutePosition = new Date();
      const absoluteStartPosition = new Date(absolutePosition.getTime() - position * 1000);
      return {
        absolutePosition,
        absoluteStartPosition
      };
    } else {
      return {
        absolutePosition: dawnOfTime,
        absoluteStartPosition: dawnOfTime
      };
    }
  }
}

function getIsAtLiveEdge(hls, videoElement, isLive, liveMargin) {
  if (isLive) {
    if (hls.liveSyncPosition) {
      return videoElement.currentTime > hls.liveSyncPosition - liveMargin;
    } else if (hls.config && hls.config.liveSyncDuration) {
      return videoElement.currentTime > videoElement.duration - (hls.config.liveSyncDuration + liveMargin);
    } else if (hls.config && hls.config.liveSyncDurationCount) {
      return videoElement.currentTime > videoElement.duration - (hls.config.liveSyncDurationCount * 10 + liveMargin);
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const getStreamRangeHelper = (videoElement, instanceKeeper, configuration) => {
  const liveMargin = configuration && configuration.liveEdgeMargin || defaultLiveEdgeMargin;
  let levelDuration = 0;
  let streamStartDate;
  let isLive = false;
  let hls;

  function calculateNewState() {
    let position;

    if (levelDuration && isLive) {
      position = Math.max((videoElement.currentTime || 0) - Math.max(videoElement.duration - levelDuration, 0), 0);
    } else {
      position = videoElement.currentTime || 0;
    }

    const duration = isLive && levelDuration || videoElement.duration;

    const _getAbsolutePositions = getAbsolutePositions(isLive, streamStartDate, position),
          absolutePosition = _getAbsolutePositions.absolutePosition,
          absoluteStartPosition = _getAbsolutePositions.absoluteStartPosition;

    const playMode = resolvePlayMode(duration, isLive);
    const isAtLiveEdge = hls && getIsAtLiveEdge(hls, videoElement, isLive, liveMargin);
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
    /* Handled by hls.js itself? */
  }

  function setPosition(newPosition) {
    if (!(isNaN(newPosition) || newPosition === Infinity || isNaN(videoElement.duration) || videoElement.duration === Infinity)) {
      if (levelDuration && isLive) {
        videoElement.currentTime = newPosition + videoElement.duration - levelDuration;
      } else {
        videoElement.currentTime = newPosition;
      }
    }
  }

  function gotoLive() {
    if (isLive && hls) {
      if (hls.liveSyncPosition) {
        videoElement.currentTime = hls.liveSyncPosition;
      } else if (hls.config && hls.config.liveSyncDuration) {
        videoElement.currentTime = videoElement.duration - (hls.config.liveSyncDuration + liveMargin);
      } else if (hls.config && hls.config.liveSyncDurationCount) {
        videoElement.currentTime = videoElement.duration - (hls.config.liveSyncDurationCount * 10 + liveMargin);
      } else {
        videoElement.currentTime = videoElement.duration - liveMargin;
      }
    }
  }

  function reset() {
    streamStartDate = null;
    levelDuration = 0;
    isLive = false;
  }

  const hlsjsEventHandlers = {
    [_hls.default.Events.MANIFEST_LOADING]: () => reset,
    [_hls.default.Events.LEVEL_LOADED]: (evt, data) => {
      isLive = data.details.live;
      levelDuration = data.details.totalduration; // updateDuration();

      const programDateTime = data.details && data.details.fragments && data.details.fragments[0] && data.details.fragments[0].programDateTime;

      if (programDateTime) {
        streamStartDate = new Date(programDateTime); // updatePosition();
      }
    }
  };

  function onHlsInstance(hlsInstance, preposition) {
    Object.entries(hlsjsEventHandlers).forEach(([name, handler]) => {
      // $FlowFixMe
      hlsInstance[preposition](name, handler);

      if (preposition === 'on') {
        hls = hlsInstance;
      }
    });
  }

  instanceKeeper.subscribers.push(onHlsInstance);
  return {
    adjustForDvrStartOffset,
    calculateNewState,
    setPosition,
    gotoLive
  };
};

var _default = getStreamRangeHelper;
exports.default = _default;
//# sourceMappingURL=hlsjsStreamRangeHelper.js.map