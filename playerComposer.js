"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _PlayerController = _interopRequireDefault(require("./components/player/PlayerController/PlayerController"));

var _baseConfiguration = require("./default-player/baseConfiguration");

var _playerUI = _interopRequireDefault(require("./default-player/playerUI"));

var _common = require("./components/common");

var _version = _interopRequireDefault(require("./version"));

var _BasicVideoStreamer = _interopRequireDefault(require("./components/player/VideoStreamer/BasicVideoStreamer/BasicVideoStreamer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// In addition comes CSS.
const defaultVideoStreamerResolver = (Component, children, source, textTracks) => children ? React.cloneElement(children, {
  source,
  textTracks
}) : /*#__PURE__*/React.createElement(_BasicVideoStreamer.default, {
  source: source,
  textTracks: textTracks
});

const composePlayer = ({
  name,
  videoStreamerComponent,
  graphics,
  strings,
  uiRenderMethod,
  resolveVideoStreamerMethod = defaultVideoStreamerResolver,
  classNamePrefix = _common.defaultClassNamePrefix,
  configuration = _baseConfiguration.baseConfiguration,
  version = _version.default
}) => {
  const renderUI = uiRenderMethod || graphics && strings && (0, _playerUI.default)(graphics, strings, classNamePrefix);

  if (!renderUI) {
    throw new Error('Either a custom UI render method must be specified in the customization parameters, ' + 'or graphics and strings must be specified for the default player UI renderer.');
  }

  const ComposedPlayer = (_ref) => {
    let source = _ref.source,
        textTracks = _ref.textTracks,
        options = _ref.options,
        onPlaybackActionsReady = _ref.onPlaybackActionsReady,
        onStreamStateChange = _ref.onStreamStateChange,
        onExit = _ref.onExit,
        onError = _ref.onError,
        initialPlaybackProps = _ref.initialPlaybackProps,
        children = _ref.children,
        externalProps = _objectWithoutProperties(_ref, ["source", "textTracks", "options", "onPlaybackActionsReady", "onStreamStateChange", "onExit", "onError", "initialPlaybackProps", "children"]);

    return /*#__PURE__*/React.createElement(_PlayerController.default, {
      render: renderUI,
      configuration: configuration,
      options: options,
      onStreamerError: onError,
      onPlaybackActionsReady: onPlaybackActionsReady,
      onStreamStateChange: onStreamStateChange,
      initialPlaybackProps: initialPlaybackProps,
      externalProps: _objectSpread({}, externalProps, {
        onExit,
        initialPlaybackProps
      })
    }, resolveVideoStreamerMethod(videoStreamerComponent, children, source, textTracks) || null);
  };

  if (name) {
    ComposedPlayer.displayName = name;
  }

  ComposedPlayer.version = version;
  return ComposedPlayer;
};

var _default = composePlayer;
exports.default = _default;
//# sourceMappingURL=playerComposer.js.map