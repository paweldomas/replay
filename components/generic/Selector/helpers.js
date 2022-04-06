"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusElement = focusElement;
exports.SelectorItem = void 0;

var React = _interopRequireWildcard(require("react"));

var _common = require("../../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const selectItemClasses = classes => classes.selectorItem;

const selectItemSelectedClasses = classes => classes.selectorItemSelected || classes.selectorItem;

class SelectorItem extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleRef", element => {
      this.props.onRef(element, this.props.index);
    });

    _defineProperty(this, "handleClick", () => this.props.onSelect && this.props.onSelect(this.props.item.data));

    _defineProperty(this, "handleKeyDown", (0, _common.getKeyboardShortcutBlocker)(['Enter', ' ']));

    _defineProperty(this, "handleKeyUp", keyboardEvent => {
      if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
        keyboardEvent.preventDefault();
        this.handleClick();
      }
    });
  }

  render() {
    const _this$props = this.props,
          className = _this$props.className,
          classNamePrefix = _this$props.classNamePrefix,
          classes = _this$props.classes,
          defaultItemClassName = _this$props.defaultItemClassName,
          item = _this$props.item,
          isSelected = _this$props.isSelected,
          canReceiveFocus = _this$props.canReceiveFocus,
          selectedClassName = _this$props.selectedClassName;
    const label = item.label;
    const classNames = (0, _common.hydrateClassNames)({
      classes,
      classNamePrefix,
      selectClasses: isSelected ? selectItemSelectedClasses : selectItemClasses,
      classNames: [className, defaultItemClassName, isSelected ? selectedClassName : null]
    });
    const tabIndex = canReceiveFocus ? 0 : undefined;
    return /*#__PURE__*/React.createElement("div", {
      role: "option",
      "aria-selected": isSelected,
      className: classNames,
      ref: this.handleRef,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      tabIndex: tabIndex
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: -1
    }, label));
  }

}

exports.SelectorItem = SelectorItem;

function focusElement(upwards, isReverseOrder, items, baseElement) {
  const elements = (isReverseOrder ? items.slice(0).reverse() : items).concat(baseElement);

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === document.activeElement) {
      if (upwards) {
        if (i > 0) {
          for (let j = i - 1; j >= 0; j--) {
            const element = elements[j];

            if (element) {
              element.focus();
              return element;
            }
          }
        }
      } else {
        if (i < elements.length - 1) {
          for (let j = i + 1; j < elements.length; j++) {
            const element = elements[j];

            if (element) {
              element.focus();
              return element;
            }
          }
        }
      }
    }
  }
}
//# sourceMappingURL=helpers.js.map