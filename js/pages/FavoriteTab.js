/**
 * Created by Administrator on 2018-8-13.
 * 收藏页面页签内容页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

// 导入页面组件
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from '../pages/RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../util/Utils'

const FAVORITE_KEY_PREFIX = 'favorite_';
export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.name);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            error: '',
            isLoading: false,
            favoriteKeys: [],
        };
    }

    // 更新 每一项收藏时的状态
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateSetState({
            dataSource: this.state.dataSource.cloneWithRows(projectModels),
            isLoading: false
        })
    }


    // 获取用户收藏的key集合
    getFavoriteKeys() {
        this.favoriteDao.getFavoriteKeys()
            .then((result) => {
                if (result) {
                    this.updateSetState({
                        favoriteKeys: result
                    })
                }
                this.flushFavoriteState()
            })
            .catch((error) => {
                this.flushFavoriteState()
            })
    }


    // 封装setState方法
    updateSetState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData() {
        // 加载数据的时候刷新
        this.setState({
            isLoading: true
        });
        this.favoriteDao.getAllItems()
            .then((result) => {
                this.updateSetState({
                    dataSource: this.state.dataSource.cloneWithRows(result),
                    isLoading: false
                })
            })
            .catch((e) => {
                this.updateSetState({
                    error: e,
                    isLoading: false
                })
            })
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) { // 在props改变的时候调用
        this.loadData();
    }

    onSelected(porjectModel) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                porjectModel: porjectModel,
                flag: FLAG_STORYGE.flag_popular,
                ...this.props
            }
        })
    }

    //收藏按钮的点击回调函数
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            favoriteDao.removeFavoriteItem(item.id.toString())
        }
    }

    renderRow(porjectModel) {
        let key = porjectModel.item.id ? porjectModel.item.id : porjectModel.item.fullName;
        return <RepositoryCell
            key={key}
            porjectModel={porjectModel}
            flag="popular"
            onSelected={() => {
                this.onSelected(porjectModel)
            }}
            onFavorite={(item, isFavorite) => {
                this.onFavorite(item, isFavorite)
            }}
        />
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(porjectModel) => this.renderRow(porjectModel)}
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
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    }
});