"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getConnectedPlayerUIContainer = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

var _Fullscreen = _interopRequireDefault(require("../containment-helpers/Fullscreen"));

var _AspectRatio = _interopRequireDefault(require("../containment-helpers/AspectRatio"));

var _InteractionDetector = _interopRequireDefault(require("../containment-helpers/InteractionDetector"));

var _KeyboardShortcuts = _interopRequireDefault(require("../containment-helpers/KeyboardShortcuts"));

var _PlayerStateClassNames = _interopRequireDefault(require("../containment-helpers/PlayerStateClassNames"));

var _ResponsiveClassNames = _interopRequireDefault(require("../containment-helpers/ResponsiveClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const uiContainerClassName = 'ui-container';
const aspectRatioFixClassName = 'aspect-ratio-fix';
const classNameDefinitions = {
  responsivenessPrefix: 'player-size-',
  volumePrefix: 'volume-level-',
  isFullscreen: 'is-fullscreen',
  isUserActive: 'is-user-active',
  isUserInactive: 'is-user-inactive',
  isBuffering: 'is-buffering',
  isSeeking: 'is-seeking',
  isPlaying: 'is-playing',
  isPaused: 'is-paused',
  isStarting: 'is-starting',
  isMuted: 'is-muted',
  isAtLiveEdge: 'is-at-live-edge',
  isLive: 'is-live',
  isOnDemand: 'is-on-demand',
  isDvrEnabled: 'is-dvr-enabled',
  isFailed: 'is-failed'
}; // Make stateClassNames pass an array with all relevant keys, so that a simple mapping can be done.
// In addition comes dynamically generated class names from responsiveness, and perhaps volume level.

const noConnect = Component => Component;

const getConnectedPlayerUIContainer = (connector = noConnect) => {
  var _class, _temp;

  const ConnectedPlayerStateClassNames = connector(_PlayerStateClassNames.default);
  const ConnectedKeyboardShortcuts = connector(_KeyboardShortcuts.default);
  return _temp = _class = class PlayerUIContainer extends React.Component {
    render() {
      const _this$props = this.props,
            classNamePrefix = _this$props.classNamePrefix,
            _render = _this$props.render,
            configuration = _this$props.configuration,
            aspectRatio = _this$props.aspectRatio,
            className = _this$props.className;
      const playerClassName = classNamePrefix ? classNamePrefix.substr(0, classNamePrefix.length - 1) : className;
      return /*#__PURE__*/React.createElement(_AspectRatio.default, {
        rootClassName: playerClassName,
        aspectRatio: aspectRatio || configuration && configuration.aspectRatio,
        aspectFixClassName: aspectRatioFixClassName,
        classNamePrefix: classNamePrefix,
        render: () => /*#__PURE__*/React.createElement(_Fullscreen.default, {
          render: (_ref) => {
            let onRef = _ref.onRef,
                fullscreenState = _objectWithoutProperties(_ref, ["onRef"]);

            return /*#__PURE__*/React.createElement(_InteractionDetector.default, {
              configuration: configuration,
              render: (_ref2) => {
                let handleMouseMove = _ref2.handleMouseMove,
                    handleTouchStart = _ref2.handleTouchStart,
                    handleTouchEnd = _ref2.handleTouchEnd,
                    handleFocus = _ref2.handleFocus,
                    interactionState = _objectWithoutProperties(_ref2, ["handleMouseMove", "handleTouchStart", "handleTouchEnd", "handleFocus"]);

                return /*#__PURE__*/React.createElement(ConnectedKeyboardShortcuts, {
                  configuration: configuration,
                  fullscreenState: fullscreenState,
                  nudge: interactionState.nudge,
                  toggleFixedUserActive: interactionState.toggleFixedUserActive,
                  render: ({
                    handleKeyDown
                  }) => /*#__PURE__*/React.createElement(_ResponsiveClassNames.default, {
                    onRef: onRef,
                    configuration: configuration,
                    render: ({
                      onRef,
                      responsiveClassNames
                    }) => /*#__PURE__*/React.createElement(ConnectedPlayerStateClassNames, _extends({}, fullscreenState, interactionState, {
                      classNameDefinitions: classNameDefinitions,
                      classNamePrefix: classNamePrefix,
                      className: uiContainerClassName,
                      extraClassNames: responsiveClassNames,
                      render: classNames => /*#__PURE__*/React.createElement("div", {
                        className: classNames,
                        tabIndex: 0,
                        ref: onRef,
                        onMouseMove: handleMouseMove,
                        onTouchStart: handleTouchStart,
                        onTouchEnd: handleTouchEnd,
                        onKeyDown: handleKeyDown,
                        onFocus: handleFocus
                      }, _render({
                        fullscreenState,
                        interactionState
                      }))
                    }))
                  })
                });
              }
            });
          }
        })
      });
    }

  }, _defineProperty(_class, "defaultProps", {
    classNamePrefix: _common.defaultClassNamePrefix,
    className: _common.defaultClassNamePrefix.substr(0, _common.defaultClassNamePrefix.length - 1),
    // Removing the last dash of the prefix. Dangerous assumption...
    aspectRatio: {
      horizontal: 16,
      vertical: 9
    }
  }), _temp;
};

exports.getConnectedPlayerUIContainer = getConnectedPlayerUIContainer;
const PlayerUIContainer = getConnectedPlayerUIContainer();
var _default = PlayerUIContainer;
exports.default = _default;
//# sourceMappingURL=PlayerUIContainer.js.map