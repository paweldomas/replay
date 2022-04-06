"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _ControllerContext = _interopRequireDefault(require("./ControllerContext"));

var _common = require("../../common");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const passPropsToVideoStreamer = (children, props) => {
  return React.Children.map(children, (child, i) => {
    if (i === 0) {
      return React.cloneElement(child, props);
    } else {
      return child;
    }
  })[0];
};

const getObserveManager = () => {
  const observers = {};

  const observe = (key, callback) => {
    if (!(key in observers)) {
      observers[key] = [];
    }

    observers[key].push(callback);
  };

  const unobserve = (key, callback) => {
    if (Array.isArray(observers[key])) {
      const index = observers[key].indexOf(callback);

      if (index !== -1) {
        observers[key].splice(index, 1);
      }
    }
  };

  const unobserveAll = () => {
    Object.entries(observers).forEach(([key, handlers]) => {
      while (handlers.length) {
        handlers.pop();
      }
    });
  };

  const update = prop => {
    Object.keys(prop).forEach(key => {
      if (Array.isArray(observers[key])) {
        observers[key].forEach(callback => {
          callback(prop);
        });
      }
    });
  };

  return {
    observe,
    unobserve,
    update,
    unobserveAll
  };
};

const createPlaybackActions = (inspect, setProperties) => {
  const play = () => setProperties({
    isPaused: false
  });

  const pause = () => setProperties({
    isPaused: true
  });

  const setPosition = position => setProperties({
    position
  });

  const gotoLive = () => setProperties({
    isAtLiveEdge: true
  });

  const setVolume = volume => setProperties({
    volume
  });

  const setIsMuted = isMuted => setProperties({
    isMuted
  });

  const mute = () => setProperties({
    isMuted: true
  });

  const unmute = () => setProperties({
    isMuted: false
  });

  const requestPictureInPicture = () => setProperties({
    isPipActive: true
  });

  const exitPictureInPicture = () => setProperties({
    isPipActive: false
  });

  const showAirPlayTargetPicker = () => setProperties({
    isAirPlayTargetPickerVisible: true
  });

  const setSelectedTextTrack = selectedTextTrack => setProperties({
    selectedTextTrack
  });

  const setSelectedAudioTrack = selectedAudioTrack => setProperties({
    selectedAudioTrack
  });

  const capBitrate = bitrateCap => setProperties({
    bitrateCap
  });

  const fixBitrate = bitrateFix => setProperties({
    bitrateFix
  });

  return {
    play,
    pause,
    setPosition,
    gotoLive,
    setVolume,
    setIsMuted,
    mute,
    unmute,
    requestPictureInPicture,
    exitPictureInPicture,
    showAirPlayTargetPicker,
    setSelectedAudioTrack,
    setSelectedTextTrack,
    capBitrate,
    fixBitrate,
    setProperties,
    inspect
  };
};

class PlayerController extends React.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "inspectableStreamState", {});

    _defineProperty(this, "observeManager", getObserveManager());

    _defineProperty(this, "inspect", () => this.inspectableStreamState);

    _defineProperty(this, "mergeConfiguration", (0, _memoizeOne.default)(_common.override));

    _defineProperty(this, "setProperties", props => this.state.setProperties(props));

    _defineProperty(this, "onVideoStreamerReady", ({
      setProperties
    }) => {
      this.inspectableStreamState = {};
      this.setState({
        setProperties
      });
    });

    _defineProperty(this, "onStreamStateChange", property => {
      // if (!('position' in property) && !('bufferedAhead' in property)) { console.log('Updating %s', Object.keys(property).join(', '), property); }
      this.observeManager.update(property);
      this.inspectableStreamState = _objectSpread({}, this.inspectableStreamState, {}, property);

      if (this.props.onStreamStateChange) {
        this.props.onStreamStateChange(property);
      }
    });

    const videoStreamerProps = {
      initialPlaybackProps: this.props.initialPlaybackProps,
      //TODO: This is overwritten by preferred settings. Reconsider.
      onReady: this.onVideoStreamerReady,
      onPlaybackError: this.props.onStreamerError,
      onStreamStateChange: this.onStreamStateChange
    };
    this.state = {
      videoStreamerProps,
      setProperties: () => {}
    };
  }

  componentDidMount() {
    const onReady = this.props.onPlaybackActionsReady;

    if (onReady) {
      onReady(createPlaybackActions(() => this.inspect(), props => this.setProperties(props)));
    }
  }

  componentWillUnmount() {
    this.observeManager.unobserveAll();
  }

  render() {
    const _this$state = this.state,
          setProperties = _this$state.setProperties,
          videoStreamerProps = _this$state.videoStreamerProps;
    const observeManager = this.observeManager;
    const _this$props = this.props,
          render = _this$props.render,
          externalProps = _this$props.externalProps,
          configuration = _this$props.configuration,
          options = _this$props.options;
    const mergedConfiguration = this.mergeConfiguration(configuration, options);
    const observe = observeManager.observe,
          unobserve = observeManager.unobserve;
    const controllerApi = {
      setProperties,
      videoStreamer: passPropsToVideoStreamer(this.props.children, _objectSpread({}, videoStreamerProps, {
        configuration: mergedConfiguration.videoStreamer
      })),
      observe,
      inspect: this.inspect,
      unobserve
    };
    return /*#__PURE__*/React.createElement(_ControllerContext.default.Provider, {
      value: controllerApi
    }, render({
      controllerApi,
      configuration: mergedConfiguration,
      externalProps
    }));
  }

}

var _default = PlayerController;
exports.default = _default;
//# sourceMappingURL=PlayerController.js.map