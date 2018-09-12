/**
 * Created by Administrator on 2018-9-12.
 * 取消异步操作功能
 */

/**
 * Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject
 * resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），
 * 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
 * reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
 * 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
 * Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
 */


/**
 * 取消异步操作方法
 * @param promise  Promise对象
 */
export default function makeCancleable(promise) {
    let hasCanceled_ = false; //用于标识用户是否取消操作
    const wrappedPromise = new Promise((resolve, reject) => {
        // Promise对象的then方法的作用是为Promise对象添加状态改变时的回调函数
        // then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数
        promise.then((val) => {
            // 判断用户是否取消操作
            hasCanceled_ ? reject({hasCanceled_: true}) : resolve(val)
        });
        promise.catch((e) => {
            // 判断用户是否取消操作
            hasCanceled_ ? reject({hasCanceled_: true}) : resolve(e)
        })
    });

    return {
        promise: wrappedPromise,
        cancel(){
            hasCanceled_ = true
        }
    }
}