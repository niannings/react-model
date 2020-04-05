import { useReducer } from 'react';

function reducer(state, action) {
    return { ...state, ...action };
}

/**
 *
 * @param {object} initialState 初始state
 * @param {(...args) => object} init 初始化state,非必须
 */
export function useStates<S = any>(initialState: S, init?: (...args) => S) {
    return useReducer(reducer, initialState, init);
}
