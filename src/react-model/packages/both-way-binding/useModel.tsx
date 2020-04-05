import React, { useEffect, useCallback } from 'react';
import { useStates } from '../hooks/useStates';
import { findModelId } from './utils';
import { MODEL_ID } from './withModel';
import { setValue } from '../../utils/object';

export const STORE = new Map();

export interface IModelUser<M = any> {
    [0]: M;
    [1]: React.Dispatch<any>;
};

function useModel<M = any>(initialModel: M = {} as any): IModelUser<M> {
    const ref = <></>;
    const modelId = findModelId(ref);
    const [findedModel, findedSetModel] = STORE.get(modelId) || [];
    const [model, _setModel] = useStates<M>(initialModel);

    useEffect(
        () => () => {
            // @ts-ignore
            if (modelId === ref._owner[MODEL_ID]) {
                STORE.delete(modelId);
            }
        },
        // eslint-disable-next-line
    []
    );

    const setModel = useCallback(data => {
        const path = Object.keys(data)[0];
        setValue(model, path, data[path]);
        findedSetModel ? findedSetModel(model) : _setModel(model);
        // eslint-disable-next-line
  }, []);

    if (!findedModel) STORE.set(modelId, [model, setModel]);

    return STORE.get(modelId);
}

export default useModel;
