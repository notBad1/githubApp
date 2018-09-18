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
    DeviceEventEmitter,
} from 'react-native';

// 导入页面组件
import RepositoryCell from '../common/RepositoryCell'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao'
import ArrayUtils from '../util/ArrayUtils'
import ActionUtils from '../util/ActionUtils'

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.unFavorite = [];
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            error: '',
            isLoading: false,
            favoriteKeys: [],
            theme: this.props.theme
        };
    }

    componentDidMount() {
        this.loadData(true);
    }

    componentWillReceiveProps(nextProps) { // 在props改变的时候调用
        this.loadData(false);
        if(nextProps.theme !== this.state.theme){
            this.updateSetState({
                theme: nextProps.theme
            });
        }
    }


    loadData(isLoad) {
        if (isLoad) {
            // 加载数据的时候刷新
            this.updateSetState({
                isLoading: true
            });
        }
        this.favoriteDao.getAllItems()
            .then((result) => {
                let resultData = [];
                for (let i = 0, len = result.length; i < len; i++) {
                    resultData.push(new ProjectModel(result[i], true))
                }
                this.updateSetState({
                    dataSource: this.getDataSource(resultData),
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

    // 封装setState方法
    updateSetState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    //封装dataSource
    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    //收藏按钮的点击回调函数
    onFavorite(item) {
        // 在收藏页面取消项目收藏的话，通过DeviceEventEmitter给当前操作项目所在模块发送通知
        // 将用户操作的项目保存到数组中
        ArrayUtils.updateArray(item, this.unFavorite);
        if (this.unFavorite.length > 0) {
            if (this.props.flag === 'popular') {
                DeviceEventEmitter.emit('favoriteChange_popular')
            } else {
                DeviceEventEmitter.emit('favoriteChange_trending')
            }
        }
    }

    renderRow(projectModel) {
        if (!projectModel) return null;
        let key = projectModel.item.id ? projectModel.item.id : projectModel.item.fullName;
        return <RepositoryCell
            key={key}
            projectModel={projectModel}
            flag={this.props.flag}
            onSelected={() => {
                ActionUtils.onSelected({
                    projectModel: projectModel,
                    flag: this.props.flag,
                    ...this.props
                })
            }}
            onFavorite={(item, isFavorite) => {
                ActionUtils.onFavorite(item, isFavorite, this.favoriteDao, this.props.flag);
                this.onFavorite(item);
            }}
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