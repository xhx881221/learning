/**
 * Array.prototype.reduce(callback, initialValue)
 * 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值
 **/
Array.prototype.myReduce = function (callback) {
    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    let newArr = Object(this);
    let len = newArr.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    let initialValue;
    let k = 0;

    if (arguments.length >= 2) {
        initialValue = arguments[1];
    } else {
        while (k < len && !(k in newArr)) {
            k++;
        }
        if (k >= len) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        initialValue = newArr[k++];
    }

    for (let i = k; i < len; i++) {
        if (i in newArr) {
            initialValue = callback(initialValue, newArr[i], i, newArr);
        }
    }
    return initialValue;
}