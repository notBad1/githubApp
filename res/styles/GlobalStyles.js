/**
 * Created by Administrator on 2018-9-4.
 * 全局样式
 */

import {Dimensions} from 'react-native'
// 导出样式
const {height, width} = Dimensions.get('window');

module.exports = {
    line: {
        height: 0.5,
        opacity: 0.4,
        backgroundColor: '#000'
    },
    root_container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },

    nav_bar_height_ios: 44,
    nav_bar_height_android: 50,
    window_height: height,
    window_width: width
};