import {get} from './get.js'
import {post} from './post.js'
import {parseData, checkStatus} from 'Shared/fetch/fetch-utils';
import {typeOf} from "Utils/tool-utils";
import {message} from 'antd';
import Api from "Configure/api";

/***
 * get请求数据
 * @param url
 * @param options
 * {
 *    dataType:string 返回的数据类型
 *    data:object 发送的数据
 *    header:object 设置请求头
 *    credentials:string Request’s credentials mode
 *    mode:string 设置请求模式，如'cors'
 * }
 * @param callback
 * @param errorback
 */
export function getData(url, options, callback, errorback) {
    if (typeOf(url) !== 'string')
        throw new Error(`the param of getData's url should be string!request url:${url}`);
    if (typeOf(callback) !== 'function')
        throw new Error(`the last param of getData should be function!request url:${url}`);
    if (typeOf(options) !== 'object')
        options = {};
    // 获取promise对象
    const result = get(Api.node_server + url, options);

    result.then(checkStatus)
        .then((res) => parseData(res, options.dataType))
        .then((data) => {
            if (typeOf(callback) === 'function')
                callback(data);
        }).catch((error) => {
        if (typeOf(errorback) === 'function')
            errorback(error);
        message.error('数据请求发生错误，请稍后再试！');
    })
}

/***
 * post请求数据
 * @param url
 * @param options
 * {
 *    dataType:string 返回的数据类型
 *    data:object 发送的数据
 *    header:object 设置请求头
 *    credentials:string Request’s credentials mode
 *    mode:string 设置请求模式，如'cors'
 * }
 * @param callback
 * @param errorback
 */
export function postData(url, options, callback, errorback) {
    if (typeOf(url) !== 'string')
        throw new Error(`the param of postData's url should be string!request url:${url}`);
    if (typeOf(callback) !== 'function')
        throw new Error(`the last param of postData should be function!request url:${url}`);
    if (typeOf(options) !== 'object')
        options = {};

    // 获取promise对象
    const result = post(Api.node_server + url, options);

    result.then(checkStatus)
        .then((res) => parseData(res, options.dataType))
        .then((data) => {
            if (typeOf(callback) === 'function')
                callback(data);
        }).catch((error) => {
        if (typeOf(errorback) === 'function')
            errorback(error);
        message.error('数据请求发生错误，请稍后再试！');
    })
}