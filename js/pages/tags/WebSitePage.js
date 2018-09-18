/**
 * Created by Administrator on 2018-8-20.
 * webSite页面
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
} from 'react-native';

import NavigatorBar from '../../../js/common/navigatorBar'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ViewUtil from '../../util/ViewUtil'

export default class WebSitePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: this.props.title, //标题
            canCoBack: false, // 是否可以返回
            theme: this.props.theme
        };
    }

    onNavigationStateChange(navState) {
        this.setState({
            canCoBack: navState.canGoBack,
        });
    }

    onGoBack() {
        if (this.state.canCoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigatorBar
                    title={this.state.title}
                    style={{
                        backgroundColor: this.state.theme.themeColor
                    }}
                    statusBar={{
                        backgroundColor: this.state.theme.themeColor,
                    }}
                    leftButton={ViewUtil.getLeftButton(() => this.onGoBack())}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}} // url
                    onNavigationStateChange={(navState) => {
                        this.onNavigationStateChange(navState)
                    }}
                />
            </View>
        )
    }
}
