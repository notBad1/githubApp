/**
 * Created by Administrator on 2018-8-14.
 * 封装返回按钮方法
 */
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
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
    static getRightButton(text, callback) {
        return <TouchableOpacity style={{padding: 8}}
                                 onPress={callback}
        >
            <View>
                <Text style={{fontSize: 18, color: '#fff'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    }

    /**
     * 导出我的页面中功能列表 Item
     * @param callback  点击item回调函数
     * @param icon 左侧图标
     * @param text 文本
     * @param tintStyle 图标颜色
     * @param expandableIcon 右侧图标
     * @returns {XML}
     */
    static getSetingItem(callback, icon, text, tintStyle, expandableIcon) {
        return <TouchableHighlight
            onPress={callback}
        >
            <View style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={icon}
                           style={[{width: 26, height: 26, marginRight: 10}, {tintColor: tintStyle}]}
                    />
                    <Text style={styles.text}>{text}</Text>
                </View>
                <Image source={expandableIcon ? expandableIcon : require('../../res/images/ic_tiaozhuan.png')}
                       style={[{width: 30, height: 30}, {tintColor: tintStyle}]}
                />
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    text: {
        color: '#333',
        fontSize: 16
    }
});
