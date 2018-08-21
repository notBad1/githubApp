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
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from '../pages/RepositoryDetail'


// URL拼接
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            error: '',
            isLoading: false
        };
        // 初始化
        this.dataRepository = new DataRepository();
    }

    loadData() {
        // 加载数据的时候刷新
        this.setState({
            isLoading: true
        });
        let url = URL + this.props.tabLabel;
        this.dataRepository.fetchRepository(url)
            .then(result => {
                // 如果有result且有result.items 就返回result.items 否则就返回result，如果有result就返回result，否则就返回[]
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false // 数据加载完成停止刷新
                });
                // 对数据进行判断，如果数据时四个小时以前的，我们就从网络上获取新的数据
                // 如果有result且有result.update_date且result.update_date在四个小时之前
                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    // 提示
                    DeviceEventEmitter.emit('showToast', '数据过时');
                    // 从网络上获取新的数据
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    DeviceEventEmitter.emit('showToast', '显示缓存数据');
                }
            })
            .then((result) => {//取得从网络上获取的新的数据
                // 如果从网络上获取的数据数组为空或者长度为0，我们就直接返回，不用刷新数据，否则就刷新数据
                if (!result || result.length === 0) return;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result),
                    isLoading: false // 数据加载完成停止刷新
                });
                DeviceEventEmitter.emit('showToast', '显示网络数据')
            })
            .catch(error => {
                this.setState({
                    error: JSON.stringify(error)
                })
            })
    }

    componentDidMount() {
        this.loadData();
    }

    onSelected(data) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                item: data,
                ...this.props
            }
        })
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => <RepositoryCell
                    key={data.id}
                    data={data}
                    onSelected={() => {
                        this.onSelected(data)
                    }}
                />}
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