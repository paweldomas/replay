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

const baseClassName = 'button';

const selectClasses = classes => classes.button;

class Button extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleClick", () => this.props.onClick && this.props.onClick());

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
          label = _this$props.label,
          className = _this$props.className,
          classNamePrefix = _this$props.classNamePrefix,
          classes = _this$props.classes,
          content = _this$props.content;
    const classNames = (0, _common.hydrateClassNames)({
      classes,
      selectClasses,
      classNames: [baseClassName, className],
      classNamePrefix
    }); // buildClassNames(useDefaultClassNaming, classNamePrefix, className, baseClassName);

    return /*#__PURE__*/React.createElement("div", {
      title: label,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      className: classNames,
      role: "button",
      tabIndex: 0
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: -1
    }, content));
  }

}

_defineProperty(Button, "defaultProps", {
  useDefaultClassNaming: true
});

var _default = Button;
exports.default = _default;
//# sourceMappingURL=Button.js.map