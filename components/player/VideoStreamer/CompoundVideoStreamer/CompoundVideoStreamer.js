"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createVideoStreamerResolver = exports.StreamResourceResolutionError = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("../types");

var _lazyVideoStreamerSelector = _interopRequireDefault(require("./hlsjs-shaka-html/lazyVideoStreamerSelector"));

var _compatibleStreamSelector = _interopRequireDefault(require("./playready-widevine-fairplay/compatibleStreamSelector"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StreamResourceResolutionError extends _types.PlaybackError {
  constructor(message, supportedDrmType, resources) {
    const generalMessage = ' In order to select the appropriate stream and DRM technology for the current browser, ' + 'alternative stream resources must be specified with recognizable contentType and drmType properties. Refer ' + 'the Replay documentation for a listing of the supported and recognized stream content types and DRM types.';
    super('STREAM_ERROR_TECHNOLOGY_UNSUPPORTED', message + generalMessage);

    _defineProperty(this, "supportedDrmType", void 0);

    _defineProperty(this, "availableResources", void 0);

    this.supportedDrmType = supportedDrmType;
    this.availableResources = resources;
  }

}

exports.StreamResourceResolutionError = StreamResourceResolutionError;
const normalizeSource = (0, _memoizeOne.default)(source => typeof source === 'string' ? {
  streamUrl: source
} : source);
const mergeAndMemoize = (0, _memoizeOne.default)((a, b) => {
  return _objectSpread({}, a, {}, b);
});
const mergeAndMemoizePropsWithSource = (0, _memoizeOne.default)((props, source) => {
  return _objectSpread({}, props, {
    source
  });
});

const createVideoStreamerResolver = (selectCompatibleStream, selectLazyVideoStreamer) => {
  return props => {
    let source = normalizeSource(props.source);
    const alternativeStreamResources = source && typeof source !== 'string' ? source.alternativeStreamResources : null;

    if (Array.isArray(alternativeStreamResources)) {
      try {
        source = mergeAndMemoize(source, selectCompatibleStream(alternativeStreamResources, navigator.userAgent));
      } catch (err) {
        if (err instanceof StreamResourceResolutionError) {
          if (props.onPlaybackError) {
            props.onPlaybackError(err);
          }

          source = null;
        } else {
          throw err;
        }
      }
    }

    if (source) {
      const VideoStreamer = selectLazyVideoStreamer(source, navigator.userAgent);
      const modifiedProps = mergeAndMemoizePropsWithSource(props, source);

      if (VideoStreamer) {
        return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
          fallback: /*#__PURE__*/_react.default.createElement("div", null)
        }, /*#__PURE__*/_react.default.createElement(VideoStreamer, modifiedProps));
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
};

exports.createVideoStreamerResolver = createVideoStreamerResolver;
const CompoundVideoStreamer = createVideoStreamerResolver(_compatibleStreamSelector.default, _lazyVideoStreamerSelector.default);
var _default = CompoundVideoStreamer;
exports.default = _default;
//# sourceMappingURL=CompoundVideoStreamer.js.map