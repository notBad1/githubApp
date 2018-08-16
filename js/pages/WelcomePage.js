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

export default class WelcomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount () {
        this.timer = setTimeout(()=>{
            // 跳转到首页
            this.props.navigator.resetTo({
                component: HomePage
            })
        },2000)
    }

    componentWillUnmount (){
        this.timer && clearTimeout(this.timer)
    }

    render () {
        return <View style={styles.container}>
            <Text style={styles.text}>欢迎</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 26,
        color: '#333'
    }
});