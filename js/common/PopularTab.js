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
    RefreshControl
} from 'react-native';

// 导入页面组件
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'


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
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isLoading: false // 数据加载完成停止刷新
                })
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

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => <RepositoryCell data={data} />}
                // 下拉刷新组件
                refreshControl = {
                    <RefreshControl
                        refreshing={this.state.isLoading}// 刷新状态
                        // 监听下拉状态 用户下拉刷新的时候获取数据
                        onRefresh={()=>this.loadData()}
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