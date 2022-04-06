"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PropTableRow = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

var _Button = _interopRequireDefault(require("../../generic/Button/Button"));

var _connectControl = _interopRequireDefault(require("../../player/PlayerController/connectControl"));

var _version = _interopRequireDefault(require("../../../version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const orderedPropertyNames = ['playMode', 'playState', 'isPaused', 'isBuffering', 'isSeeking', 'position', 'duration', 'absolutePosition', 'absoluteStartPosition', 'isAtLiveEdge', 'isPipAvailable', 'isPipActive', 'isAirPlayAvailable', 'isAirPlayActive', 'bufferedAhead', 'bitrateFix', 'bitrateCap', 'currentBitrate', 'bitrates', 'currentTextTrack', 'textTracks', 'currentAudioTrack', 'audioTracks', 'volume', 'isMuted', 'error'];
const className = 'playback-monitor';
const tableClassName = 'playback-monitor-stream-state';
const headerRowClassName = 'playback-monitor-table-header';
const propNameClassName = 'playback-monitor-property-name';
const currentValueClassName = 'playback-monitor-current-value';
const previousValueClassName = 'playback-monitor-previous-value';
const closeButtonClassName = 'playback-monitor-close-button';
const headerClassName = 'playback-monitor-header';
const versionClassName = 'playback-monitor-version';
const closeButtonLabel = 'Close';

const formatValue = val => {
  if (val instanceof Date) {
    if (isNaN(val.getTime())) {
      return val.toString();
    } else {
      return val.toISOString();
    }
  } else if (typeof val === 'number') {
    if (val % 1 !== 0) {
      return val.toFixed(2);
    } else {
      return val;
    }
  } else if (typeof val === 'function') {
    return 'function :-o';
  } else if (val instanceof Error) {
    const parts = [];

    if (val.message) {
      parts.push("message: '".concat(val.message, "'"));
    }

    if (val.code) {
      parts.push("code: '".concat(val.code, "'"));
    }

    if (val.severity) {
      parts.push("severity: '".concat(val.severity, "'"));
    }

    return "{".concat(parts.join(','), "}");
  } else if (Array.isArray(val)) {
    return '[' + val.map(formatValue).join(',') + ']';
  } else if (typeof val === 'boolean') {
    return val.toString();
  } else if (typeof val === 'string') {
    return val;
  } else if (val) {
    return JSON.stringify(val).replace(/(")(([A-Z]|[a-z]|[0-9])+)(")(:)/g, '$2$5').replace(/(handlers|props|methods|constants):\{(.*?)},/g, '');
  } else {
    return val;
  }
};

class PropTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.inspect()[props.propertyName]
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.propertyName in nextProps && (0, _common.isDifferent)(nextProps[nextProps.propertyName], prevState.currentValue)) {
      return {
        currentValue: nextProps[nextProps.propertyName],
        previousValue: prevState.currentValue
      };
    } else {
      return null;
    }
  }

  render() {
    const _this$props = this.props,
          prefixedClassNames = _this$props.prefixedClassNames,
          propertyName = _this$props.propertyName;
    const _this$state = this.state,
          currentValue = _this$state.currentValue,
          previousValue = _this$state.previousValue;
    const formattedCurrentValue = formatValue(currentValue);
    const formattedPreviousValue = formatValue(previousValue);
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      title: propertyName,
      className: prefixedClassNames.propName
    }, propertyName), /*#__PURE__*/React.createElement("td", {
      title: formattedCurrentValue,
      className: prefixedClassNames.currentValue
    }, formattedCurrentValue), /*#__PURE__*/React.createElement("td", {
      title: formattedPreviousValue,
      className: prefixedClassNames.previousValue
    }, formattedPreviousValue));
  }

}

exports.PropTableRow = PropTableRow;
const connectedComponents = {};
orderedPropertyNames.forEach(propertyName => {
  connectedComponents[propertyName] = (0, _connectControl.default)(PropTableRow, [propertyName]);
});

