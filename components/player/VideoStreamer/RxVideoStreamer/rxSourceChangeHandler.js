"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSourceChangeHandler;

var _types = require("../types");

var _sourceNormalizer = _interopRequireDefault(require("../common/sourceNormalizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetchServiceCertificate = url => fetch(url).then(response => response.ok && response.arrayBuffer());

const acquireLicense = (url, headers, body) => fetch(url, headers ? {
  method: 'POST',
  headers,
  body
} : {
  method: 'POST',
  body
}).then(response => response.ok && response.arrayBuffer());

function getSourceChangeHandler(rxPlayer) {
  return ({
    source,
    initialPlaybackProps
  }, prevProps) => {
    const normalizedSource = (0, _sourceNormalizer.default)(source);

    if (normalizedSource) {
      const licenseUrl = normalizedSource.licenseUrl;
      const startPosition = normalizedSource.startPosition;
      const autoPlay = !(initialPlaybackProps && initialPlaybackProps.isPaused);
      const options = {
        url: normalizedSource.streamUrl,
        autoPlay
      };

      if (licenseUrl) {
        const headers = normalizedSource.licenseAcquisitionDetails && normalizedSource.licenseAcquisitionDetails.licenseRequestHeaders;

        const getLicense = (message, messageType) => {
          if (messageType !== 'license-release') {
            return acquireLicense(licenseUrl, headers, message);
          }
        };

        options.keySystems = [{
          type: 'playready',
          getLicense
        }, {
          type: 'widevine',
          getLicense
        }];
      }

      if (startPosition) {
        options.startAt = {
          position: startPosition
        };
      }

      switch (normalizedSource.contentType) {
        case 'application/vnd.ms-sstr+xml':
          options.transport = 'smooth';
          break;

        case 'application/dash+xml':
          options.transport = 'dash';
          break;

        default:
          return Promise.reject(new _types.PlaybackError('STREAM_ERROR_TECHNOLOGY_UNSUPPORTED', 'rxplayer', 'Unspecified source contentType. Cannot decide if the source is a smooth stream or MPEG-DASH stream.'));
      }

      if (options.keySystems && normalizedSource.licenseAcquisitionDetails && normalizedSource.licenseAcquisitionDetails.widevineServiceCertificateUrl && navigator.userAgent.indexOf('Edge') < 0 && (navigator.userAgent.indexOf('Chrome') >= 0 || navigator.userAgent.indexOf('Firefox') >= 0)) {
        return fetchServiceCertificate(normalizedSource.licenseAcquisitionDetails.widevineServiceCertificateUrl).then(cert => {
          options.keySystems[1].serverCertificate = cert;
          rxPlayer.loadVideo(options);
        });
      } else {
        rxPlayer.loadVideo(options);
        return Promise.resolve();
      }
    } else {
      rxPlayer.stop();
      return Promise.resolve();
    }
  };
}
//# sourceMappingURL=rxSourceChangeHandler.js.map