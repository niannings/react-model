import { _ as __assign, u as useStates, a as __spreadArrays } from './useStates-c81ffa19.js';
import React, { useEffect, useCallback, Children, useMemo, cloneElement, useRef } from 'react';
import { s as setValue, g as get } from './object-63ca3eb8.js';

var uid = Date.now();
var MODEL_ID = '$model-id';
function withModel(TheComponent) {
  var _a;

  ++uid;

  var _props = (_a = {}, _a[MODEL_ID] = uid.toString(32), _a);

  return function (props) {
    return React.createElement(TheComponent, __assign({}, props, _props));
  };
}

function findModelId(ref) {
  var cur = ref._owner;

  while (cur) {
    var modelId = cur.pendingProps[MODEL_ID];
    if (modelId) return modelId;
    cur = cur.return;
  }

  throw new Error('useModel只能在withModel高阶组件下使用～');
}

var STORE = new Map();

function useModel(initialModel) {
  if (initialModel === void 0) {
    initialModel = {};
  }

  var ref = React.createElement(React.Fragment, null);
  var modelId = findModelId(ref);

  var _a = STORE.get(modelId) || [],
      findedModel = _a[0],
      findedSetModel = _a[1];

  var _b = useStates(initialModel),
      model = _b[0],
      _setModel = _b[1];

  useEffect(function () {
    return function () {
      // @ts-ignore
      if (modelId === ref._owner[MODEL_ID]) {
        STORE.delete(modelId);
      }
    };
  }, // eslint-disable-next-line
  []);
  var setModel = useCallback(function (data) {
    var path = Object.keys(data)[0];
    setValue(model, path, data[path]);
    findedSetModel ? findedSetModel(model) : _setModel(model); // eslint-disable-next-line
  }, []);
  if (!findedModel) STORE.set(modelId, [model, setModel]);
  return STORE.get(modelId);
}

function useBothWayBinding(jsxEl) {
  var modelId = findModelId(jsxEl);

  var _a = STORE.get(modelId),
      model = _a[0],
      setModel = _a[1];

  return DFSMap(jsxEl, model, setModel);
}

function DFSMap(jsxEl, model, setModel) {
  if (!jsxEl) return jsxEl;
  return Children.map(jsxEl, function (child) {
    var modelName = get(child, 'props._modelname')[0];

    if (modelName) {
      // const bindedEl = bindProps(child, model, setModel, modelName);
      // if (bindedEl.props.children) {
      //   return cloneElement(bindedEl, {
      //     children: DFSMap(bindedEl.props.children, model, setModel)
      //   });
      // }
      return BindProps({
        jsxEl: child,
        model: model,
        setModel: setModel,
        modelName: modelName
      });
    }

    var children = get(child, 'props.children')[0];

    if (children) {
      return cloneElement(child, {
        children: DFSMap(children, model, setModel)
      });
    }

    return child;
  });
}

function BindProps(_a) {
  var jsxEl = _a.jsxEl,
      model = _a.model,
      setModel = _a.setModel,
      modelName = _a.modelName;

  var _b = get(jsxEl, 'props')[0] || {},
      _c = _b._prop,
      _prop = _c === void 0 ? 'value' : _c,
      _d = _b._event,
      _event = _d === void 0 ? 'onChange' : _d,
      _e = _b._byevent,
      _byevent = _e === void 0 ? false : _e,
      _f = _b._deps,
      _deps = _f === void 0 ? [] : _f;

  var bindValue = get(model, modelName)[0];

  var dependencies = __spreadArrays([bindValue], _deps);

  var handlerRef = useRef(function (value) {
    var _a;

    setModel((_a = {}, _a[modelName] = _byevent ? value.target[_prop] : value, _a));
  });
  _deps.length && console.log(dependencies);
  return useMemo(function () {
    var _a;

    return cloneElement(jsxEl, (_a = {}, _a[_prop] = bindValue ? bindValue : jsxEl.type === 'input' // 解决非受控组件警告
    ? '' : bindValue, _a[_event] = handlerRef.current, _a));
  }, // eslint-disable-next-line
  dependencies);
}

export { useBothWayBinding, useModel, withModel };
