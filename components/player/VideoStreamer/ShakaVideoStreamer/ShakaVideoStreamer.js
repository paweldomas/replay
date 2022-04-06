"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shakaPlayer = _interopRequireDefault(require("shaka-player"));

var _injectableShakaVideoStreamer = _interopRequireDefault(require("./injectableShakaVideoStreamer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ShakaVideoStreamer = (0, _injectableShakaVideoStreamer.default)(_shakaPlayer.default);
var _default = ShakaVideoStreamer;
exports.default = _default;
//# sourceMappingURL=ShakaVideoStreamer.js.map