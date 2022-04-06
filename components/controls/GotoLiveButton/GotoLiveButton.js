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

const className = 'goto-live-button';

class GotoLiveButton extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleToggle", value => {
      if (value && this.props.setProperties) {
        this.props.setProperties({
          isAtLiveEdge: true
        });
      }
    });
  }

  render() {
    const _this$props = this.props,
          playMode = _this$props.playMode,
          isAtLiveEdge = _this$props.isAtLiveEdge,
          isAtLiveEdgeContent = _this$props.isAtLiveEdgeContent,
          isNotAtLiveEdgeContent = _this$props.isNotAtLiveEdgeContent,
          label = _this$props.label,
          classNamePrefix = _this$props.classNamePrefix;
    return playMode === 'livedvr' ? /*#__PURE__*/React.createElement(_ToggleButton.default, {
      classNamePrefix: classNamePrefix,
      isOn: isAtLiveEdge,
      className: className,
      label: label,
      onToggle: this.handleToggle,
      toggledOnContent: isAtLiveEdgeContent,
      toggledOffContent: isNotAtLiveEdgeContent
    }) : null;
  }

}

_defineProperty(GotoLiveButton, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

_defineProperty(GotoLiveButton, "streamStateKeysForObservation", ['isAtLiveEdge', 'playMode']);

GotoLiveButton.displayName = 'GotoLiveButton';
var _default = GotoLiveButton;
exports.default = _default;
//# sourceMappingURL=GotoLiveButton.js.map