"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../../../common");

const saneNumberFilter = value => value == null || isNaN(value) || value === Infinity || typeof value !== 'number' || value < 0 ? 0 : value;

const defaultFilters = {
  position: saneNumberFilter,
  duration: saneNumberFilter,
  volume: saneNumberFilter
};

function getFilteredStreamStateUpdater(videoStreamer, filters = defaultFilters) {
  const currentValues = {};

  function update(property) {
    const callback = videoStreamer.props && videoStreamer.props.onStreamStateChange;

    if (callback) {
      // $FlowFixMe Yet to understand how to safely iterate through objects as maps.
      Object.entries(property).forEach(([key, value]) => {
        const saneValue = filters[key] ? filters[key](value) : value;

        if ((0, _common.isDifferent)(currentValues[key], saneValue)) {
          // $FlowFixMe
          currentValues[key] = saneValue;
          callback({
            [key]: saneValue
          });
        }
      });
    }
  }

  return update;
}

var _default = getFilteredStreamStateUpdater;
exports.default = _default;
//# sourceMappingURL=filteredStreamStateUpdater.js.map