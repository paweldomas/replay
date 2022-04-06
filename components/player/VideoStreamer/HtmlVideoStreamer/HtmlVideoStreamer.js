"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createVideoStreamerComponent = _interopRequireDefault(require("../common/createVideoStreamerComponent"));

var _BasicVideoStreamer = require("../BasicVideoStreamer/BasicVideoStreamer");

var _fairPlaySourceChangeHandler = _interopRequireDefault(require("./fairPlaySourceChangeHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HtmlVideoStreamer = (0, _createVideoStreamerComponent.default)('HtmlVideoStreamer', (0, _BasicVideoStreamer.getImplementationResolver)(_fairPlaySourceChangeHandler.default));
var _default = HtmlVideoStreamer;
exports.default = _default;
//# sourceMappingURL=HtmlVideoStreamer.js.map