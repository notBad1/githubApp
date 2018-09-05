/**
 * Created by Administrator on 2018-8-13.
 * 获取数据模块
 * 最热模块数据获取
 */

import {
    AsyncStorage
} from 'react-native';

// 导入GitHubTrending
import GitHubTrending from 'GitHubTrending'
// 设置标识，表示是最热模块数据还是趋势模块数据
export let FLAG_STORYGE = {
    flag_popular: 'popular',
    flag_trending: 'trending',
    flag_my: 'my'
};
export default class DataRepository {
    // flag 传入模块标识 ——表示调用者必须传入标识
    constructor(flag) {
        this.flag = flag;
        // 判断一下，如果标识是trending，我们需要实例化一个GitHubTrending对象
        if (this.flag === FLAG_STORYGE.flag_trending) {
            this.trending = new GitHubTrending();
        }
    }

    // 获取数据方法
    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            // 调用本地数据
            this.fetchLocalRepository(url)
                .then((resule) => {
                    // 判断是否为空
                    if (resule) {
                        // 如果不为空
                        resolve(resule);
                    } else {
                        // 如果为空，就调用网络数据
                        this.fetchNetRepository(url)
                            .then((result) => {
                                resolve(result)
                            })
                            .catch((error) => {
                                reject(error)
                            })

                    }
                })
                .catch((error) => { //如果获取本地数据发生异常的话，就去获取网络数据
                    this.fetchNetRepository(url)
                        .then((result) => {
                            resolve(result)
                        })
                        .catch((error) => {
                            reject(error)
                        })
                })
        })
    }

    // 获取本地数据的方法
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            // 从本地数据库中读取数据
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    // 从数据库中获取的是JSON类型数据，需要转化成对象
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e); // 如果存储的JSON数据格式不正确的话,告诉给调用者
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    // 获取网络数据
    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            this.flag !== FLAG_STORYGE.flag_trending ?
                fetch(url)
                    .then(response => response.json())
                    .then(result => {  //获取网络数据的时候，如果获取成功，我们就在本地缓存一份
                        // 判断是关于页面并且数据不为空
                        if (this.flag === FLAG_STORYGE.flag_my && result) {
                            this.saveRepository(url, result);
                            resolve(result);
                        } else if (result && result.items) {
                            this.saveRepository(url, result.items);
                            resolve(result.items);
                        } else {
                            reject(new Error('获取的数据是空的'));
                        }
                    })
                    .catch(error => {
                        reject(error)
                    }) :
                this.trending.fetchTrending(url)
                    .then((result) => {
                        // 如果获取的数据为空的话，告诉调用者获取的数据是空的
                        if (!result) {
                            reject(new Error('获取的数据是空的'));
                            return;
                        }
                        // 从网络上获取的数据，取出数组
                        resolve(result);
                        // 将数据保存到数组
                        this.saveRepository(url, result);
                    })
                    .catch((error) => {
                        reject(error)
                    });
        })
    }

    // 将网络数据保存到本地数据库
    // callBack 可选择，
    saveRepository(url, data, callBack) {
        if (!url || !data)return;// 如果url为空，或者data为空，就不保存
        // 包装数据
        let wrapData;
        if (this.flag === FLAG_STORYGE.flag_my) {
            wrapData = {
                item: data, // 数据
                update_date: new Date().getTime()//更新日期，获取当天时间
            };
        } else {
            wrapData = {
                items: data, // 数据
                update_date: new Date().getTime()//更新日期，获取当天时间
            };
        }
        // 将数据保存到数据库中，将数据序列化
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack)
    }

    // 判断数据是否过时 参数是本地数据的时间
    checkDate(time) {
        // 取出当前的日期
        let now = new Date();
        // 获取数据库保存的日期
        let t = new Date();
        t.setTime(time);
        // 对比日期相差多久
        if (now.getMonth() !== t.getMonth())return false; //如果两个日期的月份不相同，说明过期了
        if (now.getDay() !== t.getDay())return false; //如果两个日期的天不相同，说明过期了
        if (now.getHours() - t.getHours() > 4)return false; //设置数据过时的时间为4个小时
        return true; // 如果上述条件都满足，说明数据没有过时
    }
}