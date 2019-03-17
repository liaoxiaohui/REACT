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

/**
 * get r g b from hex code
 *
 * @param {string} hex
 * @returns {array} array of r g bs
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return [r, g, b];
}

function PadNum(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * get hex from r g b
 *
 * @param {array} rgb
 * @returns {string} hex string
 */
export function rgbToHex([r, g, b]) {
  return `#${[r, g, b].map(n => PadNum(n)).join('')}`.toUpperCase();
}

/**
 * RGB颜色转换为16进制格式的字符串
 * str:rgb格式的颜色字符串（rgb(x,x,x)）-string
 * **/
export function colorHex(str) {
    // 十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (/^(rgb|RGB)/.test(str)) {
        let aColor = str.replace(/(?:||rgb|RGB)*/ig, '').split(',')
        let strHex = '#'
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16)
            if (hex === '0') {
                hex += hex
            }
            strHex += hex
        }
        if (strHex.length !== 7) {
            strHex = str
        }
        return strHex
    } else if (reg.test(str)) {
        let aNum = str.replace(/#/, '').split('')
        if (aNum.length === 6) {
            return str
        } else if (aNum.length === 3) {
            let numHex = '#';
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i])
            }
            return numHex
        }
    } else {
        return str
    }
}

/**
 * 将十六进制的颜色值转化为rgba格式
 * str:十六进制的颜色值（#xxxxxx）-string
 * opacity:透明度-number
 * **/
export function colorRgb(str, opacity) {
    // 十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    let sColor = str.toLowerCase()
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 10))
        }
        return opacity >= 0 && opacity < 1 ? 'rgba(' + sColorChange.join(',') + ',' + opacity + ')' : 'rgb(' + sColorChange.join(',') + ')'
    } else {
        return sColor
    }
}

/*
 *  Returns true if the hex color passed as an input is valid
 *  input -> hex (#FF00FF)
 *  output -> true
 *
 * @return a boolean
 */
export function isValidHex(hex) {
    if (typeOf(hex) !== 'string') return false;
    return !!hex.match(/(^#?[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i);
}

export function isValidRgbRgba(rgb) {
    if (typeOf(rgb) !== 'string') return false;
    const regex = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?(0+|0(?!=\.)\.\d+|1)?\)$/i;
    let arr = rgb.replace(regex, '$1,$2,$3,$4').split(',');
    const a = arr.splice(3)[0];
    return !!rgb.match(regex) && arr.every((item) => item >= 0 && item <= 255) && (a >= 0 && a <= 1);
}

export function isValidRgb(rgb) {
    if (typeOf(rgb) !== 'string') return false;
    const regex = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i;
    let arr = rgb.replace(regex, '$1,$2,$3').split(',');
    return !!rgb.match(regex) && arr.every((item) => item >= 0 && item <= 255);
}

export function isValidRgba(rgb) {
    if (typeOf(rgb) !== 'string') return false;
    const regex = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(0+|0(?!=\.)\.\d+|1)\)$/i;
    let arr = rgb.replace(regex, '$1,$2,$3,$4').split(',');
    const a = arr.splice(3)[0];
    return !!rgb.match(regex) && arr.every((item) => item >= 0 && item <= 255) && (a >= 0 && a <= 1);
}

export function isValidRgbOrRgba(rgb) {
    if (isValidRgb(rgb)) {
        return true;
    } else {
        return isValidRgba(rgb);
    }
}

/*
 *  Transforms an hex color into its RGB representation
 *  input ->  hex (#FF00FF)
 *  output ->  { r: 255, g: 0, b: 255 }
 *
 * @return a hash
 */
export function hexToRGB(hex) {
    if (!hex) {
        hex = '#FFFFFF';
    }

    let shortRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shortRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/*
 *  Transforms an hex color an a opacity value to a rgba string
 *  input ->  hex (#FF00FF) and opacity (0.4)
 *  output -> 'rgba(255,0,255,0.4)'
 *
 * @return a string
 */
export function hexToRGBA(hex, opacity) {
    function roundToTwo(num) {
        return +(Math.round(num + 'e+2') + 'e-2');
    }

    let rgb = hexToRGB(hex);
    opacity = opacity != null ? roundToTwo(opacity) : 1;
    if (rgb) {
        return 'rgba(' + [rgb.r, rgb.g, rgb.b, opacity].join(', ') + ')';
    } else {
        return hex;
    }
}

/**
 * 将{r:r,g:g,b:b,a:a}的对象转化为RGBA颜色值
 * **/
export function objToRGBA(obj) {
    const result = 'rgba(0,0,0,1)';
    if (!(typeOf(obj) === 'object' && Object.keys(obj).length === 4)
        || !(!isNaN(obj.r) && !isNaN(obj.g) && !isNaN(obj.b) && !isNaN(obj.a)))
        return result;
    return 'rgba(' + obj.r + ',' + obj.g + ',' + obj.b + ',' + obj.a + ')';
}

/**
 * 将{r:r,g:g,b:b,a:a}的对象转化为RGBA数组[r,g,b,a]，其中a的范围[0,255]=>[0,1]
 * **/
export function rgbaObjToArr(obj) {
    const result = [0, 0, 0, 255];
    let values = Object.values(obj);
    if (!(typeOf(obj) === 'object' && values.length === 4)
        || !(!isNaN(obj.r) && !isNaN(obj.g) && !isNaN(obj.b) && !isNaN(obj.a))
        || !values.slice(0, 3).every((val) => val >= 0 && val <= 255)
        || !(values[3] >= 0 && values[3] <= 1))
        return result;
    return values.map((val, index) => index < 3 ? val : val * 255);
}

/**
 * 将RGBA数组[r,g,b,a]的转化为对象{r:r,g:g,b:b,a:a}，其中a的范围[0,1]
 * **/
export function rgbaArrToObj(arr) {
    const result = {r: 0, g: 0, b: 0, a: 1};
    if (!arr || typeOf(arr) !== 'array' || arr.length !== 4)
        return result;
    result.r = arr[0];
    result.g = arr[1];
    result.b = arr[2];
    result.a = arr[3];
    return result;
}

/**
 * 将rgba/hex格式的颜色值转化为对象
 * **/
export function hexOrRgbToObj(str) {
    if (typeOf(str) !== 'string' || (!isValidHex(str) && !isValidRgbOrRgba(str)))
        return str;
    let obj = {};
    if (isValidHex(str)) {
        str = hexToRGBA(str);
    } else if (isValidRgb(str)) {
        let arr = str.split('');
        arr.splice(arr.length - 1, 0, ',1');
        arr.splice(arr.indexOf('('), 0, 'a');
        str = arr.join('');
    }
    const arrVal = str.substring(5, str.indexOf(')')).split(',');
    obj.r = +arrVal[0];
    obj.g = +arrVal[1];
    obj.b = +arrVal[2];
    obj.a = +arrVal[3];
    return obj;
}

/***判断数据类型***/
export function typeOf(item) {
    let objType = Object.prototype.toString.call(item);
    objType = objType.split(' ')[1];
    return objType.substr(0, objType.length - 1).toLowerCase();
}