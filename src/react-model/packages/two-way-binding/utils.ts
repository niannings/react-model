import { MODEL_ID } from './withModel';

export function findModelId(ref) {
    let cur = ref._owner;
    while (cur) {
        const modelId = cur.pendingProps[MODEL_ID];
        if (modelId) return modelId;
        cur = cur.return;
    }
    throw new Error('useModel can only be used under HOC of withModel or withClassModel.');
}
