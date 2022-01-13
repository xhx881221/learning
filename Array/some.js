/**
 * Array.prototype.some(callback, thisArg)
 * 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回一个布尔值。
 **/
Array.prototype.mySome = function (callback) {
    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    let newArr = Object(this);
    let len = newArr.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let thatArg = arguments.length >= 2 ? arguments[2] : void 0;

    for (let i = 0; i < len; i++) {
        if (i in newArr && callback(thatArg, newArr[i], i, newArr)) {
            return true;
        }
    }
    return false;
}