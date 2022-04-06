"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Container = _interopRequireDefault(require("../../generic/Container/Container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ControlsBar extends _Container.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "baseClassName", 'controls-bar');
  }

}

ControlsBar.displayName = 'ControlsBar';
var _default = ControlsBar;
exports.default = _default;
//# sourceMappingURL=ControlsBar.js.map