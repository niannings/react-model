/// <reference path="../both-way-binding/both-way-binding.d.ts" />
/// <reference types="react" />
/**
 *
 * @param {object} initialState 初始state
 * @param {(...args) => object} init 初始化state,非必须
 */
export declare function useStates<S = any>(initialState: S, init?: (...args: any[]) => S): [any, import("react").Dispatch<any>];
