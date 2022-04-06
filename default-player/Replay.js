"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseConfiguration = require("./baseConfiguration");

var _playerComposer = _interopRequireDefault(require("../playerComposer"));

var _graphics = _interopRequireDefault(require("./default-skin/graphics"));

var _strings = _interopRequireDefault(require("./strings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Replay = (0, _playerComposer.default)({
  name: 'Replay',
  graphics: _graphics.default,
  strings: _strings.default,
  configuration: _baseConfiguration.baseConfiguration // Already added as default value.

}); // This is the component to be consumed in a full React SPA.

var _default = Replay;
exports.default = _default;
//# sourceMappingURL=Replay.js.map