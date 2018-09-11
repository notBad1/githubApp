/**
 * Created by Administrator on 2018-9-11.
 * 搜索页面
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    ListView,
    RefreshControl
} from 'react-native';

import Utils from '../util/Utils'
import ViewUtil from '../util/ViewUtil'
import GlobalStyles from '../../res/styles/GlobalStyles'
import {FLAG_STORYGE} from '../expand/dao/DataRepository'
import ProjectModel from '../model/ProjectModel'
import ActionUtils from '../util/ActionUtils'
import RepositoryCell from '../common/RepositoryCell'

// 导入第三方组件
import Toast from 'react-native-easy-toast'
import FavoriteDao from '../expand/dao/FavoriteDao'

const API_URL = 'https://api.github.com/search/repositories?q=';
let favoriteDao = new FavoriteDao(FLAG_STORYGE.flag_popular);

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightButText: '搜索',
            isLoading: false,
            favoriteKeys: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
    }

    // 更新 每一项收藏时的状态
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            rightButText: '搜索',
            dataSource: this.state.dataSource.cloneWithRows(projectModels),
            isLoading: false
        })
    }

    // 获取用户收藏的key集合
    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys()
            .then((result) => {
                if (result) {
                    this.updateState({
                        favoriteKeys: result
                    })
                }
                this.flushFavoriteState()
            })
            .catch((error) => {
                this.flushFavoriteState()
            })
    }

    updateState(dic) {
        this.setState(dic)
    }

    loadData() { //加载数据
        this.updateState({
            isLoading: true
        });
        let url = API_URL + this.text;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                if (!this || !result || !result.items || result.items.length === 0) {
                    this.toast.show(this.text + '没有获取到数据', DURATION.LENGTH_SHORT);
                    this.updateState({
                        isLoading: false,
                        rightButText: '搜索'
                    });
                    return;
                }
                this.items = result.items;
                this.getFavoriteKeys();
            })
            .catch((e) => {
                this.toast.show('获取数据出错');
                this.updateState({
                    isLoading: false,
                    rightButText: '搜索'
                });
            })
    }

    onRightButClick() {
        if (this.state.rightButText === '搜索') {
            this.updateState({
                rightButText: '取消'
            });
            this.loadData();
        } else {
            this.updateState({
                rightButText: '搜索',
                isLoading: false
            })
        }

    }

    renderNavBar() {
        let backBut = ViewUtil.getLeftButton(() => {
            this.refs.input.blur();// 隐藏键盘
            this.props.navigator.pop();
        });
        let inputText = <TextInput ref="input" style={styles.textInput} underlineColorAndroid="transparent"
                                   onChangeText={text => this.text = text}/>;
        let rightBut = ViewUtil.getRightButton(this.state.rightButText, () => {
            this.refs.input.blur();// 隐藏键盘
            this.onRightButClick()
        });
        return <View style={styles.navBar}>
            {backBut}
            {inputText}
            {rightBut}
        </View>
    }

    renderRow(projectModel) {
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            flag="popular"
            onSelected={() => {
                ActionUtils.onSelected({
                    projectModel: projectModel,
                    flag: FLAG_STORYGE.flag_popular,
                    ...this.props
                })
            }}
            onFavorite={(item, isFavorite) => {
                ActionUtils.onFavorite(item, isFavorite, favoriteDao)
            }}
        />
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, {backgroundColor: '#2196f3'}]}/>;
        }
        return <View style={styles.container}>
            {statusBar}
            {this.renderNavBar()}
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => this.renderRow(data)}
                // 下拉刷新组件
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}// 刷新状态
                        // 监听下拉状态 用户下拉刷新的时候获取数据
                        onRefresh={() => this.loadData()}
                        // 指示器颜色
                        colors={['#2196f3']} //android
                        tintColor={["#2196f3"]} //ios
                        // 标题 ios
                        title={'loading...'}
                    />
                }
            />
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        height: 20
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2196f3',
        height: Platform.OS === 'ios' ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android
    },
    textInput: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 40,
        borderColor: '#f9f9f9',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        paddingLeft: 8,
        marginLeft: 10,
        marginRight: 10,
        color: '#fff'
    }

});