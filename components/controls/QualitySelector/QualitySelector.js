"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Selector = _interopRequireDefault(require("../../generic/Selector/Selector"));

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const className = 'quality-selector';

class QualitySelector extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSelect", bitrate => {
      if (this.props.setProperties) {
        if (this.props.selectionStrategy === 'fix-bitrate') {
          this.props.setProperties({
            bitrateFix: bitrate
          });
        } else {
          this.props.setProperties({
            bitrateCap: bitrate
          });
        }
      }
    });

    _defineProperty(this, "bitrateToItem", bitrate => ({
      id: bitrate,
      label: bitrate === Infinity ? this.props.autoLabel : this.props.formatBitrateLabel(bitrate, bitrate === this.props.currentBitrate),
      data: bitrate
    }));

    _defineProperty(this, "isSelected", (bitrate, index, arr) => {
      const _this$props = this.props,
            bitrateFix = _this$props.bitrateFix,
            bitrateCap = _this$props.bitrateCap,
            selectionStrategy = _this$props.selectionStrategy;
      const matchValue = bitrateFix != null && bitrateCap != null ? selectionStrategy === 'fix-bitrate' ? bitrateFix : bitrateCap : bitrateFix || bitrateCap;

      if (matchValue === 'min') {
        return index === 1;
      } else if (matchValue === 'max') {
        return index === arr.length - 1;
      } else {
        return bitrate === matchValue;
      }
    });
  }

  render() {
    const _this$props2 = this.props,
          bitrates = _this$props2.bitrates,
          label = _this$props2.label,
          toggleContent = _this$props2.toggleContent,
          classNamePrefix = _this$props2.classNamePrefix;

    if (Array.isArray(bitrates) && bitrates.length > 1) {
      const items = [Infinity].concat(bitrates);
      const selectedItem = items.filter(this.isSelected)[0] || items[0];
      return /*#__PURE__*/React.createElement(_Selector.default, {
        items: items,
        itemMapper: this.bitrateToItem,
        classNamePrefix: classNamePrefix,
        className: className,
        selectedItem: selectedItem,
        label: label,
        onSelect: this.handleSelect,
        reverseOrder: true,
        expandedToggleContent: toggleContent,
        collapsedToggleContent: toggleContent
      });
    } else {
      return null;
    }
  }

}

_defineProperty(QualitySelector, "defaultProps", {
  classNamePrefix: _common.defaultClassNamePrefix,
  selectionStrategy: 'cap-bitrate'
});

_defineProperty(QualitySelector, "streamStateKeysForObservation", ['bitrates', 'currentBitrate', 'bitrateFix', 'bitrateCap']);

QualitySelector.displayName = 'QualitySelector';
var _default = QualitySelector;
exports.default = _default;
//# sourceMappingURL=QualitySelector.js.map