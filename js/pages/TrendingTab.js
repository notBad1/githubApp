/**
 * Created by Administrator on 2018-8-13.
 * 页签内容页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';

// 导入页面组件
import DataRepository, {FLAG_STORYGE} from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from '../pages/RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../util/Utils'


// URL拼接
const URL = 'https://github.com/trending/';

let favoriteDao = new FavoriteDao(FLAG_STORYGE.flag_trending);

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            error: '',
            isLoading: false,
            favoriteKeys: []
        };
        // 初始化
        this.dataRepository = new DataRepository(FLAG_STORYGE.flag_trending);
    }

    getFetchUrl(timeSpan, key) {
        return URL + key + '?since=' + timeSpan.searchText
    }

    // 更新 每一项收藏时的状态
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys, FLAG_STORYGE.flag_trending)));
        }
        this.updateSetState({
            dataSource: this.state.dataSource.cloneWithRows(projectModels),
            isLoading: false
        })
    }

    // 获取用户收藏的key集合
    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys()
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

    //加载数据 ——timeSpan 时间选择，isRefresh 是否刷新
    loadData(timeSpan, isRefresh) {
        // 加载数据的时候刷新
        this.updateSetState({
            isLoading: isRefresh
        });
        let url = this.getFetchUrl(timeSpan, this.props.path);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                // 如果有result且有result.items 就返回result.items 否则就返回result，如果有result就返回result，否则就返回[]
                this.items = result && result.items ? result.items : result ? result : [];
                this.getFavoriteKeys();
                // 对数据进行判断，如果数据时四个小时以前的，我们就从网络上获取新的数据
                // 如果有result且有result.update_date且result.update_date在四个小时之前
                if (!this.items || isRefresh && result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    // 从网络上获取新的数据
                    return this.dataRepository.fetchNetRepository(url);
                }
            })
            .then((result) => {//取得从网络上获取的新的数据
                // 如果从网络上获取的数据数组为空或者长度为0，我们就直接返回，不用刷新数据，否则就刷新数据
                if (!result || result.length === 0) return;
                this.items = result;
                this.getFavoriteKeys();
            })
            .catch(error => {
                this.updateSetState({
                    isLoading: false
                })
            })
    }

    componentDidMount() { //组件第一次绘制
        this.loadData(this.props.timeSpan, true);
    }

    componentWillReceiveProps(nextProps) { // 在props改变的时候调用
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.loadData(nextProps.timeSpan, true);
        }
    }

    // 下拉刷新
    onRefresh() {
        this.loadData(this.props.timeSpan, true);
    }

    // 打开详情页
    onSelected(data) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                item: data.item,
                ...this.props
            }
        })
    }

    //收藏按钮的点击回调函数
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.fullName.toString(), JSON.stringify(item))
        } else {
            favoriteDao.removeFavoriteItem(item.fullName.toString())
        }
    }

    renderRow(porjectModel) {
        return <RepositoryCell
            key={porjectModel.item.fullName}
            porjectModel={porjectModel}
            flag="trending"
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
                renderRow={(data) => this.renderRow(data)}
                // 下拉刷新组件
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}// 刷新状态
                        // 监听下拉状态 用户下拉刷新的时候获取数据
                        onRefresh={() => this.onRefresh()}
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