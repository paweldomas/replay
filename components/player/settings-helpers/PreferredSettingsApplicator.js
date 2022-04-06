"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getPreferredSettingsApplicator = void 0;

var React = _interopRequireWildcard(require("react"));

var _connectControl = _interopRequireDefault(require("../PlayerController/connectControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const noop = () => {};

const getTrackFromLanguageAndKind = (language, kind, tracks, ignorableLength) => {
  if (Array.isArray(tracks) && tracks.length > ignorableLength) {
    return tracks.filter(track => track.language === language && track.kind === kind)[0] || tracks.filter(track => track.language === language)[0] || tracks.filter(track => track.kind === kind)[0];
  }
};

const getTrackToSelect = (preferredLanguage, preferredKind, prevTracks, nextTracks, ignorableTrackListLength) => {
  if (prevTracks !== nextTracks && Array.isArray(nextTracks) && nextTracks.length > 0) {
    return getTrackFromLanguageAndKind(preferredLanguage, preferredKind, nextTracks, ignorableTrackListLength);
  }
};

const mergePreferredSettings = (configuration, programmaticSettings, localStorage, sessionStorage) => {
  const userSettingsConfig = configuration && configuration.userSettings;
  const storageKey = userSettingsConfig && userSettingsConfig.storageKey;

  if (userSettingsConfig && storageKey) {
    let localSettings = {};
    let sessionSettings = {};

    try {
      sessionSettings = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    } catch (e) {}

    try {
      localSettings = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (e) {}

    if (userSettingsConfig.hasPrecedence) {
      return _objectSpread({}, programmaticSettings, {}, localSettings, {}, sessionSettings);
    } else {
      return _objectSpread({}, localSettings, {}, sessionSettings, {}, programmaticSettings);
    }
  } else {
    return programmaticSettings;
  }
};

const getPropsToBeUpdated = (prevPlayState, nextPlayState, prevAudioTracks, prevTextTracks, nextAudioTracks, nextTextTracks, preferredSettings) => {
  const updates = {};

  if (nextPlayState !== prevPlayState && nextPlayState === 'starting') {
    if (preferredSettings.volume != null) {
      updates.volume = preferredSettings.volume;
    }

    if (preferredSettings.isMuted != null) {
      updates.isMuted = preferredSettings.isMuted;
    }
  }

  const audioTrackToSelect = getTrackToSelect(preferredSettings.audioTrackLanguage, preferredSettings.audioTrackKind, prevAudioTracks, nextAudioTracks, 1);

  if (audioTrackToSelect) {
    updates.selectedAudioTrack = audioTrackToSelect;
  }

  const textTrackToSelect = getTrackToSelect(preferredSettings.textTrackLanguage, preferredSettings.textTrackKind, prevTextTracks, nextTextTracks, 0);

  if (textTrackToSelect) {
    updates.selectedTextTrack = textTrackToSelect;
  }

  return updates;
};

const onPropsChanged = (prevProps, nextProps, localStorage, sessionStorage) => {
  const configuration = nextProps.configuration,
        playState = nextProps.playState,
        audioTracks = nextProps.audioTracks,
        textTracks = nextProps.textTracks,
        volume = nextProps.volume,
        isMuted = nextProps.isMuted,
        textTrackLanguage = nextProps.textTrackLanguage,
        textTrackKind = nextProps.textTrackKind,
        audioTrackLanguage = nextProps.audioTrackLanguage,
        audioTrackKind = nextProps.audioTrackKind,
        setProperties = nextProps.setProperties;
  const programmaticSettings = {};

  if (volume != null) {
    programmaticSettings.volume = volume;
  }

  if (isMuted != null) {
    programmaticSettings.isMuted = isMuted;
  }

  if (textTrackLanguage != null) {
    programmaticSettings.textTrackLanguage = textTrackLanguage;
  }

  if (textTrackKind != null) {
    programmaticSettings.textTrackKind = textTrackKind;
  }

  if (audioTrackLanguage != null) {
    programmaticSettings.audioTrackLanguage = audioTrackLanguage;
  }

  if (audioTrackKind != null) {
    programmaticSettings.audioTrackKind = audioTrackKind;
  }

  const mergedSettings = mergePreferredSettings(configuration, programmaticSettings, localStorage, sessionStorage);
  const propsToBeUpdated = getPropsToBeUpdated(prevProps.playState, playState, prevProps.audioTracks, prevProps.textTracks, audioTracks, textTracks, mergedSettings);

  if (Object.keys(propsToBeUpdated).length > 0) {
    setProperties(propsToBeUpdated);
  }
}; // Testable version:


const getPreferredSettingsApplicator = (localStorage = window.localStorage, sessionStorage = window.sessionStorage) => {
  var _class, _temp;

  return _temp = _class = class PreferredSettingsApplicator extends React.Component {
    componentDidMount() {
      onPropsChanged({
        setProperties: noop
      }, this.props, localStorage, sessionStorage);
    }

    componentDidUpdate(prevProps) {
      onPropsChanged(prevProps, this.props, localStorage, sessionStorage);
    }

    render() {
      return null;
    }

  }, _defineProperty(_class, "streamStateKeysForObservation", ['playState', 'textTracks', 'audioTracks']), _temp;
};

exports.getPreferredSettingsApplicator = getPreferredSettingsApplicator;
const PreferredSettingsApplicator = (0, _connectControl.default)(getPreferredSettingsApplicator());
var _default = PreferredSettingsApplicator;
exports.default = _default;
//# sourceMappingURL=PreferredSettingsApplicator.js.map