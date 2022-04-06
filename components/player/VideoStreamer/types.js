"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaybackError = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Types for state observation
class PlaybackError extends Error {
  constructor(code, technology, message, severity = 'FATAL', sourceError) {
    super(message);

    _defineProperty(this, "code", void 0);

    _defineProperty(this, "severity", void 0);

    _defineProperty(this, "technology", void 0);

    _defineProperty(this, "sourceError", void 0);

    this.code = code;
    this.severity = severity;
    this.technology = technology;
    this.sourceError = sourceError;
  }

}

exports.PlaybackError = PlaybackError;
//# sourceMappingURL=types.js.map