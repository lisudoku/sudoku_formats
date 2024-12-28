// https://stackoverflow.com/a/43636793
const replacer = (key: string, value: any) =>
  value instanceof Object && !(value instanceof Array) ? 
    Object.keys(value)
    .sort()
    .reduce<any>((sorted, key) => {
        sorted[key] = value[key];
        return sorted 
    }, {}) :
    value

export const stableStringify = (obj: any): string => (
  JSON.stringify(obj, replacer)
)
