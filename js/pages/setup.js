/**
 * Created by Administrator on 2018-8-10.
 * 相关组件及服务初始化
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

// 导入页面
import WelcomePage from './WelcomePage'

function setup() {
    // 进行一些初始配置
    // 创建根组件
    class Root extends Component {
        renderScene(route, navigator) {
            // 取出组件
            let Component = route.component;
            // 返回组件 navigator传给组件，还有其他属性
            return <Component navigator={navigator} {...route.params}/>
        }

        render() {
            // 返回路由
            return <Navigator
                // 初始化路由
                initialRoute={{component: WelcomePage}}
                // 回调函数
                renderScene={(route, navigator) => this.renderScene(route, navigator)}
            />
        }
    }
    // 返回根组件
    return <Root/>
}

// 导出setup函数
module.exports = setup;