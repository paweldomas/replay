"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

var _ToggleButton = _interopRequireDefault(require("../ToggleButton/ToggleButton"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultSelectorClassName = 'selector';
const expandToggleClassName = 'selector-toggle';
const selectorItemsClassName = 'selector-items';
const expandedClassName = 'expanded';
const collapsedClassName = 'collapsed';
const defaultItemClassName = 'selector-item';
const selectedClassName = 'selected';

const selectCollapsedClasses = classes => classes.selectorCollapsed || classes.selector;

const selectExpandedClasses = classes => classes.selectorExpanded || classes.selector;

const selectItemsContainerClasses = classes => classes.selectorItemsContainer;

class Selector extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "focusableItems", []);

    _defineProperty(this, "toggleElement", null);

    _defineProperty(this, "onToggleRef", toggleElement => {
      this.toggleElement = toggleElement;
    });

    _defineProperty(this, "handleToggle", isOn => this.setState({
      isExpanded: isOn
    }));

    _defineProperty(this, "handleItemRef", (itemElement, index) => {
      this.focusableItems[index] = itemElement;
    });

    _defineProperty(this, "renderSelectorItem", (item, index) => {
      const itemData = this.props.itemMapper(item);
      return /*#__PURE__*/React.createElement(_helpers.SelectorItem, {
        key: itemData.id,
        item: itemData,
        index: index,
        onSelect: this.props.onSelect,
        onRef: this.handleItemRef,
        isSelected: item === this.props.selectedItem,
        canReceiveFocus: this.state.isExpanded,
        selectedClassName: selectedClassName,
        defaultItemClassName: defaultItemClassName,
        className: this.props.itemClassName,
        classes: this.props.classes,
        classNamePrefix: this.props.classNamePrefix
      });
    });

    _defineProperty(this, "handleKeyDown", keyboardEvent => {
      switch (keyboardEvent.key) {
        case 'ArrowUp':
        case 'Up':
          keyboardEvent.preventDefault();
          return;

        case 'ArrowDown':
        case 'Down':
          if (this.state.isExpanded) {
            keyboardEvent.preventDefault();
          }

          return;

        default:
          return;
      }
    });

    _defineProperty(this, "handleKeyUp", keyboardEvent => {
      if (this.state.isExpanded) {
        if (keyboardEvent.key === 'ArrowUp' || keyboardEvent.key === 'Up') {
          keyboardEvent.preventDefault();
          (0, _helpers.focusElement)(true, this.props.reverseOrder || false, this.focusableItems, this.toggleElement);
        }

        if (keyboardEvent.key === 'ArrowDown' || keyboardEvent.key === 'Down') {
          keyboardEvent.preventDefault();
          const focusedElement = (0, _helpers.focusElement)(false, this.props.reverseOrder || false, this.focusableItems, this.toggleElement);

          if (focusedElement === this.toggleElement) {
            this.setState({
              isExpanded: false
            });
          }
        }
      } else {
        if (keyboardEvent.key === 'ArrowUp' || keyboardEvent.key === 'Up') {
          keyboardEvent.preventDefault();
          this.setState({
            isExpanded: true
          });
        }
      }
    });

    _defineProperty(this, "handleMouseLeave", () => {
      this.setState({
        isExpanded: false
      });
    });

    this.state = {
      isExpanded: false
    };
  }

  render() {
    const _this$props = this.props,
          className = _this$props.className,
          classNamePrefix = _this$props.classNamePrefix,
          classes = _this$props.classes,
          items = _this$props.items,
          collapsedToggleContent = _this$props.collapsedToggleContent,
          expandedToggleContent = _this$props.expandedToggleContent,
          reverseOrder = _this$props.reverseOrder,
          label = _this$props.label;
    const renderedItems = items ? reverseOrder ? items.map(this.renderSelectorItem).reverse() : items.map(this.renderSelectorItem) : null;
    const classNames = (0, _common.hydrateClassNames)({
      classes,
      classNamePrefix,
      selectClasses: this.state.isExpanded ? selectExpandedClasses : selectCollapsedClasses,
      classNames: [className, defaultSelectorClassName, this.state.isExpanded ? expandedClassName : collapsedClassName]
    });
    const itemsContainerClassNames = (0, _common.hydrateClassNames)({
      classes,
      selectClasses: selectItemsContainerClasses,
      classNamePrefix,
      classNames: [selectorItemsClassName]
    });
    const toggleButtonClasses = classes ? {
      toggleButtonOff: classes.selectorToggle || classes.selectorToggleOff,
      toggleButtonOn: classes.selectorToggleOn
    } : null;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      onMouseLeave: this.handleMouseLeave
    }, /*#__PURE__*/React.createElement(_ToggleButton.default, {
      isOn: this.state.isExpanded,
      className: expandToggleClassName,
      classNamePrefix: classNamePrefix,
      classes: toggleButtonClasses,
      label: label,
      onToggle: this.handleToggle,
      onRef: this.onToggleRef,
      toggledOffContent: collapsedToggleContent,
      toggledOnContent: expandedToggleContent
    }), /*#__PURE__*/React.createElement("div", {
      role: "listbox",
      className: itemsContainerClassNames
    }, renderedItems));
  }

}

_defineProperty(Selector, "defaultProps", {
  useDefaultClassNaming: true
});

var _default = Selector;
exports.default = _default;
//# sourceMappingURL=Selector.js.map