// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
export function obj2params(obj) {
    let result = '', item;
    for (item in obj) {
        if (obj.hasOwnProperty(item))
            result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    if (result)
        result = result.slice(1);

    return result;
}

//检查数据返回状态
export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
        // return error;
    }
}

//根据类型获取数据
export function parseData(response, type) {
    return type.toLowerCase() === 'text' ? response.text() : response.json();
}