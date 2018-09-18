/**
 * Created by Administrator on 2018-8-10.
 * 接受主题改变通知 基类
 */
import React, {Component} from 'react';
import {
    DeviceEventEmitter // 事件发射器
} from 'react-native';

import {ACTION_HOME} from './HomePage'

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        }
    }
    // 在组件完成加载的时候，希望注册一个通知
    componentDidMount() {
        this.baseListenter = DeviceEventEmitter.addListener('ACTION_BASE', (action, params) => {
            this.onBaseAction(action, params);
        })
    }

    /**
     * 通知事件回调处理
     * */
    onBaseAction(action, params) {
        if (ACTION_HOME.A_THEME === action) {
            this.onThemeChange(params);
        }
    }

    // 组件卸载的时候取消监听
    componentWillUnmount() {
        // 取消监听
        this.baseListenter && this.baseListenter.remove();
    }

    /**
     * 当主题改变后更新主题
     * @param theme // 主题颜色
     */
    onThemeChange(theme) {
        if (!theme)return;
        this.setState({
            theme: theme
        })
    }
}