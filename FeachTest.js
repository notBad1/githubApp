/**
 * Created by Administrator on 2018-8-10.
 */
/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl
} from 'react-native';

import NavigatorBar from './js/common/navigatorBar'
import HttpUtils from './js/common/HttpUtils'

export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        };
    }

    onLoad(url) {
        // 通过get请求获取数据
        // fetch(url)
        //     .then((response) => response.json()) // 解析json
        //     .then((result) => {    //获取解析出的json数据
        //         this.setState({
        //             result: JSON.stringify(result)
        //         })
        //     })
        //     .catch((error) => { //发生异常
        //         this.setState({
        //             result: JSON.stringify(error)
        //         })
        //     });
        HttpUtils.get(url)
            .then((result) => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch((error) => { //发生异常
                this.setState({
                    result: JSON.stringify(error)
                })
            });
    }

    onSubmit(url, data) {
        // 通过POST提交
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json', // 返回数据类型
        //         'Content-Type': 'application/json', //请求头
        //     },
        //     // 提交数据 ——对象序列化
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => response.json()) // 解析json
        //     .then((result) => {    //获取解析出的json数据
        //         this.setState({
        //             result: JSON.stringify(result)
        //         })
        //     })
        //     .catch((error) => { //发生异常
        //         this.setState({
        //             result: JSON.stringify(error)
        //         })
        //     });

        HttpUtils.post(url, data)
            .then((result) => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch((error) => { //发生异常
                this.setState({
                    result: JSON.stringify(error)
                })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title='FeachTest'
                    style={{
                        backgroundColor: '#ee6363'
                    }}
                    statusBar={{
                        backgroundColor: '#ee6363',
                    }}
                />
                <Text style={styles.text}
                      onPress={() => this.onLoad('http://rapapi.org/mockjsdata/36094/test1')}
                >
                    获取数据
                </Text>
                <Text style={styles.text}
                      onPress={() => this.onSubmit('http://rapapi.org/mockjsdata/36094/submit', {
                          userName: '小明',
                          passWord: '123'
                      })}
                >提交数据</Text>
                <Text style={styles.text}>请求结果：{this.state.result}</Text>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        text: {
            fontSize: 20,
            color: '#333'
        }
    });