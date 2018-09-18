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

import BaseComponent from './BaseComponent'
import NavigatorBar from '../../js/common/navigatorBar'
import ViewUtil from '../util/ViewUtil'
import ArrayUtils from '../util/ArrayUtils'
import FavoriteDao from '../../js/expand/dao/FavoriteDao'

const TRENDING_URL = 'https://github.com';

export default class RepositoryDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.url = this.props.projectModel.item.html_url ? this.props.projectModel.item.html_url : TRENDING_URL + this.props.projectModel.item.url;
        let title = this.props.projectModel.item.full_name ? this.props.projectModel.item.full_name : this.props.projectModel.item.fullName;
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.unFavorite = [];
        this.state = {
            url: this.url,
            title: title, //标题
            canCoBack: false, // 是否可以返回
            isFavorite: this.props.projectModel.isFavorite, //是否收藏
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png'),
            theme: this.props.theme
        };
    }

    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite, //是否收藏
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
        })
    }

    onPressfavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        let projectModel = this.props.projectModel;
        let key = projectModel.item.id ? projectModel.item.id.toString() : projectModel.item.fullName.toString();
        if (!this.state.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key)
        }
        // 将用户是否操作的项目
        ArrayUtils.updateArray(projectModel.item, this.unFavorite);
        if (this.unFavorite.length > 0) {
            if (this.props.flag === 'popular') {
                DeviceEventEmitter.emit('favoriteChange_popular')
            } else {
                DeviceEventEmitter.emit('favoriteChange_trending')
            }
        }
    }

    onBack() {
        if (this.state.canCoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canCoBack: navState.canGoBack,
        });
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
                        backgroundColor: this.state.theme.themeColor
                    }}
                    statusBar={{
                        backgroundColor: this.state.theme.themeColor,
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