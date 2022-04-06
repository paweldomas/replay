"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsStorage = exports.BufferingIndicator = exports.QualitySelector = exports.SubtitlesSelector = exports.AudioSelector = exports.Volume = exports.AirPlayButton = exports.PipButton = exports.GotoLiveButton = exports.TimelineInformation = exports.TimeDisplay = exports.Timeline = exports.SkipButton = exports.PlayPauseButton = exports.PlayerUIContainer = void 0;

var _PlayerUIContainer = require("../PlayerUIContainer/PlayerUIContainer");

var _SkipButton = _interopRequireDefault(require("../../controls/SkipButton/SkipButton"));

var _TimeDisplay = _interopRequireDefault(require("../../controls/TimeDisplay/TimeDisplay"));

var _QualitySelector = _interopRequireDefault(require("../../controls/QualitySelector/QualitySelector"));

var _BufferingIndicator = _interopRequireDefault(require("../../controls/BufferingIndicator/BufferingIndicator"));

var _connectControl = _interopRequireDefault(require("./connectControl"));

var _AudioSelector = _interopRequireDefault(require("../../controls/AudioSelector/AudioSelector"));

var _PlayPauseButton = _interopRequireDefault(require("../../controls/PlayPauseButton/PlayPauseButton"));

var _SubtitlesSelector = _interopRequireDefault(require("../../controls/SubtitlesSelector/SubtitlesSelector"));

var _Volume = _interopRequireDefault(require("../../controls/Volume/Volume"));

var _GotoLiveButton = _interopRequireDefault(require("../../controls/GotoLiveButton/GotoLiveButton"));

var _Timeline = _interopRequireDefault(require("../../controls/Timeline/Timeline"));

var _PipButton = _interopRequireDefault(require("../../controls/PipButton/PipButton"));

var _AirPlayButton = _interopRequireDefault(require("../../controls/AirPlayButton/AirPlayButton"));

var _TimelineInformation = _interopRequireDefault(require("../../controls/TimelineInformation/TimelineInformation"));

var _settingsStorage = _interopRequireDefault(require("../settings-helpers/settingsStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PlayerUIContainer = (0, _PlayerUIContainer.getConnectedPlayerUIContainer)(_connectControl.default);
exports.PlayerUIContainer = PlayerUIContainer;
const PlayPauseButton = (0, _connectControl.default)(_PlayPauseButton.default);
exports.PlayPauseButton = PlayPauseButton;
const SkipButton = (0, _connectControl.default)(_SkipButton.default);
exports.SkipButton = SkipButton;
const Timeline = (0, _connectControl.default)(_Timeline.default);
exports.Timeline = Timeline;
const TimeDisplay = (0, _connectControl.default)(_TimeDisplay.default);
exports.TimeDisplay = TimeDisplay;
const TimelineInformation = (0, _connectControl.default)(_TimelineInformation.default);
exports.TimelineInformation = TimelineInformation;
const GotoLiveButton = (0, _connectControl.default)(_GotoLiveButton.default);
exports.GotoLiveButton = GotoLiveButton;
const PipButton = (0, _connectControl.default)(_PipButton.default);
exports.PipButton = PipButton;
const AirPlayButton = (0, _connectControl.default)(_AirPlayButton.default);
exports.AirPlayButton = AirPlayButton;
const Volume = (0, _connectControl.default)(_Volume.default);
exports.Volume = Volume;
const AudioSelector = (0, _connectControl.default)(_AudioSelector.default);
exports.AudioSelector = AudioSelector;
const SubtitlesSelector = (0, _connectControl.default)(_SubtitlesSelector.default);
exports.SubtitlesSelector = SubtitlesSelector;
const QualitySelector = (0, _connectControl.default)(_QualitySelector.default);
exports.QualitySelector = QualitySelector;
const BufferingIndicator = (0, _connectControl.default)(_BufferingIndicator.default);
exports.BufferingIndicator = BufferingIndicator;
const SettingsStorage = {
  AudioSelector: (0, _connectControl.default)((0, _settingsStorage.default)(_AudioSelector.default)),
  SubtitlesSelector: (0, _connectControl.default)((0, _settingsStorage.default)(_SubtitlesSelector.default)),
  Volume: (0, _connectControl.default)((0, _settingsStorage.default)(_Volume.default))
};
exports.SettingsStorage = SettingsStorage;
//# sourceMappingURL=connectedControls.js.map