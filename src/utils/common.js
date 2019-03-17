import {getByteLength, typeOf, cookies} from "./tool-utils";
import {get, post} from 'Shared/Ajax'
import ApiConfigure from 'Configure/api';

export function refreshShapeData(state, type, id) {
    let newShapeData = {}, modeler = state.bpmnModeler;
    let oldShapeData = state[type];
    if (id) {
        delete oldShapeData[id];
        return oldShapeData;
    }
    if (Object.keys(oldShapeData).length > 0 && modeler) {
        let shapeElements = modeler.get('elementRegistry');
        shapeElements.forEach(function (shape) {
            for (let elem in oldShapeData) {
                if (oldShapeData.hasOwnProperty(elem))
                    if (elem === shape.id)
                        newShapeData[elem] = oldShapeData[elem];
            }
        })
    }
    return newShapeData;
}

export const Rules = {
    required: {
        rule: (value) => {
            value = value.trim();
            return value.length > 0;
        },
        message: '内容不能为空！'
    },
    length: {
        rule: (value) => {
            value = value.trim();
            return validateCharLength(value, 3, Infinity);
        },
        message: '字符长度至少应有3位'
    },
    int: {
        rule: (value) => {
            value = value.trim();
            return !isNaN(value) && /^\d$/.test(value) && parseInt(value, 10) > 0;
        },
        message: '请输入正整数！'
    },
    double: {
        rule: (value) => {
            value = value.trim();
            return !isNaN(value) && /^\d+\.\d{1,5}|\d$/.test(value) && parseFloat(value) > 0;
        },
        message: '请输入小数或正整数！'
    },
    url: {
        rule: (value) => {
            return /^\s*https?:\/\/[^\s]+\s*$/.test(value.trim());
        },
        message: 'URL地址不合法！'
    },
    name: {
        rule: (value) => {
            return /^(?!_)[a-zA-Z_]{6,20}$/.test(value.trim());
        },
        message: '用户名以字母或字母与下划线组合的6~20位字符！'
    },
    password: {
        rule: (value) => {
            return /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)([^(0-9a-zA-Z)]|[()]|[a-zA-Z]|[0-9]){6,12}$/.test(value.trim());
        },
        message: '密码为数字、字母以及部分特殊字符的组合'
    }
};

export function isRequired(obj) {
    let attrNode = obj._AttrNode_;
    return attrNode && attrNode.minOccurs && parseInt(attrNode.minOccurs, 10) === 1;
}

/**验证字符长度**/
export function validateCharLength(value, min, max) {
    if (!value && !isNaN(min) && !isNaN(max))
        return false;
    let byteLength = getByteLength(value);
    return byteLength >= min && byteLength <= max;
}

/***验证模型图指定节点的表单，并着色***/
export function nodeAddMark(modeler, currentNodeId, errors) {
    let canvas = modeler.get('canvas'), elementRegistry = modeler.get('elementRegistry');
    if (elementRegistry.get(currentNodeId))
        if (Object.values(errors).some(error => error !== '')) {
            canvas.addMarker(currentNodeId, 'mark_error');
        } else {
            canvas.removeMarker(currentNodeId, 'mark_error');
        }
}

/**cookie中获取用户信息**/
export function getUserInfo() {
    let user_info = {};
    user_info.userId = '';
    user_info.userName = '';
    user_info.tokens = '';
    user_info.roleType = '';
    return Object.assign({}, user_info, JSON.parse(decodeURIComponent(cookies('userInfo'))));
}

/**数据去重**/
export function dataDistinct(arr) {
    let res = [];
    if (Array.isArray(arr) && arr.length > 0)
        for (let i = 0; i < arr.length; i++) {
            if (!res.includes(arr[i]) && arr[i].isCheck) {
                res.push(arr[i]);
            }
        }
    return res;
}

/**地图代理请求**/
export function fecthMapDataProxy(url, callback) {
    let output = null;
    get({
        url: '/api/spaceService/getMapResultDataFields',
        data: {
            f: 'json',
            url: ApiConfigure.proxyUrl + url
        },
        cb: result => {
            if (result) {
                output = result;
                (callback && typeOf(callback) === 'function') && callback(result);
            }
        }
    });
    return output;
}

let output = '';

/**获取或设置对象的属性值**/
export function specifyAttrValue(obj, id, value, valueKey, valueId, is_delete = false) {
    if ((typeOf(obj) !== 'object' && typeOf(obj) !== 'array') || typeOf(id) !== 'string')
        return obj;
    for (let o in obj) {
        if (obj.hasOwnProperty(o)) {
            if (obj[valueId ? valueId : 'id'] === id) {
                if (value !== undefined && arguments.length > 2) {
                    if (is_delete || value === null) {
                        delete obj[valueKey ? valueKey : 'value'];
                    } else {
                        obj[valueKey ? valueKey : 'value'] = value;
                    }
                } else {
                    if (output) output = '';
                    output = obj[valueKey ? valueKey : 'value'];
                    break;
                }
            } else {
                specifyAttrValue(obj[o], id, value, valueKey, valueId, is_delete);
            }
        }
    }
    return output;
}

/**
 * 将图片转换成base64
 * @param url 图片路径
 * @param ext 图片格式
 * @param data 图片尺寸
 * @param callback 结果回调
 */
export function getUrlBase64(url, ext, data, callback) {
    let canvas = document.createElement("canvas");   //创建canvas DOM元素
    let ctx = canvas.getContext("2d");
    data = data || {};
    let img = new Image, height = data.height || 300, width = data.width || 300;
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = function () {
        canvas.height = height; //指定画板的高度,自定义
        canvas.width = width; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, width, height); //参数可自定义
        let dataURL = canvas.toDataURL("image/" + ext);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
    };
}