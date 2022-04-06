"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const alreadyWarnedNames = [];

const analyzeChild = child => {
  const type = child && child.type;
  let displayName = type && child.type.displayName;
  const name = type && child.type.name;
  let fullName = name;

  if (name === 'ConnectedControl') {
    fullName = child.type.controlWithoutDisplayName || name;
  }

  if (!displayName && (!name || alreadyWarnedNames.indexOf(name) === -1)) {
    // eslint-disable-next-line no-console
    console.warn('<RenderIfEnabled/> depends on child components having the displayName static property set. The component %s, has no ' + 'displayName property set. If no displayName is added to %s, the control might not render in production builds.', fullName || '[no name found]', name || '[no name found]');

    if (name) {
      alreadyWarnedNames.push(name);
    }
  }
};

const extractChildName = child => {
  const name = child && child.type && (child.type.displayName || child.type.name);

  if (name) {
    let startIndex = name.indexOf('Connected') === 0 ? 9 : 0;

    if (name.indexOf('SettingsStorage') === startIndex) {
      startIndex += 15;
    }

    return name.charAt(startIndex).toLowerCase() + name.substr(startIndex + 1);
  }
};

class RenderIfEnabled extends React.Component {
  render() {
    if (this.props.configuration) {
      return React.Children.map(this.props.children, child => {
        if (process.env.NODE_ENV === 'development') {
          analyzeChild(child);
        }

        const childName = extractChildName(child);

        if (!childName || this.props.configuration && this.props.configuration.indexOf(childName) >= 0) {
          return child;
        }
      });
    } else if (process.env.NODE_ENV === 'development') {
      React.Children.forEach(this.props.children, analyzeChild);
      return this.props.children;
    } else {
      return this.props.children;
    }
  }

}

var _default = RenderIfEnabled;
exports.default = _default;
//# sourceMappingURL=RenderIfEnabled.js.map