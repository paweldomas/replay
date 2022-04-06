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

const baseClassName = 'toggle-button';
const offClassName = 'toggled-off';
const onClassName = 'toggled-on';

const selectOffClasses = classes => classes.toggleButtonOff || classes.toggleButton;

const selectOnClasses = classes => classes.toggleButtonOn || classes.toggleButton;
/**
 * Renders a button with two states - toggled on and off. When clicked, it reports back the opposite state.
 */


class ToggleButton extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleClick", () => this.props.onToggle && this.props.onToggle(!this.props.isOn));

    _defineProperty(this, "handleKeyDown", (0, _common.getKeyboardShortcutBlocker)(['Enter', ' ']));

    _defineProperty(this, "handleKeyUp", keyboardEvent => {
      if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
        keyboardEvent.preventDefault();
        this.handleClick();
      }
    });
  }

  render() {
    const _this$props = this.props,
          isOn = _this$props.isOn,
          label = _this$props.label,
          className = _this$props.className,
          classNamePrefix = _this$props.classNamePrefix,
          toggledOnContent = _this$props.toggledOnContent,
          toggledOffContent = _this$props.toggledOffContent,
          onRef = _this$props.onRef,
          classes = _this$props.classes;
    const toggleClassName = isOn ? onClassName : offClassName;
    const classNames = (0, _common.hydrateClassNames)({
      classes,
      selectClasses: isOn ? selectOnClasses : selectOffClasses,
      classNamePrefix,
      classNames: [className, baseClassName, toggleClassName]
    });
    const content = isOn ? toggledOnContent : toggledOffContent;
    return /*#__PURE__*/React.createElement("div", {
      role: "button",
      "aria-pressed": isOn,
      title: label,
      onClick: this.handleClick,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      ref: onRef,
      className: classNames,
      tabIndex: 0
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: -1
    }, content));
  }

}

_defineProperty(ToggleButton, "defaultProps", {
  useDefaultClassNaming: true
});

var _default = ToggleButton;
exports.default = _default;
//# sourceMappingURL=ToggleButton.js.map