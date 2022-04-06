"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("../../generic/Button/Button"));

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'exit-button';

class ExitButton extends React.Component {
  render() {
    const _this$props = this.props,
          content = _this$props.content,
          label = _this$props.label,
          classNamePrefix = _this$props.classNamePrefix,
          onClick = _this$props.onClick;

    if (onClick) {
      return /*#__PURE__*/React.createElement(_Button.default, {
        classNamePrefix: classNamePrefix,
        className: className,
        label: label,
        onClick: onClick,
        content: content
      });
    } else {
      return null;
    }
  }

}

_defineProperty(ExitButton, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

ExitButton.displayName = 'ExitButton';
var _default = ExitButton;
exports.default = _default;
//# sourceMappingURL=ExitButton.js.map