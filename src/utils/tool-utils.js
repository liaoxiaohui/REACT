// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// import jQuery from 'jquery'
import window from 'global/window';
import global from 'global';
import document from 'global/document';

/**
 * Generate a hash string based on number of character
 * @param {number} count
 * @returns {string} hash string
 */
export function generateHashId(count) {
    return Math.random()
        .toString(36)
        .substr(count);
}

/**
 * Detect chrome
 * @returns {boolean} - yes or no
 */
export function isChrome() {
    // Chrome 1+
    return window.chrome && window.chrome.webstore;
}

/**
 * whether is an object
 * @returns {boolean} - yes or no
 */
export function isPlainObject(obj) {
    return (
        obj === Object(obj) && typeof obj !== 'function' && !Array.isArray(obj)
    );
}

/**
 * whether null or undefined
 * @returns {boolean} - yes or no
 */
export function notNullorUndefined(d) {
    return d !== undefined && d !== null;
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 获取文档可见区域尺寸
 **/
export function getDocSize(type) { // type,0或undefined,不含滚动条尺寸；1,含滚动条尺寸
    let cHeight, cWidth;
    let docBHeight = document.body.clientHeight;
    let docDHeight = document.documentElement.clientHeight;
    let docBWidth = document.body.clientWidth;
    let docDWidth = document.documentElement.clientWidth;
    if (window.innerHeight && window.innerWidth && type) {
        cHeight = window.innerHeight;
        cWidth = window.innerWidth
    } else if (docBHeight && docDHeight && docBWidth && docDWidth) {
        cHeight = docBHeight < docDHeight ? docBHeight : docDHeight;
        cWidth = docBWidth < docDWidth ? docBWidth : docDWidth;
    } else {
        cHeight = document.body.offsetHeight;
        cWidth = document.body.offsetWidth;
    }
    return {height: cHeight, width: cWidth};
}

/**
 全屏
 **/
export function fullScreen() {
    let el = document.documentElement;
    let AXObj = window.ActiveXObject;
    let rfs = el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullScreen;
    if (typeof rfs !== "undefined" && rfs) {
        rfs.call(el);
    } else if (AXObj && typeof AXObj !== "undefined") {
        //for IE
        let wscript = new AXObj("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

/**
 退出全屏
 **/
export function minifyScreen() {
    // 判断各种浏览器，找到正确的方法
    let AXObj = window.ActiveXObject;
    let exitMethod = document.exitFullscreen
        || document.mozCancelFullScreen
        || document.webkitExitFullscreen
        || document.webkitExitFullscreen;
    if (exitMethod) {
        exitMethod.call(document);
    }
    else if (AXObj && typeof AXObj !== "undefined") {
        //for Internet Explorer
        let wscript = new AXObj("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

/**
 * 根据指定长度截取字符串，超过指定长度显示省略号...
 * str:输入的字符串-string
 * len:指定的截取长度-number
 * **/
export function cutStr(str, len) {
    let str_count = 0;
    let str_cut = '';
    if (!str || !len) {
        return str;
    }
    let str_len = str.length;
    for (let i = 0; i < str_len; i++) {
        let a = str.charAt(i);
        str_count++;
        if (encodeURI(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_count++
        }
        str_cut = str_cut.concat(a);
        if (str_count >= len) {
            str_cut = str_cut.concat("...");
            return str_cut
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_count < len) {
        return str;
    }
}

/**将jQuery表单对象序列化成json对象**/
export function serializeToJason() {
    // (function ($) {
    //     $.fn.serializeJson = function () {
    //         let serializeObj = {};
    //         let array = this.serializeArray();
    //         // let str = this.serialize();
    //         $(array).each(function () {
    //             if (serializeObj[this.name]) {
    //                 if ($.isArray(serializeObj[this.name])) {
    //                     serializeObj[this.name].push(this.value);
    //                 } else {
    //                     serializeObj[this.name] = [serializeObj[this.name], this.value];
    //                 }
    //             } else {
    //                 serializeObj[this.name] = this.value;
    //             }
    //         });
    //         return serializeObj;
    //     };
    // })(jQuery);
}

/***判断数据类型***/
export function typeOf(item) {
    let objType = Object.prototype.toString.call(item);
    objType = objType.split(' ')[1];
    return objType.substr(0, objType.length - 1).toLowerCase();
}

/***计算字符长度***/
export function getByteLength(val) {
    let len = 0;
    if (val)
        for (let i = 0; i < val.length; i++) {
            let length = val.charCodeAt(i);
            if (length >= 0 && length <= 128) {
                len += 1;
            }
            else {
                len += 2;
            }
        }
    return len;
}

/**格式化数字（每三位用逗号分隔）**/
export function formatNumberByComma(number) {
    if (!number || isNaN(number))
        return number;
    let number_arr = number.toString().split('').reverse();
    number_arr = number_arr.map((item, index) => (index + 1) % 3 === 0 ? ',' + item : item);
    return number_arr.reverse().join('');
}

/**获取地址栏参数值方法-针对鉴权URL地址(hash)**/
export function getQueryString(name, type) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"), param, r;
    param = type ? window.location.hash.split('?') : window.location.hash.split('/')
    param[1] && (r = param[1].match(reg));
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * cookie操作
 * 注意：增刪改都必須設置path的值，且增刪改操作時domain，path的值要保持一致，value为null时表示删除当前name项的cookie值
 * **/
export function cookies(name, value, options) {
    if (typeof value !== 'undefined') {// name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        let expires = '';
        if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
            let date;
            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        let path = options.path ? '; path=' + (options.path) : '';
        let domain = options.domain ? '; domain=' + (options.domain) : '';
        let secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

/***
 * 给uri追加param
 * uri:请求地址-string
 * parameters:参数对象-object
 * **/
export function addQueryString(uri, parameters) {
    let delimiter = (uri.indexOf('?') === -1) ? '?' : '&';
    for (let parameterName in parameters) {
        if (parameters.hasOwnProperty(parameterName)) {
            let parameterValue = parameters[parameterName];
            uri += delimiter + encodeURIComponent(parameterName) + '=' + encodeURIComponent(parameterValue);
            delimiter = '&';
        }
    }
    return uri;
}

/**数组去重**/
export function distinct(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}