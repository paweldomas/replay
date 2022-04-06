"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _crossBrowserFullscreen = require("./ponyfills/crossBrowserFullscreen");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Fullscreen extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "fullscreenTarget", void 0);

    _defineProperty(this, "unsubscribe", void 0);

    _defineProperty(this, "onRef", element => {
      this.fullscreenTarget = element;
      this.setState({
        isFullscreen: (0, _crossBrowserFullscreen.getFullscreenElement)() === element
      });
    });

    _defineProperty(this, "onFullscreenChange", () => {
      const fullscreenElement = (0, _crossBrowserFullscreen.getFullscreenElement)();
      this.setState({
        isFullscreen: !!(fullscreenElement && fullscreenElement === this.fullscreenTarget)
      });
    });

    _defineProperty(this, "enterFullscreen", () => {
      if (this.fullscreenTarget) {
        (0, _crossBrowserFullscreen.enterFullscreen)(this.fullscreenTarget);
      }
    });

    _defineProperty(this, "exitFullscreen", () => {
      if (this.fullscreenTarget) {
        (0, _crossBrowserFullscreen.exitFullscreen)(this.fullscreenTarget);
      }
    });

    _defineProperty(this, "setProperties", ({
      isFullscreen
    } = {}) => {
      if (isFullscreen) {
        this.enterFullscreen();
      } else {
        this.exitFullscreen();
      }
    });

    this.state = {
      isFullscreen: false
    };
    this.unsubscribe = (0, _crossBrowserFullscreen.notifyFullscreenChange)(this.onFullscreenChange);
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    const render = this.props.render;
    const isFullscreen = this.state.isFullscreen;
    const enterFullscreen = this.enterFullscreen,
          exitFullscreen = this.exitFullscreen,
          onRef = this.onRef,
          setProperties = this.setProperties;
    return render({
      isFullscreen,
      enterFullscreen,
      exitFullscreen,
      setProperties,
      onRef
    });
  }

}

var _default = Fullscreen;
exports.default = _default;
//# sourceMappingURL=Fullscreen.js.map