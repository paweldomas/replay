"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shakaPlayerCompiled = _interopRequireDefault(require("shaka-player/dist/shaka-player.compiled.debug"));

var _injectableShakaVideoStreamer = _interopRequireDefault(require("./injectableShakaVideoStreamer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ShakaDebugVideoStreamer = (0, _injectableShakaVideoStreamer.default)(_shakaPlayerCompiled.default);
window.shaka = _shakaPlayerCompiled.default;
var _default = ShakaDebugVideoStreamer;
exports.default = _default;
//# sourceMappingURL=ShakaDebugVideoStreamer.js.map