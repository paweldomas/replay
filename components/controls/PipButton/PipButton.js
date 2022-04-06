"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _ToggleButton = _interopRequireDefault(require("../../generic/ToggleButton/ToggleButton"));

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'pip-button';

class PipButton extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleToggle", value => {
      if (this.props.setProperties) {
        this.props.setProperties({
          isPipActive: value
        });
      }
    });
  }

  render() {
    if (this.props.isPipAvailable) {
      const _this$props = this.props,
            isPipActive = _this$props.isPipActive,
            pipActiveContent = _this$props.pipActiveContent,
            pipInactiveContent = _this$props.pipInactiveContent,
            label = _this$props.label,
            classNamePrefix = _this$props.classNamePrefix;
      return /*#__PURE__*/React.createElement(_ToggleButton.default, {
        classNamePrefix: classNamePrefix,
        isOn: isPipActive,
        className: className,
        label: label,
        onToggle: this.handleToggle,
        toggledOnContent: pipActiveContent,
        toggledOffContent: pipInactiveContent
      });
    } else {
      return null;
    }
  }

}

_defineProperty(PipButton, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

_defineProperty(PipButton, "streamStateKeysForObservation", ['isPipAvailable', 'isPipActive']);

PipButton.displayName = 'PipButton';
var _default = PipButton;
exports.default = _default;
//# sourceMappingURL=PipButton.js.map