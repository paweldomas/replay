"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

var _ToggleButton = _interopRequireDefault(require("../../generic/ToggleButton/ToggleButton"));

var _Slider = _interopRequireDefault(require("../../generic/Slider/Slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'volume';
const disabledClassName = 'volume-disabled';
const muteToggleClassName = 'mute-toggle';
const volumeSliderClassName = 'volume-slider';
const volumeSliderHandleClassName = 'volume-slider-handle';
const volumeSliderTrackClassName = 'volume-slider-track';
const maxVolume = 1;

class Volume extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleMuteToggleClick", isMuted => {
      if (this.props.setProperties) {
        this.props.setProperties({
          isMuted
        });
      }
    });

    _defineProperty(this, "handleVolumeSliderChange", volume => {
      const setProperties = this.props.setProperties;

      if (setProperties) {
        setProperties({
          isMuted: false,
          volume
        });
      }
    });
  }

  render() {
    const isIos = navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
    const _this$props = this.props,
          volume = _this$props.volume,
          isMuted = _this$props.isMuted,
          label = _this$props.label,
          volumeSliderLabel = _this$props.volumeSliderLabel,
          muteToggleLabel = _this$props.muteToggleLabel,
          classNamePrefix = _this$props.classNamePrefix,
          mutedContent = _this$props.mutedContent,
          unmutedContent = _this$props.unmutedContent,
          volumeSliderHandleContent = _this$props.volumeSliderHandleContent,
          volumeSliderTrackContent = _this$props.volumeSliderTrackContent;
    const prefixedClassName = (0, _common.prefixClassNames)(classNamePrefix, className, isIos && disabledClassName);
    return /*#__PURE__*/React.createElement("div", {
      className: prefixedClassName,
      title: label
    }, /*#__PURE__*/React.createElement(_ToggleButton.default, {
      label: muteToggleLabel,
      isOn: isMuted,
      toggledOffContent: unmutedContent,
      toggledOnContent: mutedContent,
      onToggle: this.handleMuteToggleClick,
      classNamePrefix: classNamePrefix,
      className: muteToggleClassName
    }), !isIos && /*#__PURE__*/React.createElement(_Slider.default, {
      label: volumeSliderLabel,
      value: isMuted ? 0 : volume,
      maxValue: maxVolume,
      handleContent: volumeSliderHandleContent,
      trackContent: volumeSliderTrackContent,
      onValueChange: this.handleVolumeSliderChange,
      classNamePrefix: classNamePrefix,
      className: volumeSliderClassName,
      trackClassName: volumeSliderTrackClassName,
      handleClassName: volumeSliderHandleClassName
    }));
  }

}

_defineProperty(Volume, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

_defineProperty(Volume, "streamStateKeysForObservation", ['volume', 'isMuted']);

Volume.displayName = 'Volume';
var _default = Volume;
exports.default = _default;
//# sourceMappingURL=Volume.js.map