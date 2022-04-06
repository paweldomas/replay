"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const className = 'buffering-indicator';
const isActiveClassName = 'buffering';

const BufferingIndicator = ({
  children,
  content,
  isBuffering,
  isSeeking,
  playState,
  renderStrategy = 'when-buffering',
  label,
  classNamePrefix = _common.defaultClassNamePrefix
}) => {
  const isActive = isBuffering || isSeeking || playState === 'starting' || playState === 'buffering' || playState === 'seeking';

  if (renderStrategy === 'always') {
    if (isActive) {
      return /*#__PURE__*/React.createElement("div", {
        title: label,
        className: (0, _common.prefixClassNames)(classNamePrefix, className, isActiveClassName)
      }, children || content);
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _common.prefixClassNames)(classNamePrefix, className)
      }, children || content);
    }
  } else {
    if (isActive) {
      return /*#__PURE__*/React.createElement("div", {
        title: label,
        className: (0, _common.prefixClassNames)(classNamePrefix, className, isActiveClassName)
      }, children || content);
    } else {
      return null;
    }
  }
};

BufferingIndicator.streamStateKeysForObservation = ['isBuffering', 'isSeeking', 'playState'];
BufferingIndicator.displayName = 'BufferingIndicator';
var _default = BufferingIndicator;
exports.default = _default;
//# sourceMappingURL=BufferingIndicator.js.map