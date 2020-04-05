import React from 'react';
export declare const STORE: Map<any, any>;
export interface IModelUser<M = any> {
    [0]: M;
    [1]: React.Dispatch<any>;
}
declare function useModel<M = any>(initialModel?: M): IModelUser<M>;
export default useModel;
