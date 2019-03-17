import {typeOf} from "Utils/tool-utils";

/***
 * 格式化日期
 * ***/
export function formatDate(date) {
    if (!date) return;
    if (typeOf(date) === 'string' || typeOf(date) === 'number')
        date = new Date(parseInt(date.toString()));
    if (typeOf(date) === 'date') {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return `${y} - ${m} - ${d}`;
    }
}

/***
 * 格式化日期时间
 * ***/
export function formatDateTime(date) {
    if (!date) return;
    if (typeOf(date) === 'string' || typeOf(date) === 'number')
        date = new Date(parseInt(date.toString()));
    if (typeOf(date) === 'date') {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let hour = date.getHours();
        hour = hour < 10 ? ('0' + hour) : hour;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let seconds = date.getSeconds();
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return `${y} - ${m} - ${d} ${hour} : ${minute} : ${seconds}`;
    }
}