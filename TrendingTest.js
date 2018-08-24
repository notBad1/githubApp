/**
 * Created by Administrator on 2018-8-14.
 * AsyncStorage基本使用案例
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import NavigatorBar from './js/common/navigatorBar'

import GitHubTrending from 'GitHubTrending'

// 导入第三方组件

const URL = 'https://github.com/trending/';

export default class TrendingTest extends Component {
    constructor(props) {
        super(props);
        // 创建一个GitHubTrending对象
        this.trending = new GitHubTrending();
        this.state = {
            result: ''
        }
    }

    onLoad() {
        let url = URL + this.text;
        this.trending.fetchTrending(url)
            .then((data) => {
                this.setState({
                    result: JSON.stringify(data)
                })
            }).catch((error) => {
            this.setState({
                result: JSON.stringify(error)
            })
        });
    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'GithubTrending基本使用案例'}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
            />
            <TextInput style={{height: 50, margin: 10}}
                       onChangeText={text => this.text = text}
            />
            <Text
                onPress={() => {
                    this.onLoad()
                }}
                style={styles.text}>加载数据</Text>
            <Text style={styles.text}>{this.state.result}</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 22,
        color: '#333',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
});