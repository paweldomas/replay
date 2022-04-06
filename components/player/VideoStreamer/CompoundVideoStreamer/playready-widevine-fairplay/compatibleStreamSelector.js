"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompoundVideoStreamer = require("../CompoundVideoStreamer");

var _helpers = require("../helpers");

const selectCompatibleDrmStream = (alternativeStreamResources, userAgent) => {
  const matcher = (0, _helpers.isSafari)(userAgent) ? _helpers.isResourceFairPlay : (0, _helpers.isLegacyMicrosoft)(userAgent) ? _helpers.isResourcePlayReady : (0, _helpers.isChromiumEdgeOnWindows)(userAgent) ? _helpers.isResourcePlayReadyOrWidevine : _helpers.isResourceWidevine;
  const matchingStream = alternativeStreamResources.find(matcher);

  if (matchingStream) {
    return matchingStream;
  } else if (alternativeStreamResources.length) {
    if ((0, _helpers.isSafari)(userAgent)) {
      const message = 'The browser detected is Safari. Only HLS with FairPlay DRM is supported. ' + 'Found no stream resource with contentType match for HLS and drmType match for FairPlay.';
      throw new _CompoundVideoStreamer.StreamResourceResolutionError(message, 'FairPlay', alternativeStreamResources);
    } else if ((0, _helpers.isLegacyMicrosoft)(userAgent)) {
      const message = 'The browser detected is Microsoft Edge Legacy or Internet Explorer 11, supporting PlayReady DRM. ' + 'Found no stream resource with drmType match for PlayReady.';
      throw new _CompoundVideoStreamer.StreamResourceResolutionError(message, 'PlayReady', alternativeStreamResources);
    } else {
      const message = 'The browser detected is assumed to support Widevine DRM (Chrome, Chromium-based Edge, Firefox and derivatives). ' + 'Found no stream resource with drmType match for Widevine.';
      throw new _CompoundVideoStreamer.StreamResourceResolutionError(message, 'Widevine', alternativeStreamResources);
    }
  } else {
    throw new _CompoundVideoStreamer.StreamResourceResolutionError('No alternative stream resources were specified.');
  }
};

var _default = selectCompatibleDrmStream;
exports.default = _default;
//# sourceMappingURL=compatibleStreamSelector.js.map