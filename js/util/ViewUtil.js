/**
 * Created by Administrator on 2018-8-14.
 * 封装返回按钮方法
 */
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class ViewUtil {
    // 导航栏左侧返回菜单
    static getLeftButton(callback) {
        return <TouchableOpacity style={{padding: 8}}
                                 onPress={callback}
        >
            <Image style={{width: 26, height: 26, tintColor: '#fff'}}
                   source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableOpacity>
    }

    // 导航栏右侧菜单
    static getRightButton(text,callback) {
        return <TouchableOpacity style={{padding: 8}}
                                 onPress={callback}
        >
            <View>
                <Text style={{fontSize: 18, color: '#fff'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    }
}