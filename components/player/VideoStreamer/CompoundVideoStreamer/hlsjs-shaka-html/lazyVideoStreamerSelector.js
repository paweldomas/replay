"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _helpers = require("../helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const HlsjsVideoStreamer = (0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../HlsjsVideoStreamer/HlsjsVideoStreamer'))));
const ShakaVideoStreamer = (0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../ShakaVideoStreamer/ShakaVideoStreamer'))));
const HtmlVideoStreamer = (0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../HtmlVideoStreamer/HtmlVideoStreamer'))));
const BasicVideoStreamer = (0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../BasicVideoStreamer/BasicVideoStreamer'))));

const selectVideoStreamerImporter = (source, userAgent) => {
  if (source) {
    const contentType = typeof source === 'string' ? null : source.contentType;
    const streamUrl = typeof source === 'string' ? source : source.streamUrl;
    const streamType = (0, _helpers.detectStreamType)(streamUrl, contentType);

    switch (streamType.name) {
      case 'hls':
        if ((0, _helpers.isSafari)(userAgent)) {
          return HtmlVideoStreamer;
        } else {
          return HlsjsVideoStreamer;
        }

      case 'dash':
        return ShakaVideoStreamer;

      default:
        return BasicVideoStreamer;
    }
  } else {
    return () => BasicVideoStreamer;
  }
};

var _default = selectVideoStreamerImporter;
exports.default = _default;
//# sourceMappingURL=lazyVideoStreamerSelector.js.map