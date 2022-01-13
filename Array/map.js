/**
 * Array.prototype.map(callback, thisArg)
 * 一个由原数组每个元素执行回调函数的结果组成的新数组
 **/
Array.prototype.myMap = function (callback) {
    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    let newArr = Object(this);
    let len = newArr.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let thatArg = arguments.length >= 2 ? arguments[2] : void 0;
    let resultArr = new Array(len);
    let mappedValue;

    for (let i = 0; i < len; i++) {
        if (i in newArr) {
            mappedValue = callback.call(thatArg, newArr[i], i, newArr);
            resultArr[i] = mappedValue;
        }
    }
    return resultArr;
}