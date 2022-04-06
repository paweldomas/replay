"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectStreamType = exports.isResourcePlayReadyOrWidevine = exports.isResourceWidevine = exports.isResourcePlayReady = exports.isResourceFairPlay = exports.isChromiumEdgeOnWindows = exports.isLegacyMicrosoft = exports.isSafari = exports.streamTypes = exports.hlsContentTypes = void 0;
const hlsContentTypes = ['application/x-mpegurl', 'vnd.apple.mpegurl'];
exports.hlsContentTypes = hlsContentTypes;
const streamTypes = [{
  name: 'progressive',
  label: 'Progressive (MP4, WebM)',
  contentTypes: ['video/mp4', 'video/webm'],
  urlMatch: /(\.webm|\.mp4)/,
  urlNotMatch: /(\/Manifest|\.mpd|\.m3u)/
}, {
  name: 'dash',
  label: 'MPEG DASH',
  contentTypes: ['application/dash+xml'],
  urlMatch: /\.mpd/
}, {
  name: 'hls',
  label: 'HLS',
  contentTypes: hlsContentTypes,
  urlMatch: /\.m3u/
}, {
  name: 'smooth',
  label: 'Smooth stream',
  contentTypes: ['application/vnd.ms-sstr+xml'],
  urlMatch: /\/Manifest/,
  urlNotMatch: /(\.mpd|\.m3u|\.mp4)/
}];
exports.streamTypes = streamTypes;

const isSafari = userAgent => userAgent.indexOf('Safari') > 0 && userAgent.indexOf('Chrome') < 0 && userAgent.indexOf('Firefox') < 0;

exports.isSafari = isSafari;

const isLegacyMicrosoft = userAgent => userAgent.match(/(Edge\/|rv:11\.0)/);

exports.isLegacyMicrosoft = isLegacyMicrosoft;

const isChromiumEdgeOnWindows = userAgent => userAgent.match(/(Windows NT(.*?)Edg\/)/); // TODO: For symmetry, there should be an method matching all Widevine-compatible browsers.


exports.isChromiumEdgeOnWindows = isChromiumEdgeOnWindows;

const isResourceFairPlay = resource => {
  const contentType = resource.contentType;
  const drmType = resource.drmType ? resource.drmType : null;
  return !!(contentType && hlsContentTypes.indexOf(contentType.toLowerCase()) >= 0 && drmType && drmType.match(/(fairplay|com\.apple\.fps)/i));
};

exports.isResourceFairPlay = isResourceFairPlay;

const isResourcePlayReady = resource => {
  return !!(resource.drmType && resource.drmType.match(/playready/i));
};

exports.isResourcePlayReady = isResourcePlayReady;

const isResourceWidevine = resource => {
  return !!(resource.drmType && resource.drmType.match(/widevine/i));
};

exports.isResourceWidevine = isResourceWidevine;

const isResourcePlayReadyOrWidevine = resource => isResourcePlayReady(resource) || isResourceWidevine(resource);

exports.isResourcePlayReadyOrWidevine = isResourcePlayReadyOrWidevine;

const detectStreamType = (streamUrl, contentType) => streamTypes.filter(type => {
  if (contentType) {
    return type.contentTypes.indexOf(contentType.toLowerCase()) >= 0;
  } else {
    const urlNotMatch = type.urlNotMatch;

    if (urlNotMatch) {
      return type.urlMatch.test(streamUrl) && !urlNotMatch.test(streamUrl);
    } else {
      return type.urlMatch.test(streamUrl);
    }
  }
})[0] || streamTypes[0];

exports.detectStreamType = detectStreamType;
//# sourceMappingURL=helpers.js.map