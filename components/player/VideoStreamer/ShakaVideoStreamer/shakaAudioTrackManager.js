"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createManagedTrack = ({
  language,
  role
}, index) => {
  return {
    selectableTrack: {
      id: language + role || index,
      kind: role,
      label: '',
      language: language,
      origin: 'in-stream'
    },
    language,
    role
  };
};

const isTrackMatchingLanguageAndRole = (shakaTrack, {
  language,
  role
}) => {
  return shakaTrack.language === language && (!role || shakaTrack.roles && shakaTrack.roles.indexOf(role) >= 0);
};

const getShakaAudioTrackManager = (shakaPlayer, updateStreamState) => {
  let managedTracks = [];

  function updateCurrentAudioTrack() {
    const activeShakaTrack = shakaPlayer.getVariantTracks().filter(track => track.active)[0];
    const currentAudioTrack = activeShakaTrack && managedTracks.filter(mt => isTrackMatchingLanguageAndRole(activeShakaTrack, mt)).map(mt => mt.selectableTrack)[0];
    updateStreamState({
      currentAudioTrack
    });
  }

  function updateAudioTracks() {
    managedTracks = shakaPlayer.getAudioLanguagesAndRoles().map(createManagedTrack);
    const audioTracks = managedTracks.map(mt => mt.selectableTrack);
    updateStreamState({
      audioTracks
    });
    updateCurrentAudioTrack();
  }

  const shakaEventHandlers = {
    loading: updateAudioTracks,
    trackschanged: updateAudioTracks,
    adaptation: updateCurrentAudioTrack
  };

  function handleSelectedAudioTrackChange(selectedAudioTrack) {
    const managedTrack = managedTracks.filter(mt => mt.selectableTrack === selectedAudioTrack)[0];

    if (managedTrack) {
      shakaPlayer.selectAudioLanguage(managedTrack.language, managedTrack.role);
      updateCurrentAudioTrack();
    }
  }

  function handleSourceChange() {
    managedTracks.length = 0;
  }

  function cleanup() {
    Object.entries(shakaEventHandlers).forEach(([name, handler]) => {
      shakaPlayer.removeEventListener(name, handler);
    });
  }

  Object.entries(shakaEventHandlers).forEach(([name, handler]) => {
    shakaPlayer.addEventListener(name, handler);
  });
  return {
    cleanup,
    handleSourceChange,
    handleSelectedAudioTrackChange
  };
};

var _default = getShakaAudioTrackManager;
exports.default = _default;
//# sourceMappingURL=shakaAudioTrackManager.js.map