/**
 * Created by Administrator on 2018-8-21.
 * 详情页
 * 功能扩展、支持收藏和取消收藏项目功能
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    WebView,
    StyleSheet,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import NavigatorBar from '../../js/common/navigatorBar'
import ViewUtil from '../util/ViewUtil'
import FavoriteDao from '../../js/expand/dao/FavoriteDao'

const TRENDING_URL = 'https://github.com';

export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.porjectModel.item.html_url ? this.props.porjectModel.item.html_url : TRENDING_URL + this.props.porjectModel.item.url;
        let title = this.props.porjectModel.item.full_name ? this.props.porjectModel.item.full_name : this.props.porjectModel.item.fullName;
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.state = {
            url: this.url,
            title: title, //标题
            canCoBack: false, // 是否可以返回
            isFavorite: this.props.porjectModel.isFavorite, //是否收藏
            favoriteIcon: this.props.porjectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
        };
    }

    onNavigationStateChange(navState) {
        this.setState({
            canCoBack: navState.canGoBack,
            // title: navState.title
        });
    }

    onBack() {
        if (this.state.canCoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }


    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite, //是否收藏
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.porjectModel.isFavorite);
    }

    onPressfavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        let porjectModel = this.props.porjectModel;
        let key = porjectModel.item.id ? porjectModel.item.id.toString() : porjectModel.item.fullName.toString();
        if (!this.state.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(porjectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key)
        }
    }

    renderRightButton() {
        return <TouchableOpacity
            onPress={() => {
                this.onPressfavorite()
            }}
        >
            <Image style={{height: 22, width: 22, marginHorizontal: 10}}
                   source={this.state.favoriteIcon}/>
        </TouchableOpacity>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={this.state.title}
                    style={{
                        backgroundColor: '#2196f3'
                    }}
                    statusBar={{
                        backgroundColor: '#2196f3',
                    }}
                    leftButton={ViewUtil.getLeftButton(() => {
                        this.onBack()
                    })}
                    rightButton={this.renderRightButton()}
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