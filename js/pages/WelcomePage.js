/**
 * Created by Administrator on 2018-8-10.
 * 欢迎页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import HomePage from './HomePage'

import ThemeDao from '../expand/dao/ThemeDao'

import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount () {

        new ThemeDao().getTheme().then((r)=>{
            this.theme = r
        });
        this.timer = setTimeout(()=>{
            SplashScreen.hide();
            // 跳转到首页
            this.props.navigator.resetTo({
                component: HomePage,
                params: {
                    theme : this.theme
                }
            })
        },1000)

    }

    componentWillUnmount (){
        this.timer && clearTimeout(this.timer)
    }

    render () {
        return null;
    }
}