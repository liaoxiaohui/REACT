import {typeOf} from "Utils/tool-utils";

export function objectFilterByProps(obj, arr) {
    if (typeOf(obj) !== 'object' || Object.keys(obj).length < 1)
        return null;
    if (typeOf(arr) !== 'array' || arr.length < 1)
        return null;
    for (let i = 0; i < arr.length; i++) {
        if (obj.hasOwnProperty(arr[i]))
            delete obj[arr[i]];
    }
    return obj;
}