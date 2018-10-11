/**
 * Created by zhaolu on 2018-9-29.
 * 监听安卓手机返回键组件
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    BackAndroid
} from 'react-native';

export default class BackPressComponent extends Component {
    constructor(porps) {
        super(porps);
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);

    }

    onHardwareBackPress(e) {
        // 监听回调函数
        return this.props.backPress(e);
    }

    componentDidMount() {
        if(this.props.backPress){
            // 注册监听
            BackAndroid.addEventListener('hardwareBackPress', this._hardwareBackPress)
        }
    }
    componentWillUnmount(){
        if(this.props.backPress){
            // 移除监听
            BackAndroid.removeEventListener('hardwareBackPress', this._hardwareBackPress)
        }
    }

}