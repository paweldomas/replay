"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const matchKeyCaseSafely = (key, eventKey) => {
  return typeof key !== 'string' ? false : key.length > 1 ? key === eventKey : key.toLowerCase() === eventKey.toLowerCase();
};

const getMatchingOperationFromKeyMap = (config, eventKey) => {
  if (config.keyMap) {
    return Object.entries(config.keyMap).filter(([_, mappedKeys]) => !!(matchKeyCaseSafely(mappedKeys, eventKey) || Array.isArray(mappedKeys) && mappedKeys.filter(key => matchKeyCaseSafely(key, eventKey)).length)).map(entry => entry[0])[0];
  }
};

class KeyboardShortcuts extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleKeyDown", keyboardEvent => {
      let _this$props = this.props,
          nudge = _this$props.nudge,
          toggleFixedUserActive = _this$props.toggleFixedUserActive,
          configuration = _this$props.configuration,
          setProperties = _this$props.setProperties,
          fullscreenState = _this$props.fullscreenState,
          isPaused = _this$props.isPaused,
          isMuted = _this$props.isMuted,
          position = _this$props.position,
          duration = _this$props.duration,
          volume = _this$props.volume,
          playMode = _this$props.playMode,
          inspect = _this$props.inspect;

      if (inspect) {
        const inspectedState = inspect();
        isPaused = inspectedState.isPaused;
        isMuted = inspectedState.isMuted;
        position = inspectedState.position;
        duration = inspectedState.duration;
        volume = inspectedState.volume;
        playMode = inspectedState.playMode;
      }

      if (configuration && configuration.keyboardShortcuts) {
        const offset = configuration.keyboardShortcuts.skipOffset || 30;
        const volumeStep = configuration.keyboardShortcuts.volumeStep || 0.1;
        const operation = getMatchingOperationFromKeyMap(configuration.keyboardShortcuts, keyboardEvent.key);

        if (operation) {
          switch (operation) {
            case 'togglePause':
              setProperties && setProperties({
                isPaused: !isPaused
              });
              break;

            case 'toggleMute':
              setProperties && setProperties({
                isMuted: !isMuted
              });
              break;

            case 'toggleFullscreen':
              fullscreenState && fullscreenState.setProperties({
                isFullscreen: !fullscreenState.isFullscreen
              });
              break;

            case 'skipBack':
              setProperties && position != null && setProperties({
                position: Math.max(position - offset, 0)
              });
              break;

            case 'skipForward':
              if (setProperties && duration) {
                const targetPosition = (position || 0) + offset; // Skipping to the very end is just annoying. Skipping to live position makes sense.

                if (targetPosition < duration || playMode !== 'ondemand') {
                  setProperties({
                    position: Math.min(targetPosition, duration)
                  });
                }
              }

              break;

            case 'decreaseVolume':
              setProperties && volume != null && setProperties({
                volume: Math.max(volume - volumeStep, 0)
              });
              break;

            case 'increaseVolume':
              setProperties && volume != null && setProperties({
                volume: Math.min(volume + volumeStep, 1)
              });
              break;

            case 'toggleUserActive':
              if (toggleFixedUserActive) {
                toggleFixedUserActive();
              }

              break;

            default: // eslint requires default in switch. Can't see that this is a good case for such a requirement.

          }

          if (nudge && operation !== 'toggleUserActive') {
            nudge();
          }

          keyboardEvent.preventDefault();
        } else if (keyboardEvent.key === 'Tab' && nudge) {
          nudge();
        }
      }
    });
  }

  render() {
    const handleKeyDown = this.handleKeyDown;
    return this.props.render({
      handleKeyDown
    });
  }

}

var _default = KeyboardShortcuts;
exports.default = _default;
//# sourceMappingURL=KeyboardShortcuts.js.map