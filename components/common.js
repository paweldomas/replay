"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixClassNames = prefixClassNames;
exports.hydrateClassNames = hydrateClassNames;
exports.getBoundingEventCoordinates = getBoundingEventCoordinates;
exports.getKeyboardShortcutBlocker = getKeyboardShortcutBlocker;
exports.deepClone = deepClone;
exports.override = override;
exports.getIntervalRunner = exports.formatClockTime = exports.formatTime = exports.formatTimeComponent = exports.isShallowEqual = exports.isObject = exports.isDifferent = exports.defaultClassNamePrefix = void 0;
const defaultClassNamePrefix = 'replay-';
exports.defaultClassNamePrefix = defaultClassNamePrefix;

function prefixClassNames(prefix, ...names) {
  const sanitizedPrefix = prefix == null ? '' : prefix;
  const classNameArray = [];

  for (let i = 0; i < names.length; i++) {
    // Early optimisation: For loop is more effective than map/filter...
    if (names[i]) {
      classNameArray.push(sanitizedPrefix + names[i]);
    }
  }

  return classNameArray.join(' ');
}
/*export function buildClassNames(useDefaultClassNaming: ?boolean, prefix: ?string, ...names: Array<?string>): string {
  return useDefaultClassNaming ? prefixClassNames(prefix, ...names) : names[0] || '';
}*/


const isDefined = item => item;

function hydrateClassNames({
  classes,
  selectClasses,
  classNames,
  classNamePrefix
}) {
  if (classes && selectClasses) {
    const selectedClasses = selectClasses(classes);

    if (Array.isArray(selectedClasses)) {
      return selectedClasses.filter(isDefined).join(' ');
    } else {
      return selectedClasses;
    }
  } else if (classNames) {
    return prefixClassNames(classNamePrefix, ...classNames);
  }
}

function getBoundingEventCoordinates(evt, element) {
  // Difficult to code this with strict typing in a JS-optimal way. Sticking to any for the event.
  const domRect = (element || evt.currentTarget).getBoundingClientRect();
  let extractedEvent;

  if (evt.touches && evt.touches.length > 0) {
    extractedEvent = evt.touches[0];
  } else if (evt.changedTouches && evt.changedTouches.length > 0) {
    extractedEvent = evt.changedTouches[0];
  } else {
    extractedEvent = evt;
  }

  return {
    x: Math.max(0, Math.min(extractedEvent.pageX - domRect.left, domRect.width)),
    y: Math.max(0, Math.min(extractedEvent.pageY - domRect.top, domRect.height)),
    width: domRect.width,
    height: domRect.height
  };
}

function getKeyboardShortcutBlocker(keysToBeBlocked) {
  return keyboardEvent => {
    if (keysToBeBlocked.indexOf(keyboardEvent.key) >= 0) {
      keyboardEvent.preventDefault();
      keyboardEvent.stopPropagation();
    }
  };
}

const isDifferent = (a, b) => {
  if (a === b) {
    return false;
  }

  if (a instanceof Date && b instanceof Date && a.getTime() === b.getTime()) {
    return false;
  }

  return !(Number.isNaN(a) && Number.isNaN(b));
};

exports.isDifferent = isDifferent;

const isObject = obj => obj != null && obj.constructor === {}.constructor;

exports.isObject = isObject;

const isShallowEqual = (a, b) => {
  if (a === b) {
    return true;
  } else if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    const differentACount = keysA.filter(key => isDifferent(a[key], b[key])).length;

    if (differentACount > 0) {
      return false;
    }

    return keysB.filter(key => isDifferent(b[key], a[key])).length === 0;
  } else if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    for (let i = a.length; i--;) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  } else {
    // No identical equality
    return false;
  }
};

exports.isShallowEqual = isShallowEqual;

function deepClone(obj) {
  if (obj == null) {
    return {};
  } else {
    const clone = {};
    const original = obj;
    Object.keys(obj).forEach(key => {
      if (isObject(original[key])) {
        clone[key] = deepClone(original[key]);
      } else {
        clone[key] = original[key];
      }
    });
    return clone;
  }
}

function override(base, overrides) {
  const copy = deepClone(base);

  if (overrides) {
    const extension = overrides; // Should be unnecessary!

    Object.getOwnPropertyNames(extension).forEach(key => {
      if (isObject(extension[key])) {
        if (isObject(copy[key])) {
          copy[key] = override(copy[key], extension[key]);
        } else {
          copy[key] = deepClone(extension[key]);
        }
      } else {
        copy[key] = extension[key];
      }
    });
  }

  return copy;
}

const formatTimeComponent = (integer, separator = '', emptyIfZero = false, pad = true) => {
  return emptyIfZero && integer === 0 ? '' : integer < 10 && pad ? "0".concat(integer).concat(separator) : "".concat(integer).concat(separator);
};

exports.formatTimeComponent = formatTimeComponent;

const formatTime = (seconds, negativeMark = '-') => {
  let rounded = Math.round(seconds);
  let includedNegativeMark = '';

  if (typeof seconds !== 'number' || isNaN(seconds) || seconds === Infinity) {
    rounded = 0;
  } else if (rounded < 0) {
    rounded = -rounded;
    includedNegativeMark = negativeMark;
  }

  const days = Math.floor(rounded / 86400);
  const daysInSeconds = days * 86400;
  const hours = Math.floor((rounded - daysInSeconds) / 3600);
  const hoursAndDaysInSeconds = daysInSeconds + hours * 3600;
  const minutes = Math.floor((rounded - hoursAndDaysInSeconds) / 60);
  const secs = rounded - hoursAndDaysInSeconds - minutes * 60;
  return includedNegativeMark + formatTimeComponent(days, '.', true, false) + formatTimeComponent(hours, ':', days === 0) + formatTimeComponent(minutes, ':', false) + formatTimeComponent(secs);
};

exports.formatTime = formatTime;

const formatClockTime = date => {
  const isValidDate = date instanceof Date && !isNaN(date.getTime());
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (isValidDate && date != null) {
    // Silly construct for flow null check.
    hours = isValidDate ? date.getHours() : 0;
    minutes = isValidDate ? date.getMinutes() : 0;
    seconds = isValidDate ? date.getSeconds() : 0;
  }

  return formatTimeComponent(hours, ':', false) + formatTimeComponent(minutes, ':', false) + formatTimeComponent(seconds);
};

exports.formatClockTime = formatClockTime;

const getIntervalRunner = (method, intervalSeconds) => {
  let intervalID = null;
  return {
    start: () => {
      if (!intervalID) {
        intervalID = setInterval(method, intervalSeconds * 1000);
      }
    },
    stop: () => {
      if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
      }
    }
  };
};

exports.getIntervalRunner = getIntervalRunner;
//# sourceMappingURL=common.js.map