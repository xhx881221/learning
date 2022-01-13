/**
 * Array.prototype.find(callback, thisArg)
 * 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
 **/
Array.prototype.myFind = function (callback) {
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
        if (i in newArr && callback.call(thatArg, newArr[i], i, newArr)) {
            return newArr[i];
        }
    }
    return void 0;
}