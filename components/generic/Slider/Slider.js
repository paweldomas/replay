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

const baseClassName = 'slider';
const isDraggingClassName = 'dragging';
const wasClickedClassName = 'clicked';
const baseTrackClassName = 'slider-track';
const baseHandleClassName = 'slider-handle';
const zeroStyle = '0%';
const horizontalProp = 'left';
const verticalProp = 'bottom';
const keyPressValueStep = 0.025;

const selectDefaultClasses = classes => classes.slider;

const selectDraggingClasses = classes => classes.sliderDragging || classes.slider;

const selectTrackClasses = classes => classes.sliderTrack;

const selectHandleClasses = classes => classes.sliderHandle;

function toPercentString(value, maxValue) {
  const attempt = value / maxValue;

  if (maxValue === Infinity || value === Infinity || maxValue === 0 || isNaN(attempt) || attempt === 0) {
    return zeroStyle;
  } else {
    return "".concat((Math.min(1, attempt) * 100).toFixed(3), "%");
  }
}
/*

The styling of the slider needs to follow some rules in order to get sensible responses from user interactions:

* The draggable or clickable area will be the size of the track element (remember how margin, borders, padding, box-sizing, etc. affects the size).
* The handle positioning (between 0 and 100 percent from left or bottom) should align with the track size and placement.
* The styling needs to take into account the size of the handle itself. The component will not subtract the size of the component in its positioning and value calculations.
* The handle should ideally be shifted half its width to the left for horizontal sliders, or half its height down for vertical sliders. It is the center coordinate that should count.

 */


const decreaseKeys = ['Left', 'ArrowLeft', 'Down', 'ArrowDown'];
const increaseKeys = ['Right', 'ArrowRight', 'Up', 'ArrowUp'];
const allCaptureKeys = decreaseKeys.concat(increaseKeys);

