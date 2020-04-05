import { a as __spreadArrays } from './useStates-c81ffa19.js';

var resolvePath = function (path) {
  return path // eslint-disable-next-line
  .replace(/\[([^\[\]]*)\]/g, ".$1.").split('.').filter(function (t) {
    return t !== '';
  });
};

var get = function (from) {
  var selectors = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    selectors[_i - 1] = arguments[_i];
  }

  return __spreadArrays(selectors).map(function (s) {
    return resolvePath(s).reduce(function (prev, cur) {
      return prev === null || prev === void 0 ? void 0 : prev[cur];
    }, from);
  });
};
function setValue(model, path, value) {
  var chunks = resolvePath(path);
  var flag = chunks.length - 1;
  chunks.reduce(function (prev, cur, index) {
    if (index === flag) {
      prev[cur] = value;
      return prev;
    }

    if (!prev[cur]) {
      if (/^\d+$/.test(chunks[index + 1])) {
        prev[cur] = [];
      } else {
        prev[cur] = {};
      }
    }

    return prev[cur];
  }, model);
}

export { get as g, setValue as s };
