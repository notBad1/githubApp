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
// import RepositoryDetail from '../pages/RepositoryDetail'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../util/Utils'
import ActionUtils from '../util/ActionUtils'

// URL拼接
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

let favoriteDao = new FavoriteDao(FLAG_STORYGE.flag_popular);
// 初始化
let dataRepository = new DataRepository(FLAG_STORYGE.flag_popular);

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.isFavoriteChange = false; // 监听收藏状态是否改变
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            error: '',
            isLoading: false,
            favoriteKeys: [],
            theme: this.props.theme
        };

    }

    componentDidMount() {
        // 加载的时候注册监听
        this.listener = DeviceEventEmitter.addListener('favoriteChange_popular', () => {
            this.isFavoriteChange = true;
        });
        this.loadData();
    }

    // 组件卸载的时候移除监听
    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
    }

    // 在props改变的时候调用
    componentWillReceiveProps(nextProps) {
        if (this.isFavoriteChange) {
            this.isFavoriteChange = false;
            this.getFavoriteKeys();
        }else if(nextProps.theme !== this.state.theme){
            this.updateSetState({
                theme: nextProps.theme
            });
            this.flushFavoriteState();
        }
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

    loadData() {
        // 加载数据的时候刷新
        this.updateSetState({
            isLoading: true
        });
        let url = URL + this.props.tabLabel;
        dataRepository.fetchRepository(url)
            .then(result => {
                // 如果有result且有result.items 就返回result.items 否则就返回result，如果有result就返回result，否则就返回[]
                this.items = result && result.items ? result.items : result ? result : [];
                this.getFavoriteKeys();
                // 对数据进行判断，如果数据时四个小时以前的，我们就从网络上获取新的数据
                // 如果有result且有result.update_date且result.update_date在四个小时之前
                if (result && result.update_date && ! dataRepository.checkDate(result.update_date)) {
                    // 从网络上获取新的数据
                    return dataRepository.fetchNetRepository(url);
                }
            })
            .then((items) => {//取得从网络上获取的新的数据
                // 如果从网络上获取的数据数组为空或者长度为0，我们就直接返回，不用刷新数据，否则就刷新数据
                if (!items || items.length === 0) return;
                this.items = items;
                this.getFavoriteKeys();
            })
            .catch(error => {
                this.updateSetState({
                    isLoading: false,
                    error: JSON.stringify(error)
                });
            })
    }

    renderRow(projectModel) {
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            flag = {FLAG_STORYGE.flag_popular}
            onSelected={() =>
                ActionUtils.onSelected({
                    projectModel: projectModel,
                    flag: FLAG_STORYGE.flag_popular,
                    ...this.props
                })
            }
            onFavorite={(item, isFavorite) =>
                ActionUtils.onFavorite(item, isFavorite, favoriteDao, FLAG_STORYGE.flag_popular)
            }
            theme={this.props.theme}
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
                        onRefresh={() => this.loadData()}
                        // 指示器颜色
                        colors={[this.state.theme.themeColor]} //android
                        tintColor={this.state.theme.themeColor} //ios
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