class Slider extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderedHandle", void 0);

    _defineProperty(this, "renderedTrack", void 0);

    _defineProperty(this, "isTouchSupported", void 0);

    _defineProperty(this, "updateValueFromCoordinates", (evt, conditions) => {
      if (this.renderedTrack) {
        const clickCoordinates = (0, _common.getBoundingEventCoordinates)(evt, this.renderedTrack);

        if (this.props.isVertical) {
          const relativeVerticalValue = (clickCoordinates.height - clickCoordinates.y) / clickCoordinates.height;
          this.updateValue(relativeVerticalValue, conditions);
        } else {
          const relativeHorizontalValue = clickCoordinates.x / clickCoordinates.width;
          this.updateValue(relativeHorizontalValue, conditions);
        }
      }
    });

    _defineProperty(this, "updateValue", (relativeValue, {
      isDragging,
      isEnded,
      isPreviewing
    }) => {
      const value = relativeValue * this.props.maxValue;

      if (isPreviewing) {
        this.setState({
          previewValue: value
        });
      } else {
        if (this.state.isDragging) {
          this.setState({
            dragValue: value,
            previewValue: value
          });

          if (this.props.onDrag) {
            this.props.onDrag(value);
          }
        }

        if (this.props.onValueChange && (isEnded || !(this.state.isDragging || isDragging))) {
          this.props.onValueChange(value);
        }
      }
    });

    _defineProperty(this, "handleHandleOrTrackClick", evt => {
      this.updateValueFromCoordinates(evt, {});
    });

    _defineProperty(this, "handleHandleStartDrag", evt => {
      if (evt.type !== 'touchstart') {
        evt.stopPropagation();
      }

      if (!this.state.isDragging) {
        setTimeout(() => this.setState({
          wasClicked: false
        }), 1000);
        this.setState({
          isDragging: true,
          wasClicked: true
        });
        this.updateValueFromCoordinates(evt, {
          isDragging: true
        }); // We are OK with no position updates yet.

        if (this.isTouchSupported) {
          document.addEventListener('touchmove', this.handleHandleDrag);
          document.addEventListener('touchend', this.handleHandleEndDrag);
          document.addEventListener('touchcancel', this.handleHandleEndDrag);
        } else {
          document.addEventListener('mousemove', this.handleHandleDrag);
          document.addEventListener('mouseup', this.handleHandleEndDrag);
          document.addEventListener('mouseleave', this.handleHandleEndDrag);
        }
      }
    });

    _defineProperty(this, "handleHandleDrag", evt => {
      if (this.state.isDragging) {
        this.updateValueFromCoordinates(evt, {});
      } else {
        this.updateValueFromCoordinates(evt, {
          isPreviewing: true
        });
      }
    });

    _defineProperty(this, "handleHandleEndDrag", evt => {
      if (this.state.isDragging) {
        this.updateValueFromCoordinates(evt, {
          isDragging: true,
          isEnded: true
        });
      }

      if (this.isTouchSupported) {
        document.removeEventListener('touchmove', this.handleHandleDrag);
        document.removeEventListener('touchend', this.handleHandleEndDrag);
        document.removeEventListener('touchcancel', this.handleHandleEndDrag);
      } else {
        document.removeEventListener('mousemove', this.handleHandleDrag);
        document.removeEventListener('mouseup', this.handleHandleEndDrag);
        document.removeEventListener('mouseleave', this.handleHandleEndDrag);
      }

      this.setState({
        isDragging: false
      });
    });

    _defineProperty(this, "handleMouseEnter", () => {
      this.setState({
        isPointerInside: true
      });
    });

    _defineProperty(this, "handleMouseLeave", () => {
      this.setState({
        isPointerInside: false
      });
    });

    _defineProperty(this, "handleKeyDown", (0, _common.getKeyboardShortcutBlocker)(allCaptureKeys));

    _defineProperty(this, "handleKeyUp", keyboardEvent => {
      if (!isNaN(this.props.value) && !isNaN(this.props.maxValue)) {
        const relativeValue = this.props.value / this.props.maxValue;

        if (decreaseKeys.indexOf(keyboardEvent.key) >= 0) {
          this.updateValue(Math.max(0, relativeValue - keyPressValueStep), {});
        }

        if (increaseKeys.indexOf(keyboardEvent.key) >= 0) {
          this.updateValue(Math.min(1, relativeValue + keyPressValueStep), {});
        }
      }
    });

    _defineProperty(this, "setRenderedHandle", handle => {
      this.renderedHandle = handle;
    });

    _defineProperty(this, "setRenderedTrack", track => {
      this.renderedTrack = track;
    });

    this.isTouchSupported = 'ontouchend' in window;
    this.state = {};
  }

  render() {
    const _this$props = this.props,
          children = _this$props.children,
          handleContent = _this$props.handleContent,
          trackContent = _this$props.trackContent,
          classNamePrefix = _this$props.classNamePrefix,
          className = _this$props.className,
          classes = _this$props.classes,
          handleClassName = _this$props.handleClassName,
          trackClassName = _this$props.trackClassName,
          label = _this$props.label,
          isVertical = _this$props.isVertical,
          value = _this$props.value,
          maxValue = _this$props.maxValue,
          isUpdateBlocked = _this$props.isUpdateBlocked;
    const _this$state = this.state,
          dragValue = _this$state.dragValue,
          previewValue = _this$state.previewValue,
          isDragging = _this$state.isDragging,
          isPointerInside = _this$state.isPointerInside,
          wasClicked = _this$state.wasClicked;
    const displayValue = (isDragging || isUpdateBlocked) && dragValue != null ? dragValue : value;
    const selectClasses = isDragging ? selectDraggingClasses : selectDefaultClasses;
    const sliderClassNames = (0, _common.hydrateClassNames)({
      classes,
      selectClasses,
      classNamePrefix,
      classNames: [baseClassName, className, isDragging ? isDraggingClassName : null, wasClicked ? wasClickedClassName : null]
    });
    const handleClassNames = (0, _common.hydrateClassNames)({
      classes,
      selectClasses: selectHandleClasses,
      classNamePrefix,
      classNames: [baseHandleClassName, handleClassName]
    });
    const trackClassNames = (0, _common.hydrateClassNames)({
      classes,
      selectClasses: selectTrackClasses,
      classNamePrefix,
      classNames: [baseTrackClassName, trackClassName]
    });
    return /*#__PURE__*/React.createElement("div", {
      onClick: this.handleHandleOrTrackClick,
      onMouseDown: this.handleHandleStartDrag,
      onTouchStart: this.handleHandleStartDrag,
      onTouchMove: this.handleHandleDrag,
      onTouchEnd: this.handleHandleEndDrag,
      onMouseUp: this.handleHandleEndDrag,
      onMouseMove: this.handleHandleDrag,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      title: label,
      role: "slider",
      "aria-valuemin": 0,
      "aria-valuemax": maxValue,
      "aria-valuenow": value,
      className: sliderClassNames,
      tabIndex: 0
    }, /*#__PURE__*/React.createElement("div", {
      className: trackClassNames,
      ref: this.setRenderedTrack
    }, trackContent), React.Children.map(children, child => React.cloneElement(child, {
      previewValue,
      isDragging,
      isPointerInside
    })), /*#__PURE__*/React.createElement("div", {
      className: handleClassNames,
      style: {
        [isVertical ? verticalProp : horizontalProp]: toPercentString(displayValue, maxValue)
      },
      role: "button",
      tabIndex: -1,
      ref: this.setRenderedHandle
    }, handleContent));
  }

}

_defineProperty(Slider, "defaultProps", {
  value: 0,
  maxValue: 1
});

var _default = Slider;
/*

Consider moving all events to track or slider itself. Or moving track on top of children!

 */

/* Assumptions

Clickable area = track length OR is it slider length?
If track length - should we assume that it aligns with possible handle min/max positions?

*/

exports.default = _default;
//# sourceMappingURL=Slider.js.map