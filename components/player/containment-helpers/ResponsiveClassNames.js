"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ResponsiveClassNames extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "resizeObserver", void 0);

    _defineProperty(this, "onRef", element => {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }

      if (element && this.props.configuration && Array.isArray(this.props.configuration.responsivenessRules) && this.props.configuration.responsivenessRules.length > 0) {
        if (!this.resizeObserver) {
          this.resizeObserver = new _resizeObserverPolyfill.default(entries => {
            var _iterator = _createForOfIteratorHelper(entries),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                const entry = _step.value;
                this.onSizeChange(entry.contentRect);
                /*
                const {left, top, width, height} = entry.contentRect;
                 console.log('Element:', entry.target);
                console.log(`Element's size: ${ width }px x ${ height }px`);
                console.log(`Element's paddings: ${ top }px ; ${ left }px`);
                */
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }); // console.log('ResizeObserver instantiated.', this.resizeObserver);
        }

        this.resizeObserver.observe(element);
      }

      if (this.props.onRef) {
        this.props.onRef(element);
      }
    });

    _defineProperty(this, "onSizeChange", contentRect => {
      const elementWidth = contentRect.width;
      const elementHeight = contentRect.height;

      if (elementWidth > 0 && elementHeight > 0 && this.props.configuration && Array.isArray(this.props.configuration.responsivenessRules)) {
        const responsiveClassNames = this.props.configuration.responsivenessRules.filter(({
          width,
          height
        }) => {
          if (width && (width.min && elementWidth <= width.min || width.max && elementWidth > width.max)) {
            return false;
          }

          if (height && (height.min && elementHeight <= height.min || height.max && elementHeight > height.max)) {
            return false;
          }

          return true;
        }).map(range => range.className);
        this.setState({
          responsiveClassNames
        });
      }
    });

    this.state = {
      responsiveClassNames: []
    };
  }

  render() {
    return this.props.render({
      onRef: this.onRef,
      responsiveClassNames: this.state.responsiveClassNames
    });
  }

}

var _default = ResponsiveClassNames;
exports.default = _default;
//# sourceMappingURL=ResponsiveClassNames.js.map