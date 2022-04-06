"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isEnabled = configuration => {
  return configuration && configuration.userSettings && configuration.userSettings.storageKey && configuration.userSettings.settingsStoragePolicy;
};

const getStoredSettings = (storage, key) => {
  try {
    const storedStr = storage.getItem(key);

    if (storedStr) {
      return JSON.parse(storedStr);
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

const withStorage = (storagePolicy, key, sessionSettings, localSettings, callback) => {
  switch (storagePolicy[key]) {
    case 'local':
      callback(localSettings);
      return;

    case 'session':
      callback(sessionSettings);
      return;

    default:
      return;
  }
};

const withSettingsStorage = (Component, localStorage = window.localStorage, sessionStorage = window.sessionStorage) => {
  class SettingsStorage extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "setProperties", userSetProps => {
        if (this.props.setProperties) {
          this.props.setProperties(userSetProps);
        }

        const userSettingsConfig = this.props.configuration && this.props.configuration.userSettings;

        if (userSettingsConfig) {
          const storageKey = userSettingsConfig.storageKey;
          const storagePolicy = userSettingsConfig.settingsStoragePolicy;

          if (storageKey && storagePolicy) {
            const localSettings = getStoredSettings(localStorage, storageKey);
            const sessionSettings = getStoredSettings(sessionStorage, storageKey);

            if ('isMuted' in userSetProps) {
              withStorage(storagePolicy, 'isMuted', sessionSettings, localSettings, settings => settings.isMuted = !!userSetProps.isMuted);
            }

            if (typeof userSetProps.volume === 'number') {
              withStorage(storagePolicy, 'volume', sessionSettings, localSettings, settings => settings.volume = userSetProps.volume);
            }

            if ('selectedTextTrack' in userSetProps) {
              withStorage(storagePolicy, 'textTrackLanguage', sessionSettings, localSettings, settings => {
                if (userSetProps.selectedTextTrack) {
                  if (userSetProps.selectedTextTrack.language) {
                    settings.textTrackLanguage = userSetProps.selectedTextTrack.language;
                  }
                } else {
                  // Subtitles were turned off.
                  delete settings.textTrackLanguage;
                }
              });
              withStorage(storagePolicy, 'textTrackKind', sessionSettings, localSettings, settings => {
                if (userSetProps.selectedTextTrack) {
                  if (userSetProps.selectedTextTrack.kind) {
                    settings.textTrackKind = userSetProps.selectedTextTrack.kind;
                  }
                } else {
                  // Subtitles were turned off.
                  delete settings.textTrackKind;
                }
              });
            }

            if ('selectedAudioTrack' in userSetProps) {
              withStorage(storagePolicy, 'audioTrackLanguage', sessionSettings, localSettings, settings => {
                if (userSetProps.selectedAudioTrack && userSetProps.selectedAudioTrack.language) {
                  settings.audioTrackLanguage = userSetProps.selectedAudioTrack.language;
                }
              });
              withStorage(storagePolicy, 'audioTrackKind', sessionSettings, localSettings, settings => {
                if (userSetProps.selectedAudioTrack && userSetProps.selectedAudioTrack.kind) {
                  settings.audioTrackKind = userSetProps.selectedAudioTrack.kind;
                }
              });
            }

            if (Object.keys(localSettings).length > 0) {
              try {
                localStorage.setItem(storageKey, JSON.stringify(localSettings));
              } catch (e) {}
            }

            if (Object.keys(sessionSettings).length > 0) {
              try {
                sessionStorage.setItem(storageKey, JSON.stringify(sessionSettings));
              } catch (e) {}
            }
          }
        }
      });
    }

    render() {
      const _this$props = this.props,
            configuration = _this$props.configuration,
            remainder = _objectWithoutProperties(_this$props, ["configuration"]);

      if (isEnabled(this.props.configuration)) {
        return /*#__PURE__*/React.createElement(Component, _extends({}, remainder, {
          setProperties: this.setProperties
        }));
      } else {
        return /*#__PURE__*/React.createElement(Component, remainder);
      }
    }

  }

  _defineProperty(SettingsStorage, "streamStateKeysForObservation", Component.streamStateKeysForObservation);

  SettingsStorage.displayName = 'SettingsStorage' + (Component.displayName || Component.name);
  return SettingsStorage;
};

var _default = withSettingsStorage;
exports.default = _default;
//# sourceMappingURL=settingsStorage.js.map