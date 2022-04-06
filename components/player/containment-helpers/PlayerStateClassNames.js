"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _playerStateClassNameBuilder = _interopRequireDefault(require("./playerStateClassNameBuilder"));

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PlayerStateClassNames extends React.Component {
  render() {
    const _this$props = this.props,
          render = _this$props.render,
          classNamePrefix = _this$props.classNamePrefix,
          classNameDefinitions = _this$props.classNameDefinitions,
          className = _this$props.className,
          extraClassNames = _this$props.extraClassNames,
          playerStateProps = _objectWithoutProperties(_this$props, ["render", "classNamePrefix", "classNameDefinitions", "className", "extraClassNames"]);

    return render((0, _playerStateClassNameBuilder.default)(playerStateProps, classNameDefinitions, classNamePrefix, className ? [className, ...extraClassNames] : extraClassNames));
  }

}

_defineProperty(PlayerStateClassNames, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix,
  extraClassNames: []
});

_defineProperty(PlayerStateClassNames, "streamStateKeysForObservation", ['isPaused', 'isSeeking', 'isBuffering', 'isMuted', 'volume', 'isAtLiveEdge', 'playState', 'error', 'playMode']);

var _default = PlayerStateClassNames;
exports.default = _default;
//# sourceMappingURL=PlayerStateClassNames.js.map