import { Children, cloneElement, useMemo, useRef } from 'react';
import { get } from '../../utils/object';
import { STORE } from './useModel';
import { findModelId } from './utils';

function useBothWayBinding(jsxEl: JSX.Element) {
    const modelId = findModelId(jsxEl);
    const [model, setModel] = STORE.get(modelId);
    return DFSMap(jsxEl, model, setModel);
}

export default useBothWayBinding;

function DFSMap(jsxEl, model, setModel) {
    if (!jsxEl) return jsxEl;
    return Children.map(jsxEl, child => {
        const modelName = get(child, 'props._modelname')[0];
        if (modelName) {
            // const bindedEl = bindProps(child, model, setModel, modelName);
            // if (bindedEl.props.children) {
            //   return cloneElement(bindedEl, {
            //     children: DFSMap(bindedEl.props.children, model, setModel)
            //   });
            // }
            return BindProps({ jsxEl: child, model, setModel, modelName });
        }
        const children = get(child, 'props.children')[0];
        if (children) {
            return cloneElement(child, {
                children: DFSMap(children, model, setModel)
            });
        }
        return child;
    });
}

function BindProps({ jsxEl, model, setModel, modelName }) {
    const {
        _prop = 'value',
        _event = 'onChange',
        _byevent = false,
        _deps = []
    } = get(jsxEl, 'props')[0] || {};
    const bindValue = get(model, modelName)[0];
    const dependencies = [bindValue, ..._deps];
    const handlerRef = useRef(value => {
        setModel({
            [modelName]: _byevent ? value.target[_prop] : value
        });
    });

    _deps.length && console.log(dependencies);

    return useMemo(
        () =>
            cloneElement(jsxEl, {
                [_prop]: bindValue
                    ? bindValue
                    : jsxEl.type === 'input' // 解决非受控组件警告
                    ? ''
                    : bindValue,
                [_event]: handlerRef.current
            }),
        // eslint-disable-next-line
    dependencies
    );
}
