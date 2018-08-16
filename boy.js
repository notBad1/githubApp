/**
 * Created by Administrator on 2018-8-9.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

// 引入页面组件
import Girl from './girl'
import NavigatorBar from './js/common/navigatorBar'
import ListViewTest from './ListViewTest'
import FeachTest from './FeachTest'

export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<NavigatorBar*/}
                    {/*title= {'Boy'}*/}
                    {/*style={{*/}
                        {/*backgroundColor: '#f00'*/}
                    {/*}}*/}
                    {/*statusBar={{*/}
                        {/*backgroundColor: '#f00',*/}
                    {/*}}*/}
                {/*/>*/}
                {/*<Text style={styles.text}>I am Boy</Text>*/}
                {/*<Text style={styles.text}*/}
                      {/*onPress={() => {*/}
                          {/*// 显示另一个页面*/}
                          {/*this.props.navigator.push({*/}
                              {/*component: Girl,*/}
                              {/*params: { //给另一个页面传参数*/}
                                  {/*word: '一枝玫瑰',*/}
                                  {/*// 回调方法 另一个页面传回的参数*/}
                                  {/*onCallBack: (word) => {*/}
                                      {/*this.setState ({*/}
                                          {/*word: word*/}
                                      {/*})*/}
                                  {/*}*/}
                              {/*}*/}
                          {/*})*/}
                      {/*}}*/}
                {/*>*/}
                    {/*送女孩一支玫瑰*/}
                {/*</Text>*/}
                {/*<Text style={styles.text}>我收到女孩送的:{this.state.word}</Text>*/}
                {/*<ListViewTest />*/}
                <FeachTest />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        color: '#333'
    }
});
