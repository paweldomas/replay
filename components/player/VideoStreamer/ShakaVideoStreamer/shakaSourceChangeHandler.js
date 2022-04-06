"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shakaErrorMapper = _interopRequireDefault(require("./shakaErrorMapper"));

var _sourceNormalizer = _interopRequireDefault(require("../common/sourceNormalizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const widevine = 'com.widevine.alpha';
const playready = 'com.microsoft.playready';

function getEmeAttributes(userAgent, serviceCertificate) {
  // For now, only deals with Chrome and Android Chrome distinctions.
  if (/Android(.*)Chrome/.test(userAgent)) {
    // Lowest level, SW_SECURE_CRYPTO, also for video.
    return {
      audioRobustness: 'SW_SECURE_CRYPTO',
      videoRobustness: 'SW_SECURE_CRYPTO',
      serviceCertificate: serviceCertificate,
      _classification: 'Android Chrome 58 and newer'
    };
  } else {
    return {
      audioRobustness: 'SW_SECURE_CRYPTO',
      videoRobustness: 'SW_SECURE_DECODE',
      serviceCertificate: serviceCertificate,
      _classification: 'Desktop'
    };
  }
}

function addLicenseRequestFilters(shakaLib, shakaPlayer, licenseRequestHeaders) {
  shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
    if (type === shakaLib.net.NetworkingEngine.RequestType.LICENSE) {
      Object.entries(licenseRequestHeaders).forEach(([key, value]) => {
        request.headers[key] = value;
      });
    }
  });
}

function prepareDrm(shakaLib, shakaPlayer, source, configuration) {
  const licenseUrl = source.licenseUrl;
  const drmType = source.drmType;
  const details = source.licenseAcquisitionDetails || {};
  const drmConfig = configuration && configuration.licenseAcquisition || {};
  const serviceCertificate = details.widevineServiceCertificateUrl || drmConfig.widevine && drmConfig.widevine.serviceCertificateUrl;
  const widevineEmeAttributes = getEmeAttributes(navigator.userAgent, serviceCertificate);
  const licenseRequestHeaders = details.licenseRequestHeaders,
        robustness = details.robustness;
  const widevineRobustness = robustness && robustness[widevine] ? {
    audioRobustness: robustness[widevine].audio,
    videoRobustness: robustness[widevine].video
  } : drmConfig.widevine && drmConfig.widevine.robustness ? {
    audioRobustness: drmConfig.widevine.robustness.audio,
    videoRobustness: drmConfig.widevine.robustness.video
  } : {
    audioRobustness: widevineEmeAttributes.audioRobustness,
    videoRobustness: widevineEmeAttributes.videoRobustness
  };
  const playreadyRobustness = robustness && robustness[playready] ? {
    audioRobustness: robustness[playready].audio,
    videoRobustness: robustness[playready].video
  } : drmConfig.playReady && drmConfig.playReady.robustness ? {
    audioRobustness: drmConfig.playReady.robustness.audio,
    videoRobustness: drmConfig.playReady.robustness.video
  } : {
    videoRobustness: 'SW_SECURE_DECODE',
    audioRobustness: 'SW_SECURE_CRYPTO'
  };

  if (licenseRequestHeaders && Object.keys(licenseRequestHeaders).length > 0) {
    addLicenseRequestFilters(shakaLib, shakaPlayer, licenseRequestHeaders);
  }

  const servers = drmType ? {
    [drmType]: licenseUrl
  } : {
    [widevine]: licenseUrl,
    [playready]: licenseUrl
  };
  shakaPlayer.configure({
    drm: {
      servers,
      advanced: {
        'com.widevine.alpha': _objectSpread({}, widevineRobustness, {
          serverCertificate: widevineEmeAttributes.serviceCertificate
        }),
        'com.microsoft.playready': playreadyRobustness
      }
    }
  });
  return Promise.resolve();
}

function prepareFilters(shakaPlayer, shakaRequestFilter, shakaResponseFilter) {
  const networkingEngine = shakaPlayer.getNetworkingEngine();

  if (networkingEngine) {
    networkingEngine.clearAllRequestFilters();
    networkingEngine.clearAllResponseFilters();

    if (shakaRequestFilter) {
      networkingEngine.registerRequestFilter(shakaRequestFilter);
    }

    if (shakaResponseFilter) {
      networkingEngine.registerResponseFilter(shakaResponseFilter);
    }
  } // To be leaved for plugging in: Credentials, request headers, license request headers, manifest modification, manifest corrections.


  return Promise.resolve();
}

const getSourceChangeHandler = (shakaLib, shakaPlayer) => (nextProps, prevProps) => {
  const shakaRequestFilter = nextProps.shakaRequestFilter,
        shakaResponseFilter = nextProps.shakaResponseFilter;
  const source = (0, _sourceNormalizer.default)(nextProps.source);

  if (source) {
    return prepareFilters(shakaPlayer, shakaRequestFilter, shakaResponseFilter).then(() => prepareDrm(shakaLib, shakaPlayer, source, nextProps.configuration)).then(() => shakaPlayer.load(source.streamUrl, source.startPosition)).catch(err => {
      if (err && err.code !== shakaLib.util.Error.Code.LOAD_INTERRUPTED) {
        throw (0, _shakaErrorMapper.default)(shakaLib, false, err, navigator.userAgent, document.location);
      }
    });
  } else if (prevProps && prevProps.source) {
    // And no new source.
    const networkingEngine = shakaPlayer.getNetworkingEngine();
    networkingEngine.clearAllRequestFilters();
    networkingEngine.clearAllResponseFilters();
    return shakaPlayer.unload();
  } else {
    return Promise.resolve();
  }
};

var _default = getSourceChangeHandler;
exports.default = _default;
//# sourceMappingURL=shakaSourceChangeHandler.js.map