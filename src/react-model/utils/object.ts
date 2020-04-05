const resolvePath = (path: string) =>
    path
        // eslint-disable-next-line
    .replace(/\[([^\[\]]*)\]/g, ".$1.")
        .split('.')
        .filter(t => t !== '');

export const get = (from: any, ...selectors: string[]) =>
    [...selectors].map(s =>
        resolvePath(s).reduce((prev, cur) => prev?.[cur], from)
    );

export function setValue(model, path, value) {
    const chunks = resolvePath(path);
    const flag = chunks.length - 1;

    chunks.reduce((prev, cur, index) => {
        if (index === flag) {
            prev[cur] = value;
            return prev;
        }
        if (!prev[cur]) {
            if (/^\d+$/.test(chunks[index + 1])) {
                prev[cur] = [];
            } else {
                prev[cur] = {};
            }
        }
        return prev[cur];
    }, model);
}
