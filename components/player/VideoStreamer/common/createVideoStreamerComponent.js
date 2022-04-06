"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../../common");

var _renderers = require("./renderers");

var _types = require("../types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const baseClassName = 'video-streamer';

function createVideoStreamerComponent(name, resolveImplementation) {
  class VideoStreamer extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "implementation", void 0);

      _defineProperty(this, "videoRef", void 0);

      _defineProperty(this, "setProperties", playbackProps => {
        const applyProperties = this.implementation && this.implementation.applyProperties;

        if (applyProperties) {
          applyProperties(playbackProps);
        }
      });

      _defineProperty(this, "handleTrackElementDataChange", trackElementData => {
        this.setState({
          trackElementData
        });
      });

      _defineProperty(this, "handleSourceChange", (nextProps, prevProps) => {
        const implementation = this.implementation;

        if (implementation) {
          implementation.startPlaybackSession();
          implementation.textTrackManager.clear();
          return implementation.handleSourceChange(nextProps, prevProps).then(() => {
            implementation.audioTrackManager.handleSourceChange();
            implementation.textTrackManager.handleSourcePropChange(nextProps);
          }).catch(err => {
            implementation.endPlaybackSession('dead');
            return nextProps.onPlaybackError && nextProps.onPlaybackError(err);
          });
        }
      });

      this.videoRef = React.createRef();
      this.state = {
        videoElementEventHandlers: {},
        render: _renderers.renderWithoutSource
      };
    }

    componentDidMount() {
      const videoElement = this.videoRef.current;

      if (videoElement) {
        resolveImplementation(this, this.props.configuration, videoElement, this.handleTrackElementDataChange).then(implementation => {
          this.implementation = implementation;
          const render = implementation.render,
                videoElementEventHandlers = implementation.videoElementEventHandlers,
                thirdPartyPlayer = implementation.thirdPartyPlayer;
          this.setState({
            render,
            videoElementEventHandlers
          });

          if (this.props.onReady) {
            this.props.onReady({
              setProperties: this.setProperties,
              thirdPartyPlayer,
              play: () => videoElement.play()
            });
          }

          if (this.props.source) {
            return this.handleSourceChange(this.props);
          }
        }).catch(err => {
          if (this.props.onPlaybackError && err instanceof _types.PlaybackError) {
            this.props.onPlaybackError(err);
          } else {
            throw err;
          }
        });
      }
    }

    componentWillUnmount() {
      const videoElement = this.videoRef.current;

      if (videoElement) {
        // $FlowFixMe
        if (videoElement === document.pictureInPictureElement) {
          // $FlowFixMe
          return document.exitPictureInPicture();
        } else if ( // $FlowFixMe
        videoElement.webkitPresentationMode === 'picture-in-picture' && // $FlowFixMe
        typeof videoElement.webkitSetPresentationMode === 'function') {
          videoElement.webkitSetPresentationMode('inline');
        }
      }

      if (this.implementation) {
        if (this.implementation.endPlaybackSession) {
          this.implementation.endPlaybackSession('dead');
        }

        if (this.implementation.cleanup) {
          return this.implementation.cleanup().catch(err => {
            throw err;
          });
        }
      }
    }

    getSnapshotBeforeUpdate() {
      const previousVideoElement = this.videoRef.current; // $FlowFixMe: Type defs not up-to-date.

      const pipElement = document.pictureInPictureElement; // $FlowFixMe

      const presentationMode = previousVideoElement.webkitPresentationMode;
      const wasPipActive = previousVideoElement === pipElement || presentationMode === 'picture-in-picture';
      return {
        wasPipActive,
        previousVideoElement: this.videoRef.current
      };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const implementation = this.implementation;

      if (implementation) {
        if (prevProps.source !== this.props.source) {
          if (snapshot && snapshot.wasPipActive) {
            // $FlowFixMe
            if (document.exitPictureInPicture) {
              document.exitPictureInPicture().then(() => this.handleSourceChange(this.props, prevProps), () => this.handleSourceChange(this.props, prevProps));
            } else if (snapshot.previousVideoElement && // $FlowFixMe
            typeof snapshot.previousVideoElement.webkitSetPresentationMode === 'function') {
              snapshot.previousVideoElement.webkitSetPresentationMode('inline');
              this.handleSourceChange(this.props, prevProps);
            }
          } else {
            this.handleSourceChange(this.props, prevProps);
          }
        } else if (prevProps.textTracks !== this.props.textTracks) {
          implementation.textTrackManager.handleTextTracksPropChange(this.props);
        }
      }
    }

    render() {
      const videoRef = this.videoRef;
      const _this$state = this.state,
            videoElementEventHandlers = _this$state.videoElementEventHandlers,
            render = _this$state.render,
            trackElementData = _this$state.trackElementData;
      const playsInline = !this.props.configuration || this.props.configuration.playsInline == null || this.props.configuration.playsInline;
      const autoPlay = !this.props.configuration || this.props.configuration.autoPlay == null || this.props.configuration.autoPlay;
      return render(videoRef, videoElementEventHandlers, this.props, baseClassName, autoPlay, playsInline, trackElementData);
    }

  }

  _defineProperty(VideoStreamer, "defaultProps", {
    classNamePrefix: _common.defaultClassNamePrefix
  });

  VideoStreamer.displayName = name;
  return VideoStreamer;
}

var _default = createVideoStreamerComponent;
exports.default = _default;
//# sourceMappingURL=createVideoStreamerComponent.js.map