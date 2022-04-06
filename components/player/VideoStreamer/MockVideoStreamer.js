"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultTextTracks = [{
  kind: 'subtitles',
  label: 'Finnish subtitles',
  language: 'fi',
  origin: 'side-loaded'
}, {
  kind: 'subtitles',
  label: 'Swedish subtitles',
  language: 'sv',
  origin: 'side-loaded'
}];
const defaultAudioTracks = [{
  label: "Director's comments",
  language: 'en'
}, {
  label: 'Main audio',
  language: 'en'
}];
const defaultValues = {
  playMode: 'ondemand',
  playState: 'playing',
  isPaused: false,
  isBuffering: false,
  isSeeking: false,
  position: 123,
  duration: 456,
  absolutePosition: new Date(0),
  absoluteStartPosition: new Date(0),
  volume: 0.7,
  isMuted: false,
  isPipAvailable: true,
  isPipActive: false,
  isAirPlayAvailable: true,
  isAirPlayActive: false,
  bufferedAhead: 12,
  bitrates: [512, 1024, 2048, 4096],
  currentBitrate: 2048,
  bitrateFix: NaN,
  bitrateCap: Infinity,
  textTracks: defaultTextTracks,
  currentTextTrack: defaultTextTracks[0],
  audioTracks: defaultAudioTracks,
  currentAudioTrack: defaultAudioTracks[0],
  isAtLiveEdge: false,
  error: undefined
};
/*
	volume?: number,
	isMuted?: boolean,
	isPaused?: boolean,
	bitrateCap?: number,
	bitrateFix?: number | string,
	selectedTextTrack?: AvailableTrack,
	selectedAudioTrack?: AvailableTrack,
*/

const className = 'video-streamer';
const mockClassName = 'mock-video-streamer';

const runAsync = (callback, arg, delay = 0) => {
  setTimeout(() => callback && callback(arg), delay);
};

const updateWithDefaultValues = (updater, overrides = {}) => {
  if (updater) {
    Object.entries(defaultValues).forEach(entry => {
      updater({
        [entry[0]]: entry[0] in overrides ? overrides[entry[0]] : entry[1]
      });
    });
  }
};

class MockVideoStreamer extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "modifiedStreamState", {});

    _defineProperty(this, "updateStreamState", props => {
      const selectedTextTrack = props.selectedTextTrack,
            selectedAudioTrack = props.selectedAudioTrack,
            unchanged = _objectWithoutProperties(props, ["selectedTextTrack", "selectedAudioTrack"]); // $FlowFixMe Subset type and question marks don't work.


      const newState = unchanged;

      if ('selectedTextTrack' in props) {
        newState.currentTextTrack = selectedTextTrack;
      }

      if ('selectedAudioTrack' in props) {
        newState.currentAudioTrack = selectedAudioTrack;
      }

      this.modifiedStreamState = _objectSpread({}, this.modifiedStreamState, {}, newState);

      if (this.props.onStreamStateChange != null) {
        this.props.onStreamStateChange(newState);
      }
    });
  }

  componentDidMount() {
    if (this.props.initialPlaybackProps) {
      const _this$props$initialPl = this.props.initialPlaybackProps,
            isPaused = _this$props$initialPl.isPaused,
            isMuted = _this$props$initialPl.isMuted,
            volume = _this$props$initialPl.volume,
            bitrateCap = _this$props$initialPl.bitrateCap,
            bitrateFix = _this$props$initialPl.bitrateFix;
      this.updateStreamState({
        isPaused,
        isMuted,
        volume,
        bitrateCap: bitrateCap,
        bitrateFix
      });
    }

    window.updateVideoState = this.updateStreamState;

    if (this.props.onReady) {
      this.props.onReady({
        setProperties: props => runAsync(this.updateStreamState, props, Math.round(Math.random() * 1000)),
        thirdPartyPlayer: null
      });
      updateWithDefaultValues(this.props.onStreamStateChange, this.props.initialMockState);
      /*setInterval(() => {
        this.props.onStreamStateChange({ isBuffering: this.isBuffering });
        this.isBuffering = !this.isBuffering;
      }, 5000);*/
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.onStreamStateChange !== prevProps.onStreamStateChange) {
      updateWithDefaultValues(this.props.onStreamStateChange, this.modifiedStreamState);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _common.prefixClassNames)(this.props.classNamePrefix, className, mockClassName, this.props.className)
    }, /*#__PURE__*/React.createElement("div", null, this.props.children || 'Mock video player'));
  }

}

_defineProperty(MockVideoStreamer, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

var _default = MockVideoStreamer;
exports.default = _default;
//# sourceMappingURL=MockVideoStreamer.js.map