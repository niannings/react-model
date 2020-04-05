import { useEffect } from 'react';
import { useStates } from '../hooks/useStates';
import { get } from '../../utils/object';
// import './style.css';

function useModelValidator([model, setModel], config = {}) {
    const [error, setError] = useStates({});
    const keys = Object.keys(config);
    let i = keys.length;

    while (--i > -1) {
        const key = keys[i];
        Validator({
            value: get(model, key)[0],
            key,
            validators: config[key],
            setError,
            setModel
        });
    }

    return error;
}

export default useModelValidator;

function Validator({ value, key, validators = [], setError, setModel }) {
    useEffect(() => {
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
        // eslint-disable-next-line
  }, [value]);

    return null;
}
