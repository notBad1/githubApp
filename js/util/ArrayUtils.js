/**
 * Created by Administrator on 2018-8-14.
 * 封装更新数组方法
 */
// import React from 'react';
// import {
//     Image,
//     TouchableOpacity
// } from 'react-native';

export default class ArrayUtils {
    // 静态属性——更新数组，如果item已存在，就将它从数组中移除，否则就添加到数组中
    static updateArray(item, array) {
        // 遍历数组
        for (let i = 0, len = array.length; i < len; i++) {
            let temp = array[i];//  取出数组元素
            if (item === temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item)
    }
}