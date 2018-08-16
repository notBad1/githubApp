/**
 * Created by Administrator on 2018-8-15.
 * 标签排序页，
 * 原理： 取出数据库中所有的标签放到dataArray数组
 *        从dataAray数组中筛选出选中标签放入originalCheckedArray数组中，
 *         从originalCheckedArray数组进行排序
 *         排序结果应用到原始数组
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    Image,
    Alert
} from 'react-native';

// 导航栏
import NavigatorBar from '../common/navigatorBar'
// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'
// 返回按钮
import ViewUtil from '../util/ViewUtil'

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        // 初始化LanguageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flage_key);
        this.state = {
            dataArray: [] // 标签数组
        };
    }

    // 组件刚完成初始化
    componentDidMount() {
        // 加载数据
        this.loadData();
    }

    //从Dao中加载标签数据
    loadData() {
        // 加载标签
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }



    // 保存
    onSave() {
    }

    // 返回
    onGoBack() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '确认退出',
            '要保存修改吗？',
            [
                {text: '不保存', onPress: () => {this.props.navigator.pop()}},
                {text: '保存', onPress: () => {this.onSave();}},
            ]
        )
    }


    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'标签排序页'}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
                leftButton={ViewUtil.getLeftButton(() => this.onGoBack())}
                rightButton={
                    <TouchableOpacity style={{padding: 8}}
                                      onPress={() => this.onSave()}
                    >
                        <View>
                            <Text style={{fontSize: 18, color: '#fff'}}>保存</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 0.5,
        backgroundColor: '#ddd'
    }

});