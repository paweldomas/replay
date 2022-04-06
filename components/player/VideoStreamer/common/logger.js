"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayLogger = void 0;

const getArrayLogger = (obj, name) => {
  if (document.location.search.indexOf('debugVideoStreamer') >= 0) {
    return {
      log: (...args) => {
        if (!obj[name]) {
          obj[name] = [];
        }

        switch (args.length) {
          case 0:
            return;

          case 1:
            obj[name].push(args[0]);
            return;

          default:
            obj[name].push(args);
            return;
        }
      }
    };
  } else {
    return {
      log: (...args) => {}
    };
  }
};

exports.getArrayLogger = getArrayLogger;
//# sourceMappingURL=logger.js.map