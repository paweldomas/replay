"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hls = _interopRequireDefault(require("hls.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://sample.vodobox.com/planete_interdite/planete_interdite_alternate.m3u8
const getDistinctPseudoTracks = audioTracks => {
  const foundKeys = [];
  return audioTracks ? audioTracks.filter(track => {
    const key = "".concat(track.lang || '', "!").concat(track.name || '');
    const isNotAdded = foundKeys.indexOf(key) < 0;

    if (isNotAdded) {
      foundKeys.push(key);
    }

    return isNotAdded;
  }).map(track => ({
    id: track.id,
    language: track.lang || 'unknown',
    kind: '',
    label: track.name || 'unknown',
    origin: 'in-stream'
  })) : [];
};

const equalOrNoneSpecified = (a, b) => !a && !b || a === b;

const equalOrNotSpecified = (a, b) => !a || !b || a === b;

const isAudioTrackListsDifferent = (a, b) => {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (!equalOrNoneSpecified(a[i].id, b[i].id) || !equalOrNoneSpecified(a[i].language, b[i].language) || !equalOrNoneSpecified(a[i].label, b[i].label)) {
        return true;
      }
    }

    return false;
  } else {
    return true;
  }
};

const getAudioTrackManager = (instanceKeeper, update) => {
  let audioTracks = [];
  let hls;

  function mapAudioTracks() {
    if (hls) {
      const currentTracks = getDistinctPseudoTracks(hls.audioTracks);

      if (isAudioTrackListsDifferent(currentTracks, audioTracks)) {
        audioTracks = currentTracks;
      }
    }
  }

  function updateStreamStateProps() {
    let currentAudioTrack = null;

    if (hls) {
      const currentHlsAudioTrack = hls.audioTracks.filter(ht => ht.id === hls.audioTrack)[0];

      if (currentHlsAudioTrack) {
        const name = currentHlsAudioTrack.name,
              lang = currentHlsAudioTrack.lang;
        currentAudioTrack = audioTracks.filter(({
          label,
          language
        }) => label === name && language === lang)[0];
      }
    }

    update({
      audioTracks,
      currentAudioTrack
    });
  }

  function refresh() {
    mapAudioTracks();
    updateStreamStateProps();
  }

  function handleTrackChange() {
    mapAudioTracks();
    updateStreamStateProps();
  }

  function handleSelectedAudioTrackChange(selectedAudioTrack) {
    const st = selectedAudioTrack;

    if (hls && hls.audioTracks && st) {
      const groupId = (hls.audioTracks[hls.audioTrack] || {}).groupId;
      const matchingTrack = hls.audioTracks.filter(ht => equalOrNotSpecified(ht.groupId, groupId) && equalOrNotSpecified(ht.name, st.label) && equalOrNotSpecified(ht.lang, st.language))[0];

      if (matchingTrack) {
        hls.audioTrack = matchingTrack.id;
      }
    }
  }

  function reset() {
    audioTracks = [];
  }

  function handleSourceChange() {
    refresh();
  }

  const hlsjsEventHandlers = {
    [_hls.default.Events.MANIFEST_LOADING]: () => reset,
    [_hls.default.Events.MANIFEST_PARSED]: refresh,
    [_hls.default.Events.AUDIO_TRACK_SWITCHED]: handleTrackChange
  };

  function onHlsInstance(hlsInstance, preposition) {
    Object.entries(hlsjsEventHandlers).forEach(([name, handler]) => {
      // $FlowFixMe
      hlsInstance[preposition](name, handler);

      if (preposition === 'on') {
        hls = hlsInstance;
      }
    });
  }

  instanceKeeper.subscribers.push(onHlsInstance);
  return {
    cleanup: () => {},
    handleSourceChange,
    handleSelectedAudioTrackChange
  };
};

var _default = getAudioTrackManager;
exports.default = _default;
//# sourceMappingURL=hlsjsAudioTrackManager.js.map