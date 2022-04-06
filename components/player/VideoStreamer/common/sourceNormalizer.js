"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const normalizeSource = source => typeof source === 'string' ? {
  streamUrl: source
} : source;

var _default = normalizeSource;
exports.default = _default;
//# sourceMappingURL=sourceNormalizer.js.map