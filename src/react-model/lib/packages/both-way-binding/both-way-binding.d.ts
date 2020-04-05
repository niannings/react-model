import './jsx';
declare module 'react' {
    interface HTMLAttributes<T> {
        _modelname?: string;
        _byevent?: string;
        _event?: string;
        _prop?: string;
        _deps?: any[];
    }
}
export { default as useBothWayBinding } from './useBothWayBinding';
export { default as useModel } from './useModel';
export { default as withModel } from './withModel';
