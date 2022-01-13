/**
 * Array.prototype.forEach(callback, thisArg)
 * 除了抛出异常外,无法终止或者跳出forEach()循环
 * 遍历数组
 **/
Array.prototype.myForEach = function (callback) {
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
            callback.call(thatArg, newArr[k], k, newArr);
        }
        k++;
    }
    return void 0;
}