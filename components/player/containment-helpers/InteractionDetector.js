"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getDelaySeconds = configuration => configuration && configuration.interactionDetector && configuration.interactionDetector.inactivityDelay != null ? configuration.interactionDetector.inactivityDelay : 0;

class InteractionDetector extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "isFixed", false);

    _defineProperty(this, "intervalId", void 0);

    _defineProperty(this, "inactivityTimeoutId", void 0);

    _defineProperty(this, "flags", {
      isMouseMoved: true,
      isTouched: false,
      isTouching: false,
      isEntered: false,
      clientX: -1,
      clientY: -1
    });

    _defineProperty(this, "handleMouseMove", evt => {
      if (evt.clientX !== this.flags.clientX || evt.clientY !== this.flags.clientY) {
        this.flags.isMouseMoved = true;
        this.flags.clientX = evt.clientX;
        this.flags.clientY = evt.clientY;
      }
    });

    _defineProperty(this, "handleTouchStart", () => {
      this.flags.isTouched = true;
      this.flags.isTouching = true;
    });

    _defineProperty(this, "handleTouchEnd", () => {
      this.flags.isTouching = false;
    });

    _defineProperty(this, "nudge", () => {
      this.flags.isMouseMoved = true;
    });

    _defineProperty(this, "toggleFixedUserActive", () => {
      this.isFixed = !this.isFixed;

      if (this.isFixed) {
        this.flags.isMouseMoved = true;
      } else {
        this.setState({
          isUserActive: false
        });
      }
    });

    _defineProperty(this, "handleFocus", focusEvent => {
      if (focusEvent.target === focusEvent.currentTarget) {
        this.nudge();
      }
    });

    _defineProperty(this, "setInactive", () => {
      if (!(this.isFixed || this.flags.isMouseMoved)) {
        this.setState({
          isUserActive: false
        });
      }
    });

    _defineProperty(this, "updateActivity", () => {
      if (this.flags.isMouseMoved || this.flags.isTouched || this.flags.isTouching) {
        this.flags.isTouched = false;
        this.flags.isMouseMoved = false;

        if (!this.state.isUserActive) {
          this.setState({
            isUserActive: true
          });
        }

        clearTimeout(this.inactivityTimeoutId);
        this.inactivityTimeoutId = setTimeout(this.setInactive, getDelaySeconds(this.props.configuration) * 1000);
      }
    });

    this.state = {
      isUserActive: true
    };
  }

  componentDidMount() {
    const delaySeconds = getDelaySeconds(this.props.configuration);

    if (delaySeconds >= 0) {
      // Negative values deactivate
      this.intervalId = setInterval(this.updateActivity, 250); // This interval is not the inactivity delay.
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const delaySeconds = getDelaySeconds(this.props.configuration);

    if (delaySeconds !== getDelaySeconds(prevProps.configuration)) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      if (delaySeconds >= 0) {
        // Negative values deactivate
        this.intervalId = setInterval(this.updateActivity, 250); // This interval is not the inactivity delay.
      } else {
        this.setState({
          isUserActive: true
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.inactivityTimeoutId) {
      clearTimeout(this.inactivityTimeoutId);
    }
  }

  render() {
    const isUserActive = this.state.isUserActive;
    const render = this.props.render;
    const handleMouseMove = this.handleMouseMove,
          handleTouchStart = this.handleTouchStart,
          handleTouchEnd = this.handleTouchEnd,
          handleFocus = this.handleFocus,
          toggleFixedUserActive = this.toggleFixedUserActive,
          nudge = this.nudge;
    return render({
      isUserActive,
      handleMouseMove,
      handleTouchStart,
      handleTouchEnd,
      handleFocus,
      toggleFixedUserActive: toggleFixedUserActive,
      nudge
    });
  }

}

var _default = InteractionDetector;
exports.default = _default;
//# sourceMappingURL=InteractionDetector.js.map