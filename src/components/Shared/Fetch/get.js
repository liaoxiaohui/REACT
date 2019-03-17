import {obj2params} from 'Shared/fetch/fetch-utils'

/***
 * 获取fetch=>get返回的Promise对象
 * @param url
 * @param paramsObj
 * @returns {Promise<Response>}
 */
export function get(url, paramsObj) {
    url = url + '?' + obj2params(paramsObj.data);
    const df_header = {
        'Accept': 'application/json, text/plain, */*'
    };
    const df_config = {
        credentials: paramsObj.credentials ? paramsObj.credentials : 'include',
        headers: Object.assign(df_header, paramsObj.headers ? paramsObj.headers : {})
    };
    !!paramsObj.mode && (df_config.mode = paramsObj.mode);

    return fetch(url, df_config);
}
