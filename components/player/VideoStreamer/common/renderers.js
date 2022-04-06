"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWithSource = exports.renderWithoutSource = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const createTrackElement = ({
  src,
  srclang,
  kind,
  label,
  onRef
}) =>
/*#__PURE__*/
// $FlowFixMe. ref doesn't accept HTMLTrackElement as subtype to HTMLElement.
React.createElement("track", {
  key: src + (label || ''),
  kind: kind,
  src: src,
  srcLang: srclang,
  label: label,
  ref: onRef
});

const renderWithoutSource = (videoRef, videoElementEventHandlers, props, baseClassName, playsInline, textTracks, style) => {
  const className = props.className,
        classNamePrefix = props.classNamePrefix;
  const classNames = (0, _common.prefixClassNames)(classNamePrefix, baseClassName, className);
  return /*#__PURE__*/React.createElement("video", _extends({
    autoPlay: true,
    controls: false,
    style: style,
    className: classNames,
    ref: videoRef,
    playsInline: playsInline
  }, videoElementEventHandlers), Array.isArray(textTracks) && textTracks.map(createTrackElement));
};

exports.renderWithoutSource = renderWithoutSource;

const renderWithSource = (videoRef, videoElementEventHandlers, props, baseClassName, playsInline, textTracks, style) => {
  const className = props.className,
        classNamePrefix = props.classNamePrefix,
        source = props.source;
  const classNames = (0, _common.prefixClassNames)(classNamePrefix, baseClassName, className);
  const streamUrl = source && (typeof source === 'string' ? source : source.streamUrl);

  if (streamUrl) {
    return /*#__PURE__*/React.createElement("video", _extends({
      autoPlay: true,
      controls: false,
      style: style,
      className: classNames,
      src: streamUrl,
      ref: videoRef,
      playsInline: playsInline
    }, videoElementEventHandlers), Array.isArray(textTracks) && textTracks.map(createTrackElement));
  } else {
    return /*#__PURE__*/React.createElement("video", {
      className: classNames,
      ref: videoRef,
      src: '',
      controls: false,
      style: style
    });
  }
};

exports.renderWithSource = renderWithSource;
//# sourceMappingURL=renderers.js.map