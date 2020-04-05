import React from 'react';
import useModel from './useModel';

let uid = Date.now();
export const MODEL_ID = '$model-id';

export default function withModel(TheComponent) {
    ++uid;

    const _props = { [MODEL_ID]: uid.toString(32) };

    return props => <TheComponent {...props} {..._props} />;
}

export function withClassModel(TheComponent) {
    ++uid;

    const _props = { [MODEL_ID]: uid.toString(32) };

    return props => (
        <ModelComponent {...props} {..._props} TheComponent={TheComponent} />
    );
}

function ModelComponent({ TheComponent, ...rest }) {
    const MODEL = useModel();
    return <TheComponent {...rest} MODEL={MODEL} />;
}
