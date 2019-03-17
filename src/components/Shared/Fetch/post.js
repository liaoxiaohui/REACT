import {obj2params} from 'Shared/fetch/fetch-utils'

/***
 * 获取fetch=>post返回的Promise对象
 * @param url
 * @param paramsObj
 * @returns {Promise<Response>}
 */
export function post(url, paramsObj) {
    const df_header = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const df_config = {
        method: 'POST',
        credentials: paramsObj.credentials ? paramsObj.credentials : 'include',
        headers: Object.assign(df_header, paramsObj.headers ? paramsObj.headers : {}),
        body: obj2params(paramsObj.data)
    };
    !!paramsObj.mode && (df_config.mode = paramsObj.mode);

    return fetch(url, df_config);
}
