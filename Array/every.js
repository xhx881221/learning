/**
 * Array.prototype.every(callback, thisArg)
 * 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
 **/
Array.prototype.myEvery = function (callback) {
    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    let newArr = Object(this);
    let len = newArr.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let thatArg = arguments.length >= 2 ? arguments[2] : void 0;
    let k = 0;

    while (k < len) {
        if (k in newArr) {
            let testResult = callback.call(thatArg, newArr[k], k, newArr);
            if (!testResult) {
                return false;
            }
        }
        k++;
    }
    return true;
}