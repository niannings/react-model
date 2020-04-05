import { u as useStates } from './useStates-c81ffa19.js';
import { useEffect } from 'react';
import { g as get } from './object-63ca3eb8.js';

function useModelValidator(_a, config) {
  var model = _a[0],
      setModel = _a[1];

  if (config === void 0) {
    config = {};
  }

  var _b = useStates({}),
      error = _b[0],
      setError = _b[1];

  var keys = Object.keys(config);
  var i = keys.length;

  while (--i > -1) {
    var key = keys[i];
    Validator({
      value: get(model, key)[0],
      key: key,
      validators: config[key],
      setError: setError,
      setModel: setModel
    });
  }

  return error;
}

function Validator(_a) {
  var value = _a.value,
      key = _a.key,
      _b = _a.validators,
      validators = _b === void 0 ? [] : _b,
      setError = _a.setError,
      setModel = _a.setModel;
  useEffect(function () {
    var _a, _b;

    var j = -1;
    var len = validators.length;

    while (++j < len) {
      var message = validators[j](value, function (val) {
        var _a;

        return setModel((_a = {}, _a[key] = val, _a));
      });

      if (message) {
        setError((_a = {}, _a[key] = message, _a));
        break;
      }
    }

    if (j === len) setError((_b = {}, _b[key] = undefined, _b)); // eslint-disable-next-line
  }, [value]);
  return null;
}

export default useModelValidator;