const getVisibleFromConfig = props => {
  return !!(props.configuration && props.configuration.playbackMonitor && props.configuration.playbackMonitor.visibleAtStart);
};

const renderTableRows = classNamePrefix => {
  const prefixedClassNames = {
    headerRow: (0, _common.prefixClassNames)(classNamePrefix, headerRowClassName),
    propName: (0, _common.prefixClassNames)(classNamePrefix, propNameClassName),
    currentValue: (0, _common.prefixClassNames)(classNamePrefix, currentValueClassName),
    previousValue: (0, _common.prefixClassNames)(classNamePrefix, previousValueClassName)
  };
  return [/*#__PURE__*/React.createElement(TableHeaderRow, {
    key: "header-row",
    prefixedClassNames: prefixedClassNames
  })].concat(orderedPropertyNames.map(propertyName => {
    const ConnectedPropRow = connectedComponents[propertyName];
    return /*#__PURE__*/React.createElement(ConnectedPropRow, {
      key: "prop-row-".concat(propertyName),
      prefixedClassNames: prefixedClassNames,
      propertyName: propertyName
    });
  }));
};

const TableHeaderRow = ({
  prefixedClassNames
}) => /*#__PURE__*/React.createElement("tr", {
  className: prefixedClassNames.headerRow
}, /*#__PURE__*/React.createElement("th", {
  className: prefixedClassNames.propName
}, "Property name"), /*#__PURE__*/React.createElement("th", {
  className: prefixedClassNames.currentValue
}, "Current value"), /*#__PURE__*/React.createElement("th", {
  className: prefixedClassNames.previousValue
}, "Previous value"));

class PlaybackMonitor extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseClick", () => this.setState({
      isMonitorVisible: false
    }));

    _defineProperty(this, "handleKeyDown", keyboardEvent => {
      if (keyboardEvent.ctrlKey && keyboardEvent.altKey && keyboardEvent.code === 'KeyM') {
        this.setState({
          isMonitorVisible: !this.state.isMonitorVisible
        });
      }
    });

    this.state = {
      isMonitorVisible: getVisibleFromConfig(props)
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const prevVisible = getVisibleFromConfig(prevProps);

    if (!prevVisible && getVisibleFromConfig(this.props)) {
      this.setState({
        isMonitorVisible: true
      });
    }
  }

  render() {
    const _this$props2 = this.props,
          label = _this$props2.label,
          classNamePrefix = _this$props2.classNamePrefix,
          closeButtonContent = _this$props2.closeButtonContent;

    if (this.state.isMonitorVisible) {
      return /*#__PURE__*/React.createElement("div", {
        title: label,
        className: (0, _common.prefixClassNames)(classNamePrefix, className)
      }, /*#__PURE__*/React.createElement("div", {
        className: (0, _common.prefixClassNames)(classNamePrefix, headerClassName)
      }, /*#__PURE__*/React.createElement(_Button.default, {
        className: closeButtonClassName,
        classNamePrefix: classNamePrefix,
        content: closeButtonContent,
        label: closeButtonLabel,
        onClick: this.handleCloseClick
      }), /*#__PURE__*/React.createElement("p", {
        className: (0, _common.prefixClassNames)(classNamePrefix, versionClassName)
      }, "Replay v", _version.default)), /*#__PURE__*/React.createElement("table", {
        className: (0, _common.prefixClassNames)(classNamePrefix, tableClassName)
      }, /*#__PURE__*/React.createElement("tbody", null, renderTableRows(classNamePrefix))));
    } else {
      return null;
    }
  }

}

_defineProperty(PlaybackMonitor, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix
});

PlaybackMonitor.displayName = 'PlaybackMonitor';
var _default = PlaybackMonitor;
exports.default = _default;
//# sourceMappingURL=PlaybackMonitor.js.map