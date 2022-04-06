"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LoadingAnimation = () => /*#__PURE__*/React.createElement("svg", {
  width: "100%",
  height: "100%",
  viewBox: "0 0 38 38",
  stroke: "currentColor"
}, /*#__PURE__*/React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(1 1)",
  strokeWidth: "2"
}, /*#__PURE__*/React.createElement("circle", {
  stroke: "currentColor",
  strokeOpacity: "0.5",
  cx: "18",
  cy: "18",
  r: "18"
}), /*#__PURE__*/React.createElement("path", {
  className: "animated",
  d: "M36 18c0-9.94-8.06-18-18-18"
}))));

var _default = LoadingAnimation;
exports.default = _default;
//# sourceMappingURL=LoadingAnimation.js.map