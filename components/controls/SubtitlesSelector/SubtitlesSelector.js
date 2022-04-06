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

const className = 'subtitles-selector';
const defaultKind = 'subtitles';

const buildId = (...str) => str.filter(s => s).join('.'); // TODO: Consider injectable label mapper, and also for audio selector and bitrate selector.


const buildLabel = ({
  label,
  kind = defaultKind,
  language = 'unknown'
}) => label || (kind !== defaultKind ? "[".concat(language, "] ").concat(kind) : "[".concat(language, "]")) || '';

const textTrackToItem = track => {
  if (track.noTrack) {
    const label = track.label || '';
    return {
      id: 0,
      label,
      data: track
    };
  } else {
    return {
      id: track.id || buildId(track.language, track.kind, track.origin) || track.label,
      label: buildLabel(track),
      data: track
    };
  }
};

class SubtitlesSelector extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSelect", item => {
      if (this.props.setProperties) {
        if (item.noTrack) {
          this.props.setProperties({
            selectedTextTrack: null
          });
        } else {
          this.props.setProperties({
            selectedTextTrack: item
          });
        }
      }
    });

    this.state = {
      noSubtitlesItem: {
        noTrack: true,
        label: this.props.noSubtitlesLabel
      }
    };
  }

  render() {
    const _this$props = this.props,
          textTracks = _this$props.textTracks,
          currentTextTrack = _this$props.currentTextTrack,
          label = _this$props.label,
          toggleContent = _this$props.toggleContent,
          classNamePrefix = _this$props.classNamePrefix;

    if (Array.isArray(textTracks) && textTracks.length > 0) {
      // TODO: Consider optimization, memoizing the array and all props involved in rendering.
      const items = [this.state.noSubtitlesItem].concat(textTracks);
      let selectedItem = this.state.noSubtitlesItem;

      if (currentTextTrack) {
        const selectedIndex = textTracks.indexOf(currentTextTrack) + 1; // Nasty detail. Including "no subtitles" when counting.

        if (selectedIndex > 0) {
          selectedItem = items[selectedIndex];
        }
      }

      return /*#__PURE__*/React.createElement(_Selector.default, {
        items: items,
        itemMapper: textTrackToItem,
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

_defineProperty(SubtitlesSelector, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

_defineProperty(SubtitlesSelector, "streamStateKeysForObservation", ['textTracks', 'currentTextTrack']);

SubtitlesSelector.displayName = 'SubtitlesSelector';
var _default = SubtitlesSelector;
exports.default = _default;
//# sourceMappingURL=SubtitlesSelector.js.map