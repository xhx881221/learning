const PENDING = "pending";
const FULFILLED = "fuldilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(executor) {
        this._status = PENDING;
        //储存then回调return的值
        this._value = undefined;
        this._resolveQueue = [];
        this._rejectQueue = [];

        let _resolve = (val) => {
            //将resolve执行的回调封装进一个函数，放进setTimeout里，以兼容executor是同步代码的情况
            const run = () => {
                //状态只能变更一次
                if (this._status !== PENDING) {
                    return;
                }
                //状态变更
                this._status = FULFILLED;
                //储存当前的value
                this._value = val;
                while(this._resolveQueue.length) {
                    const callback = this._resolveQueue.shift();
                    callback(val);
                }
            }
            setTimeout(run);
        }

        let _reject = (val) => {
            const run = () => {
                if (this._status !== PENDING) {
                    return;
                }
                //状态变更
                this._status = REJECTED;
                this._value = val;
                while(this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift();
                    callback(val);
                }
            }
            setTimeout(run);
        }

        executor(_resolve, _reject);
    }

    then(resolveFn, rejectFn) {
        //如果then的第一个参数不是function, 则忽略，所以此处直接返回参数
        typeof resolveFn !== 'function' ? resolveFn = value => value : null;
        typeof rejectFn !== 'function' ? rejectFn = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;

        //需要返回一个新的Promise
        return new MyPromise((resolve, reject) => {
            const fuldilledFn = value => {
                try {
                    //执行第一个promise的成功回调，并获取返回值
                    let x = resolveFn(value);
                    //根据返回值类型进行处理，如果是promise则等待状态变更，否则resolve
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error);
                }
            }

            const rejectedFn = error => {
                try {
                    //执行第一个promise的成功回调，并获取返回值
                    let x = rejectFn(error);
                    //根据返回值类型进行处理，如果是promise则等待状态变更，否则resolve
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error);
                }
            }

            switch (this._status) {
                //当状态为pending时，放入队列，等待执行。
                case PENDING:
                    this._resolveQueue.push(resolveFn);
                    this._rejectQueue.push(rejectFn);
                    break;
                //当状态为resolve或 reject，执行回调
                case FULFILLED:
                    fuldilledFn(this._value);
                    break;
                case REJECTED:
                    rejectedFn(this._value);
                    break;
            }
        })
    }

    catch(rejectFn) {
        return this.then(undefined, rejectFn);
    }

    finally(callback) {
        return this.then(
            value => MyPromise.resolve(callback()).then(() => value),
            reason => MyPromise.resolve(callback()).then(() => { throw reason })
        )
    }

    static resolve(value) {
        //如果参数是Promise实例，则直接返回实例
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }

    static all(promiseArr) {
        let index = 0;
        let results = [];
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((p, i) => {
                //Promise.resolve(p)用于处理传入值不为Promise的情况
                MyPromise.resolve(p).then(
                    val => {
                        index++;
                        results[i] = val;
                        if (index === promiseArr.length) {
                            resolve(results);
                        }
                    },
                    err => {
                        reject(err);
                    }
                )
            })
        })
    }

    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            for (let p of promiseArr) {
                MyPromise.resolve(p).then(
                    value => {
                        resolve(value);
                    },
                    err => {
                        reject(err);
                    }
                )
            }
        })
    }
}

const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 500);
})
p1.then(res => {
    console.log(res);
    return 2;
}).then(res => {
    console.log(res);
    return 3;
}).then(res => {
    console.log(res)
})