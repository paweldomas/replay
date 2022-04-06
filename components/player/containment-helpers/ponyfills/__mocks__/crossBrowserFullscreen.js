"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifyFullscreenChange = exports.exitFullscreen = exports.enterFullscreen = exports.getFullscreenElement = void 0;
const getFullscreenElement = jest.fn();
exports.getFullscreenElement = getFullscreenElement;
const enterFullscreen = jest.fn();
exports.enterFullscreen = enterFullscreen;
const exitFullscreen = jest.fn();
exports.exitFullscreen = exitFullscreen;
const notifyFullscreenChange = jest.fn();
exports.notifyFullscreenChange = notifyFullscreenChange;
//# sourceMappingURL=crossBrowserFullscreen.js.map