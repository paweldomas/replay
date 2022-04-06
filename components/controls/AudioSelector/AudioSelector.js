"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Selector = _interopRequireDefault(require("../../generic/Selector/Selector"));

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'audio-selector';

const buildId = (...str) => str.filter(s => s).join('.');

const buildLabel = ({
  label,
  kind = '',
  language = 'unknown'
}) => label || (kind ? "[".concat(language, "] ").concat(kind) : "[".concat(language, "]"));

const audioTrackToItem = track => {
  return {
    id: track.id || buildId(track.language, track.label) || track.label,
    label: buildLabel(track),
    data: track
  };
};

class AudioSelector extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSelect", item => {
      if (this.props.setProperties) {
        this.props.setProperties({
          selectedAudioTrack: item
        });
      }
    });
  }

  render() {
    const _this$props = this.props,
          audioTracks = _this$props.audioTracks,
          currentAudioTrack = _this$props.currentAudioTrack,
          label = _this$props.label,
          toggleContent = _this$props.toggleContent,
          classNamePrefix = _this$props.classNamePrefix;

    if (Array.isArray(audioTracks) && audioTracks.length > 1) {
      // TODO: Consider optimization, memoizing the array and all props involved in rendering.
      let selectedItem = audioTracks[0];

      if (currentAudioTrack) {
        const selectedIndex = audioTracks.indexOf(currentAudioTrack);

        if (selectedIndex >= 0) {
          selectedItem = audioTracks[selectedIndex]; // Ugly construct, but leaving it for now.
        }
      }

      return /*#__PURE__*/React.createElement(_Selector.default, {
        items: audioTracks,
        itemMapper: audioTrackToItem,
        classNamePrefix: classNamePrefix,
        className: className,
        selectedItem: selectedItem,
        label: label,
        onSelect: this.handleSelect,
        reverseOrder: true,
        expandedToggleContent: toggleContent,
        collapsedToggleContent: toggleContent
      });
    } else {
      return null;
    }
  }

}

_defineProperty(AudioSelector, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

_defineProperty(AudioSelector, "streamStateKeysForObservation", ['audioTracks', 'currentAudioTrack']);

AudioSelector.displayName = 'AudioSelector';
var _default = AudioSelector;
exports.default = _default;
//# sourceMappingURL=AudioSelector.js.map