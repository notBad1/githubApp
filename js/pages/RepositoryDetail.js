/**
 * Created by Administrator on 2018-8-21.
 * 详情页
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';

import NavigatorBar from '../../js/common/navigatorBar'
import ViewUtil from '../util/ViewUtil'

export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.item.html_url;
        let title = this.props.item.full_name;
        this.state = {
            url: this.url,
            title: title, //标题
            canCoBack: false // 是否可以返回
        };
    }

    onNavigationStateChange(navState) {
        this.setState({
            canCoBack: navState.canGoBack,
            // title: navState.title
        });
    }

    onBack() {
        if(this.state.canCoBack){
            this.webView.goBack();
        }else{
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title= {this.state.title}
                    style={{
                        backgroundColor: '#2196f3'
                    }}
                    statusBar={{
                        backgroundColor: '#2196f3',
                    }}
                    leftButton={ViewUtil.getLeftButton(()=>{this.onBack()})}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}} // url
                    onNavigationStateChange={(navState) => {
                        this.onNavigationStateChange(navState)
                    }}
                    startInLoadingState={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});