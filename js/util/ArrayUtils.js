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

    // 静态属性、数组克隆方法——从一个数组克隆另一个数组，两个数组的元素是相等的
    static cloneArray(array) {
        // 如果数组等于空，就返回一个新的数组
        if (!array)return [];
        // 如果不等于空，就构建一个新的数组
        let newArray = [];
        // 遍历数组
        for (let i = 0, len = array.length; i < len; i++) {
            // 初始化新的数组的元素
            newArray[i] = array[i]
        }
        // 返回新的数组
        return newArray;
    }

    // 静态属性，判断两个数组的数据是否一一对应
    //true——数组长度相等且一一对应
    static isEqual(arr1, arr2) {
        // 先判断两个数组是否为空
        if (!(arr1 && arr2)) return false;
        // 然后判断两个数组的长度是否相同
        if(arr1.length!== arr2.length) return false;
        // 如果长度相等的话，判断两个数组中的每一个元素是否相等
        for(let i=0,len=arr1.length; i<len;i++){
            if(arr1[i] !== arr2[i]) return false;
        }
        // 遍历完所有的元素后，如果都相同的话
        return true;
    }

}
