/**
 * Created by Administrator on 2018-8-20.
 * webView简单使用
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import NavigatorBar from './js/common/navigatorBar'

const URL = 'https://www.imooc.com' // 页面进入默认显示的URL

export default class WebViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            title: '', //标题
            canCoBack: false // 是否可以返回
        };
    }

    onNavigationStateChange(navState) {
        this.setState({
            canCoBack: navState.canGoBack,
            title: navState.title
        });
    }

    go() {
        this.setState({
            url: this.text
        })
    }

    onGoBack() {
        if(this.state.canCoBack){
            this.webView.goBack();
        }else{
            DeviceEventEmitter.emit('showToast','已经是第一页')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title='WebView简单使用'
                    style={{
                        backgroundColor: '#2196f3'
                    }}
                    statusBar={{
                        backgroundColor: '#2196f3',
                    }}
                />
                <View style={styles.row}>
                    <Text style={styles.tips} onPress={() => {
                        this.onGoBack()
                    }}>返回</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={URL}
                        onChangeText={(text) => {
                            this.text = text
                        }}
                    />
                    <Text style={styles.tips}
                          onPress={() => {
                              this.go()
                          }}>前往</Text>
                </View>
                <WebView
                    ref={webView => this.webView = webView}
                    style={styles.webView}
                    source={{uri: this.state.url}} // url
                    onNavigationStateChange={(navState) => {
                        this.onNavigationStateChange(navState)
                    }}
                />
                <Toast ref={toast => {
                    this.toast = toast
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tips: {
        fontSize: 22,
        color: '#333'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    input: {
        height: 50,
        flex: 1,
        borderWidth: 1,
        borderColor: '#aaa',
        marginHorizontal: 15,
        fontSize: 20,
        color: '#333'
    }
});