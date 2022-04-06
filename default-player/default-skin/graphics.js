"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactFeather = require("react-feather");

var _LoadingAnimation = _interopRequireDefault(require("./LoadingAnimation"));

var _strings = _interopRequireDefault(require("../strings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const graphics = {
  playPauseButton: {
    playingContent: /*#__PURE__*/React.createElement(_reactFeather.Pause, null),
    pausedContent: /*#__PURE__*/React.createElement(_reactFeather.Play, null)
  },
  skipButton: {
    content: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(_reactFeather.RotateCcw, null)), /*#__PURE__*/React.createElement("span", null, _strings.default.skipButton.seconds))
  },
  timeline: {
    handleContent: '',
    trackContent: /*#__PURE__*/React.createElement("div", null)
  },
  gotoLiveButton: {
    isAtLiveEdgeContent: /*#__PURE__*/React.createElement("span", null, _strings.default.gotoLiveButton.isLive),
    isNotAtLiveEdgeContent: /*#__PURE__*/React.createElement("span", null, _strings.default.gotoLiveButton.gotoLive)
  },
  volume: {
    unmutedContent: /*#__PURE__*/React.createElement(_reactFeather.Volume2, null),
    mutedContent: /*#__PURE__*/React.createElement(_reactFeather.VolumeX, null),
    volumeSliderHandleContent: ''
  },
  audioSelector: {
    toggleContent: /*#__PURE__*/React.createElement(_reactFeather.MessageSquare, null)
  },
  subtitlesSelector: {
    toggleContent: /*#__PURE__*/React.createElement(_reactFeather.Type, null)
  },
  qualitySelector: {
    toggleContent: /*#__PURE__*/React.createElement(_reactFeather.Settings, null)
  },
  pipButton: {
    pipActiveContent: /*#__PURE__*/React.createElement(_reactFeather.Square, null),
    pipInactiveContent: /*#__PURE__*/React.createElement(_reactFeather.Copy, null)
  },
  airPlayButton: {
    airPlayActiveContent: /*#__PURE__*/React.createElement(_reactFeather.Airplay, null),
    airPlayInactiveContent: /*#__PURE__*/React.createElement(_reactFeather.Airplay, null)
  },
  fullscreenButton: {
    normalContent: /*#__PURE__*/React.createElement(_reactFeather.Maximize, null),
    fullscreenContent: /*#__PURE__*/React.createElement(_reactFeather.Minimize, null)
  },
  bufferingIndicator: {
    content: /*#__PURE__*/React.createElement(_LoadingAnimation.default, null),
    renderStrategy: 'always'
  },
  playbackMonitor: {
    closeButtonContent: /*#__PURE__*/React.createElement(_reactFeather.XCircle, null)
  },
  exitButton: {
    content: /*#__PURE__*/React.createElement(_reactFeather.XCircle, null)
  }
};
var _default = graphics;
exports.default = _default;
//# sourceMappingURL=graphics.js.map