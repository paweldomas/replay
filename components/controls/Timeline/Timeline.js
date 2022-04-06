"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

var _Slider = _interopRequireDefault(require("../../generic/Slider/Slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'timeline';
const trackClassName = 'timeline-track';
const handleClassName = 'timeline-handle';

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "timeoutId", void 0);

    _defineProperty(this, "handleSliderChange", position => {
      if (this.props.setProperties) {
        this.props.setProperties({
          position
        });
      }
    });

    _defineProperty(this, "handleDrag", () => {
      this.setState({
        isDragging: true
      });

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.setState({
          isDragging: false
        });
        this.timeoutId = null;
      }, 800);
    });

    this.state = {
      isDragging: false
    };
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  render() {
    const _this$props = this.props,
          position = _this$props.position,
          duration = _this$props.duration,
          isSeeking = _this$props.isSeeking,
          label = _this$props.label,
          classNamePrefix = _this$props.classNamePrefix,
          children = _this$props.children,
          handleContent = _this$props.handleContent,
          trackContent = _this$props.trackContent,
          reduceDragGlitch = _this$props.reduceDragGlitch;
    return /*#__PURE__*/React.createElement(_Slider.default, {
      label: label,
      value: position,
      maxValue: duration,
      isUpdateBlocked: isSeeking || this.state.isDragging,
      handleContent: handleContent,
      trackContent: trackContent,
      onValueChange: this.handleSliderChange,
      onDrag: reduceDragGlitch ? this.handleDrag : undefined,
      classNamePrefix: classNamePrefix,
      className: className,
      trackClassName: trackClassName,
      handleClassName: handleClassName
    }, children);
  }

}

_defineProperty(Timeline, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix,
  reduceDragGlitch: true
});

_defineProperty(Timeline, "streamStateKeysForObservation", ['position', 'duration', 'isSeeking']);

Timeline.displayName = 'Timeline';
var _default = Timeline;
exports.default = _default;
//# sourceMappingURL=Timeline.js.map