"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSourceChangeHandler;

var _sourceNormalizer = _interopRequireDefault(require("../common/sourceNormalizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSourceChangeHandler(videoElement) {
  const handleSourceChange = ({
    source
  }, prevProps) => {
    const n = (0, _sourceNormalizer.default)(source);

    if (n && n.streamUrl) {
      if (typeof n.startPosition === 'number' && n.streamUrl.indexOf('#t=') < 0) {
        videoElement.src = "".concat(n.streamUrl, "#t=").concat(n.startPosition.toFixed(2));
      } else {
        videoElement.src = n.streamUrl;
      }
    } else if (videoElement.src) {
      videoElement.removeAttribute('src');
      videoElement.load();
    }

    return Promise.resolve();
  };

  return handleSourceChange;
}
//# sourceMappingURL=sourceChangeHandler.js.map