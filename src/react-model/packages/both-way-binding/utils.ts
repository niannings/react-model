import { MODEL_ID } from './withModel';

export function findModelId(ref) {
    let cur = ref._owner;
    while (cur) {
        const modelId = cur.pendingProps[MODEL_ID];
        if (modelId) return modelId;
        cur = cur.return;
    }
    throw new Error('useModel只能在withModel高阶组件下使用～');
}
