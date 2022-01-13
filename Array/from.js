/**
 * 实现Array.from
 * toInteger方法: 返回一个整数
 * toLength方法: 保证len数字合法[0~Number.MAX_SAFE_INTEGER]
 * Number.MAX_SAFE_INTEGER = Math.pow(2,53) - 1
 * 判断arrayLike 为 空 抛出错误
 * mapFn非空并且不是构造函数抛出错误
 * 每次遍历arrayLike,如果mapFn存在, arr[i] = mapFn(iValue,i) 不存在的话 arr[i] = iValue
 * 判断thisArg是否存在,存在的话 arr[i] = mapFn.call(thisArg, iValue,i)
 * */
Array.myFrom = (function () {
    const toStr = Object.prototype.toString;
    const isCallable = fn => typeof fn === "function" || toStr.call(fn) === "[object Function]";

    const toInteger = value => {
        const v = Number(value);
        if (isNaN(v)) {
            return 0;
        }
        
        if (v === 0 || !isFinite(v)) {
            return v;
        }

        return (v > 0 ? 1 : -1) * Math.floor(Math.abs(v));
    }

    const maxSafeInteger = Number.MAX_SAFE_INTEGER;

    const toLength = value => {
        const len = toInteger(value);
        return Math.min(maxSafeInteger, Math.max(0, len));
    }

    return function myFrom (arrayLike) {
        const that = this;
        if (arrayLike === null) {
            throw new TypeError("Array.from requires an array-like object - not null or undefined")
        }

        const items = Object(arrayLike);
        let thisArg = "";
        const mapFn = arguments.length > 1 ? arguments[1] : void 0;
        if (typeof mapFn !== 'undefined') {
            if (!isCallable(mapFn)) {
                throw new TypeError("Array.from when provided mapFn must be a function")
            }
            if (arguments.length > 2) {
                thisArg = arguments[2];
            }
        }
        const len = toLength(items.length);
        const arr = isCallable(that) ? Object(new that(len)) : new Array(len);

        let i = 0;
        let iValue;
        while (i < len) {
            iValue = items[i];
            if (mapFn) {
                arr[i] = typeof thisArg === "undefined" ? mapFn(iValue, i) : mapFn.call(thisArg, iValue, i);
            } else {
                arr[i] = iValue;
            }
            i++;
        }
        arr.length = len;
        return arr;
    }
})()