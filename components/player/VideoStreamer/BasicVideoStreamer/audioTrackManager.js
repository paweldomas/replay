"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// http://sample.vodobox.com/planete_interdite/planete_interdite_alternate.m3u8

/*export type AudioTracksStateProps = {
  audioTracks?: Array<AvailableTrack>,
  currentAudioTrack?: ?AvailableTrack
};*/
let id = 0;

const createManagedTrack = videoElementTrack => {
  return {
    selectableTrack: {
      id: videoElementTrack.id == null ? "audio-".concat(++id) : videoElementTrack.id,
      language: videoElementTrack.language || '',
      kind: videoElementTrack.kind || '',
      label: videoElementTrack.label || '',
      origin: 'in-stream'
    },
    videoElementTrack
  };
};

const getAudioTrackManager = (videoElement, update) => {
  let managedTracks = [];

  function mapAudioTracks() {
    // $FlowFixMe Array.from() doesn't seem to understand iterables from the DOM API.
    managedTracks = videoElement.audioTracks ? Array.from(videoElement.audioTracks).map(createManagedTrack) : [];
  }

  function updateStreamStateProps(selectedTrack) {
    const currentAudioTrack = selectedTrack || managedTracks.filter(mt => mt.videoElementTrack.enabled).map(mt => mt.selectableTrack)[0] || null; // TODO: Don't create a new array with new items every time. A deep equal comparison on availableTracks is needed.

    update({
      audioTracks: managedTracks.map(mt => mt.selectableTrack),
      currentAudioTrack
    });
  }

  function handleTrackAddOrRemove() {
    mapAudioTracks();
    updateStreamStateProps();
  }

  function handleTrackChange() {
    updateStreamStateProps();
  }

  function setup() {
    if (videoElement.audioTracks) {
      videoElement.audioTracks.addEventListener('addtrack', handleTrackAddOrRemove);
      videoElement.audioTracks.addEventListener('change', handleTrackChange);
      videoElement.audioTracks.addEventListener('removetrack', handleTrackAddOrRemove);
    }

    handleSourceChange();
  }

  function handleSelectedAudioTrackChange(selectedAudioTrack) {
    const managedTrack = managedTracks.filter(mt => mt.selectableTrack === selectedAudioTrack)[0];

    if (managedTrack) {
      managedTrack.videoElementTrack.enabled = true;
    }
  }

  function cleanup() {
    if (videoElement.audioTracks) {
      videoElement.audioTracks.removeEventListener('addtrack', handleTrackAddOrRemove);
      videoElement.audioTracks.removeEventListener('change', handleTrackChange);
      videoElement.audioTracks.removeEventListener('removetrack', handleTrackAddOrRemove);
    }

    managedTracks = [];
  }

  function handleSourceChange() {
    handleTrackAddOrRemove();
  }

  setup();
  return {
    cleanup,
    handleSourceChange,
    handleSelectedAudioTrackChange
  };
};

var _default = getAudioTrackManager;
exports.default = _default;
//# sourceMappingURL=audioTrackManager.js.map