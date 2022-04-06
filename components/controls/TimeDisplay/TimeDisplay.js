"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const className = 'time-display';
const positionClassName = 'time-display-position';
const durationClassName = 'time-display-duration';
const clockTimeClassName = 'time-display-clock-time';
const noDurationClassName = 'time-display-no-duration';

const isReasonableDateTime = date => date instanceof Date && !isNaN(date.getTime()) && date.getTime() > 1514761200000;

const formatAndLimitTime = (time, negativeMark, zeroAndBelow = false) => (0, _common.formatTime)(time == null ? 0 : Math[zeroAndBelow ? 'min' : 'max'](0, time), negativeMark);

const TimeDisplay = ({
  position,
  duration,
  absolutePosition,
  playMode,
  liveDisplayMode = 'clock-time',
  negativeMark,
  label,
  positionLabel,
  durationLabel,
  clockTimeLabel,
  classNamePrefix = _common.defaultClassNamePrefix
}) => {
  if (playMode === 'ondemand') {
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _common.prefixClassNames)(classNamePrefix, className),
      title: label
    }, /*#__PURE__*/React.createElement("span", {
      className: (0, _common.prefixClassNames)(classNamePrefix, positionClassName),
      title: positionLabel
    }, formatAndLimitTime(position, negativeMark)), /*#__PURE__*/React.createElement("span", {
      className: (0, _common.prefixClassNames)(classNamePrefix, durationClassName),
      title: durationLabel
    }, formatAndLimitTime(duration, negativeMark)));
  } else {
    if (liveDisplayMode === 'live-offset' && playMode === 'livedvr' || !isReasonableDateTime(absolutePosition)) {
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _common.prefixClassNames)(classNamePrefix, className),
        title: label
      }, /*#__PURE__*/React.createElement("span", {
        className: (0, _common.prefixClassNames)(classNamePrefix, positionClassName),
        title: positionLabel
      }, formatAndLimitTime((position || duration || 0) - (duration || 0), negativeMark, true)), playMode === 'livedvr' && /*#__PURE__*/React.createElement("span", {
        className: (0, _common.prefixClassNames)(classNamePrefix, durationClassName),
        title: durationLabel
      }, formatAndLimitTime(duration, negativeMark)));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _common.prefixClassNames)(classNamePrefix, className, noDurationClassName),
        title: label
      }, /*#__PURE__*/React.createElement("span", {
        className: (0, _common.prefixClassNames)(classNamePrefix, clockTimeClassName),
        title: positionLabel
      }, (0, _common.formatClockTime)(absolutePosition)));
    }
  }
};

TimeDisplay.streamStateKeysForObservation = ['position', 'duration', 'absolutePosition', 'playMode'];
TimeDisplay.displayName = 'TimeDisplay';
var _default = TimeDisplay;
exports.default = _default;
//# sourceMappingURL=TimeDisplay.js.map