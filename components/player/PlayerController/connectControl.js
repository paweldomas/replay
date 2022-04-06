"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ControlledVideoStreamer = void 0;

var React = _interopRequireWildcard(require("react"));

var _ControllerContext = _interopRequireDefault(require("./ControllerContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
const getObserver = (callback: HandleChangeMethod) => (key: string, value: any) => {
  callback({ [key]: value });
};
*/
const registerObservers = (observe, keys, onChange) => keys.forEach(p => observe(p, onChange));

const connectControl = (Control, stateKeys) => {
  // $FlowFixMe What's the best practices for extending component classes with static properties?
  const resolvedStateKeys = stateKeys || Control.streamStateKeysForObservation || [];

  if (!Array.isArray(resolvedStateKeys)) {
    // Good old runtime check.
    throw new Error("The component ".concat(Control.displayName || Control.name, " cannot be connected to the player controller because no stream state property keys are specified to be observed."));
  }

  class Observer extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "update", prop => this.setState(prop));

      const currentState = props.inspect();
      const initialState = {};

      if (currentState) {
        resolvedStateKeys.forEach(key => initialState[key] = currentState[key]);
      }

      this.state = initialState;
    }

    componentWillUnmount() {
      registerObservers(this.props.unobserve, resolvedStateKeys, this.update);
    }

    componentDidMount() {
      registerObservers(this.props.observe, resolvedStateKeys, this.update);
      const currentState = this.props.inspect();

      if (currentState) {
        resolvedStateKeys.forEach(key => this.setState({
          [key]: currentState[key]
        }));
      }
    }

    render() {
      return /*#__PURE__*/React.createElement(Control, _objectSpread({}, this.props.passdownProps, {}, this.state));
    }

  }

  const ConnectedControl = props => /*#__PURE__*/React.createElement(_ControllerContext.default.Consumer, null, ({
    observe,
    unobserve,
    setProperties,
    inspect
  }) => {
    if (observe) {
      return /*#__PURE__*/React.createElement(Observer, {
        observe: observe,
        unobserve: unobserve,
        inspect: inspect,
        passdownProps: _objectSpread({}, props, {
          setProperties,
          inspect
        })
      });
    } else {
      return /*#__PURE__*/React.createElement(Control, _objectSpread({}, props, {
        setProperties,
        inspect
      }));
    }
  });

  if (Control.displayName) {
    ConnectedControl.displayName = 'Connected' + Control.displayName;
  } else if (process.env.NODE_ENV === 'development') {
    ConnectedControl.controlWithoutDisplayName = Control.name + ' wrapped in ConnectedControl';
  } else {
    ConnectedControl.displayName = 'Connected' + Control.name;
  }

  return ConnectedControl;
};

const ControlledVideoStreamer = props => /*#__PURE__*/React.createElement(_ControllerContext.default.Consumer, null, ({
  videoStreamer
}) => videoStreamer != null ? React.cloneElement(videoStreamer, props) : null);

exports.ControlledVideoStreamer = ControlledVideoStreamer;
var _default = connectControl;
exports.default = _default;
//# sourceMappingURL=connectControl.js.map