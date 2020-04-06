import { useEffect, useRef } from 'react';
import { useStates } from '../hooks/useStates';
import { get } from '../../utils/object';
import { debounce } from '../../utils/fn';
import './style.css';

function useModelValidator([model, setModel], config = {}) {
    const [error, setError] = useStates({});
    const didMountRef = useRef(false);
    const keys = Object.keys(config);
    let i = keys.length;

    while (--i > -1) {
        const key = keys[i];
        Validator({
            value: get(model, key)[0],
            key,
            validators: config[key],
            setError,
            setModel,
            didMount: didMountRef.current
        });
    }

    useEffect(() => {
        didMountRef.current = true;
    }, []);

    return error;
}

export default useModelValidator;

const validate = debounce(
    ({ value, key, validators = [], setError, setModel }) => {
        let j = -1;
        const len = validators.length;
        while (++j < len) {
            const message = validators[j](value, val =>
                setModel({ [key]: val })
            );
            if (message) {
                setError({
                    [key]: message
                });
                break;
            }
        }
        if (j === len) setError({ [key]: undefined });
    },
    66
);

function Validator({
    value,
    key,
    validators = [],
    setError,
    setModel,
    didMount
}) {
    useEffect(
        () => {
            if (didMount)
                validate({ value, key, validators, setError, setModel });
        },
        // eslint-disable-next-line
        [value]
    );
}
