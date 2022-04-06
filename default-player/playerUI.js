"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../components/common");

var _ControlsBar = _interopRequireDefault(require("../components/controls/ControlsBar/ControlsBar"));

var _FullscreenButton = _interopRequireDefault(require("../components/controls/FullscreenButton/FullscreenButton"));

var _ExitButton = _interopRequireDefault(require("../components/controls/ExitButton/ExitButton"));

var _PlaybackMonitor = _interopRequireDefault(require("../components/controls/PlaybackMonitor/PlaybackMonitor"));

var _connectedControls = require("../components/player/PlayerController/connectedControls");

var _connectControl = require("../components/player/PlayerController/connectControl");

var _RenderIfEnabled = _interopRequireDefault(require("../components/player/RenderIfEnabled"));

var _PreferredSettingsApplicator = _interopRequireDefault(require("../components/player/settings-helpers/PreferredSettingsApplicator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AudioSelector = _connectedControls.SettingsStorage.AudioSelector,
      SubtitlesSelector = _connectedControls.SettingsStorage.SubtitlesSelector,
      Volume = _connectedControls.SettingsStorage.Volume;

const getSkipBackOffset = conf => conf && conf.controls && conf.controls.skipButtonOffset;

const getLiveDisplayMode = conf => conf && conf.controls && conf.controls.liveDisplayMode;

const getQSStrategy = conf => conf && conf.controls && conf.controls.qualitySelectionStrategy;

const merge = (strings, graphics) => {
  const merged = {};
  Object.entries(strings).forEach(([control, props]) => {
    merged[control] = _objectSpread({}, merged[control], {}, props);
  });
  Object.entries(graphics).forEach(([control, props]) => {
    merged[control] = _objectSpread({}, merged[control], {}, props);
  });
  return merged;
}; // The following method is assembling all controls into the player UI. Create a copy for assembling custom player UIs.


const getPlayerUIRenderer = (graphics, strings, classNamePrefix = _common.defaultClassNamePrefix) => {
  const u = merge(strings, graphics);

  const renderPlayerUI = ({
    configuration,
    externalProps
  }) => {
    const prefix = {
      classNamePrefix: configuration && configuration.classNamePrefix || classNamePrefix
    };
    const includedControlsList = configuration.controls && configuration.controls.includeControls;
    return /*#__PURE__*/React.createElement(_connectedControls.PlayerUIContainer, _extends({
      configuration: configuration
    }, prefix, {
      render: ({
        fullscreenState
      }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_connectControl.ControlledVideoStreamer, prefix), /*#__PURE__*/React.createElement(_RenderIfEnabled.default, {
        configuration: includedControlsList
      }, /*#__PURE__*/React.createElement(_ExitButton.default, _extends({}, u.exitButton, prefix, {
        onClick: externalProps && externalProps.onExit
      })), /*#__PURE__*/React.createElement(_PlaybackMonitor.default, _extends({}, u.playbackMonitor, {
        configuration: configuration
      }))), /*#__PURE__*/React.createElement(_ControlsBar.default, prefix, /*#__PURE__*/React.createElement(_RenderIfEnabled.default, {
        configuration: includedControlsList
      }, /*#__PURE__*/React.createElement(_connectedControls.PlayPauseButton, _extends({}, u.playPauseButton, prefix)), /*#__PURE__*/React.createElement(_connectedControls.SkipButton, _extends({}, u.skipButton, prefix, {
        offset: getSkipBackOffset(configuration)
      })), /*#__PURE__*/React.createElement(_connectedControls.Timeline, _extends({}, u.timeline, prefix), /*#__PURE__*/React.createElement(_connectedControls.TimelineInformation, prefix)), /*#__PURE__*/React.createElement(_connectedControls.TimeDisplay, _extends({}, u.timeDisplay, prefix, {
        liveDisplayMode: getLiveDisplayMode(configuration)
      })), /*#__PURE__*/React.createElement(_connectedControls.GotoLiveButton, _extends({}, u.gotoLiveButton, prefix)), /*#__PURE__*/React.createElement(Volume, _extends({}, u.volume, prefix, {
        configuration: configuration
      })), /*#__PURE__*/React.createElement(AudioSelector, _extends({}, u.audioSelector, prefix, {
        configuration: configuration
      })), /*#__PURE__*/React.createElement(SubtitlesSelector, _extends({}, u.subtitlesSelector, prefix, {
        configuration: configuration
      })), /*#__PURE__*/React.createElement(_connectedControls.QualitySelector, _extends({}, u.qualitySelector, prefix, {
        selectionStrategy: getQSStrategy(configuration)
      })), /*#__PURE__*/React.createElement(_connectedControls.PipButton, _extends({}, u.pipButton, prefix)), /*#__PURE__*/React.createElement(_connectedControls.AirPlayButton, _extends({}, u.airPlayButton, prefix)), /*#__PURE__*/React.createElement(_FullscreenButton.default, _extends({}, u.fullscreenButton, prefix, fullscreenState)))), /*#__PURE__*/React.createElement(_RenderIfEnabled.default, {
        configuration: includedControlsList
      }, /*#__PURE__*/React.createElement(_connectedControls.BufferingIndicator, _extends({}, u.bufferingIndicator, prefix))), /*#__PURE__*/React.createElement(_PreferredSettingsApplicator.default, _extends({
        configuration: configuration
      }, externalProps.initialPlaybackProps)))
    }));
  };

  return renderPlayerUI;
};

var _default = getPlayerUIRenderer;
exports.default = _default;
//# sourceMappingURL=playerUI.js.map