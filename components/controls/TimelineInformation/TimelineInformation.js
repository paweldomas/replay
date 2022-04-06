"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'timeline-information';
const tooltipClassName = 'timeline-tooltip';
const tooltipVisibleClassName = 'timeline-tooltip-visible';

const getTimeDisplay = (playMode, absoluteStartPosition, previewValue) => {
  if (previewValue != null) {
    if (playMode === 'livedvr' && absoluteStartPosition instanceof Date && absoluteStartPosition.getTime() > 0) {
      return (0, _common.formatClockTime)(new Date(absoluteStartPosition.getTime() + previewValue * 1000));
    } else {
      return (0, _common.formatTime)(previewValue);
    }
  } else {
    return '';
  }
};

class TimelineInformation extends React.Component {
  render() {
    const _this$props = this.props,
          absoluteStartPosition = _this$props.absoluteStartPosition,
          duration = _this$props.duration,
          playMode = _this$props.playMode,
          previewValue = _this$props.previewValue,
          isDragging = _this$props.isDragging,
          isPointerInside = _this$props.isPointerInside,
          classNamePrefix = _this$props.classNamePrefix;
    const timeDisplay = getTimeDisplay(playMode, absoluteStartPosition, previewValue);
    const left = ((previewValue || 0) / (duration || 1) * 100).toFixed(2);
    const prefixedClassName = (0, _common.prefixClassNames)(classNamePrefix, className);
    const prefixedTooltipClassNames = (0, _common.prefixClassNames)(classNamePrefix, tooltipClassName, isDragging || isPointerInside ? tooltipVisibleClassName : null);
    return /*#__PURE__*/React.createElement("div", {
      className: prefixedClassName
    }, /*#__PURE__*/React.createElement("div", {
      className: prefixedTooltipClassNames,
      style: {
        left: "".concat(left, "%")
      }
    }, timeDisplay));
  }

}

_defineProperty(TimelineInformation, "streamStateKeysForObservation", ['absoluteStartPosition', 'duration', 'playMode']);

_defineProperty(TimelineInformation, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

TimelineInformation.displayName = 'TimelineInformation';
var _default = TimelineInformation;
exports.default = _default;
//# sourceMappingURL=TimelineInformation.js.map