export function classlist(obj: any = {}) {
    return Object.keys(obj)
        .filter(k => obj[k])
        .join(' ');
}
