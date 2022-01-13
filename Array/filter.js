/**
 * Array.prototype.filter(callback, thisArg)
 * 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
 **/
Array.prototype.myFilter = function (callback) {
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
    let count = 0;

    for (let i = 0; i < len; i++) {
        if (i in newArr) {
            if (typeof thatArg === "undefined" && callback(newArr[i], i, newArr)) {
                resultArr[count++] = newArr[i];
            }
            if (typeof thatArg !== "undefined" && callback(thatArg, newArr[i], i, newArr)) {
                resultArr[count++] = newArr[i];
            }
        }
        resultArr.length = count;
        return resultArr;
    }
}