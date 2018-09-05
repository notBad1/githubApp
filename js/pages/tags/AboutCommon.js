/**
 * Created by Administrator on 2018-9-4.
 * 关于页面和关于作者页面公用的组件
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtil from '../../util/ViewUtil'
import Utils from '../../util/Utils'
import FavoriteDao from '../../expand/dao/FavoriteDao'
import {FLAG_STORYGE} from '../../expand/dao/DataRepository'
import RepositoryUtils from '../../expand/dao/RepositoryUtils'

import RepositoryCell from '../../common/RepositoryCell'
import RepositoryDetail from '../RepositoryDetail'

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

//标识，关于页面或者关于作者页面
export let FLAG_ABOUT = {
    flag_about: 'about',
    flag_about_me: 'about_me'
};

export default class AboutCommon {
    constructor(props, updateState, flag_about, config) {
        this.props = props;
        this.updateState = updateState;
        this.flag_about = flag_about;
        this.config = config;
        this.repository = [];
        this.favoriteDao = new FavoriteDao(FLAG_STORYGE.flag_popular);
        this.favoriteKeys = null;
        this.repositoryUtils = new RepositoryUtils(this);
    }

    /**
     * 通知数据发生改变
     * @param items 改变之后的数据
     */
    onNotifyDataChange(items) {
        this.updateFavorite(items);
    }

    /**
     * 更新项目的用户收藏状态
     * @param repository
     * async await ES6 方法， 同步调用
     */
    async updateFavorite(repository) {
        if (repository) {
            this.repository = repository;
        }
        if (!this.repository) return;
        if (!this.favoriteKeys) {
            // 从数据库中加载用户所收藏项目的所有的key
            this.favoriteKeys = await this.favoriteDao.getFavoriteKeys()
        }
        // 创建一个pojectModels数组
        let projectModels = [];
        for (let i = 0, l = this.repository.length; i < l; i++) {
            let data = this.repository[i];
            data = data.item ? data.item : data;
            projectModels.push(
                {
                    item: data,
                    isFavorite: Utils.checkFavorite(data, this.favoriteKeys ? this.favoriteKeys : [])
                }
            );
        }
        this.updateState({
            projectModels: projectModels
        })
    }

    onSelected(projectModel) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                projectModel: projectModel,
                flag: FLAG_STORYGE.flag_popular,
                ...this.props
            }
        })
    }

    componentDidMount() {
        if (this.flag_about === FLAG_ABOUT.flag_about) {
            this.repositoryUtils.fetchRepository(this.config.info.currentRepoUrl)
        } else {
            let urls = [];
            let items = this.config.items;
            for (let i = 0, l = items.length; i < l; i++) {
                urls.push(this.config.info.url + items[i])
            }
            this.repositoryUtils.fetchRepositories(urls)
        }
    }

    //收藏按钮的点击回调函数
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            this.favoriteDao.removeFavoriteItem(item.id.toString())
        }
    }


    /**
     * 创建项目视图
     * @param projectModels
     * @returns {*}
     */
    renderRepository(projectModels) {
        if (!projectModels || projectModels.length === 0)return null;
        let views = [];
        for (let i = 0, l = projectModels.length; i < l; i++) {
            let projectModel = projectModels[i];
            views.push(
                <RepositoryCell
                    key={projectModel.item.id}
                    projectModel={projectModel}
                    flag="popular"
                    onSelected={() => {
                        this.onSelected(projectModel)
                    }}
                    onFavorite={(item, isFavorite) => {
                        this.onFavorite(item, isFavorite)
                    }}
                />
            )
        }
        return views;
    }

    getParallaxRenderConfig(params) {
        let config = {};
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImage,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );

        config.renderForeground = () => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={{
                    uri: params.avator,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={ styles.sectionSpeakerText }>
                    {params.name}
                </Text>
                <Text style={ styles.sectionTitleText }>
                    {params.description}
                </Text>
            </View>
        );

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftButton(() => this.props.navigator.pop())}
            </View>
        );

        return config;
    }

    render(contentView, params) {
        let renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                backgroundColor="#2196f3"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}
                {...renderConfig}
            >
                {contentView}
            </ParallaxScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        justifyContent: 'center',
        paddingRight: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5,
        paddingHorizontal: 5
    },
});
