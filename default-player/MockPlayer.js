"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _PlayerController = _interopRequireDefault(require("../components/player/PlayerController/PlayerController"));

var _MockVideoStreamer = _interopRequireDefault(require("../components/player/VideoStreamer/MockVideoStreamer"));

var _playerUI = _interopRequireDefault(require("./playerUI"));

var _graphics = _interopRequireDefault(require("./default-skin/graphics"));

var _strings = _interopRequireDefault(require("./strings"));

var _common = require("../components/common");

var _baseConfiguration = require("./baseConfiguration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const renderPlayerUI = (0, _playerUI.default)(_graphics.default, _strings.default, _common.defaultClassNamePrefix);

const MockPlayer = ({
  options,
  onExit,
  children
} = {}) => /*#__PURE__*/React.createElement(_PlayerController.default, {
  configuration: _baseConfiguration.baseConfiguration,
  options: options,
  render: renderPlayerUI,
  externalProps: {
    onExit
  }
}, /*#__PURE__*/React.createElement(_MockVideoStreamer.default, null, children));

var _default = MockPlayer;
exports.default = _default;
//# sourceMappingURL=MockPlayer.js.map