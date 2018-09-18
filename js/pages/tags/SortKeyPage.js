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
    TouchableHighlight,
    Image,
    Alert,
    DeviceEventEmitter
} from 'react-native';

// 导航栏
import NavigatorBar from '../../common/navigatorBar'
// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../../expand/dao/LanguageDao'
// 操作数组方法
import ArrayUtils from '../../util/ArrayUtils'
// 返回按钮
import ViewUtil from '../../util/ViewUtil'
import {ACTION_HOME, FLAG_TAB} from '../../pages/HomePage'
// 导入第三方组件
import SortableListView from 'react-native-sortable-listview' // 具有可拖拽功能的listView


export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(this.props.flag);// 初始化LanguageDao
        this.dataArray = [];// 所有标签数组
        this.sortResultArray = []; // 排序之后新生成的数组
        this.originalCheckedArray = []; // 记录上次标签排序的顺序
        this.state = {
            checkedArray: [], //已经订阅的标签数组
            theme: this.props.theme
        };
    }

    // 组件刚完成初始化
    componentDidMount() {
        // 加载数据
        this.loadData();
    }

    //从Dao中加载标签数据
    loadData() {
        // 取出所有标签
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItems(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //  数据方法
    getCheckedItems(result) {
        // 记录下所有的标签数据数组
        this.dataArray = result;
        // 创建数组，保存用户已经订阅的标签
        let checkedArray = [];
        for (let i = 0, len = result.length; i < len; i++) {
            result[i].checked && checkedArray.push(result[i]);
        }
        this.setState({
            checkedArray: checkedArray
        })
        //把订阅的标签数组克隆给originalCheckedArray
        this.originalCheckedArray = ArrayUtils.cloneArray(checkedArray);
    }


    // 保存
    onSave(isChecked) {
        if (isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        // 获取到排序之后的新数组
        this.getSortResult();
        // 保存下排序之后的新数组
        this.languageDao.save(this.sortResultArray);
        // 返回到上一页
        this.props.navigator.pop();
        let selectedTab = this.props.flag === FLAG_LANGUAGE.flage_key ? FLAG_TAB.flag_popularTab : FLAG_TAB.flag_trendingTab;
        DeviceEventEmitter.emit('ACTION_HOME', ACTION_HOME.A_RESTART, selectedTab); // 通知首页重启
    }

    // 获取到排序之后的新数组
    getSortResult() {
        // 初始化排序之后的新数组——克隆dataArray（记录下所有的标签数据的数组）
        this.sortResultArray = ArrayUtils.cloneArray(this.dataArray);
        // 遍历排序之前的订阅的标签数组
        for (let i = 0, n = 0, len = this.originalCheckedArray.length; i < len; i++) {
            // 获取元素
            let item = this.originalCheckedArray[i];
            //获取元素在原始数组（dataArray 页面进入时获取的所有标签数组）的索引值
            let index = this.dataArray.indexOf(item);
            // 用this.state.checkedArray数组的元素向排序后的新数组中替换索引为index位置的元素
            this.sortResultArray.splice(index, 1, this.state.checkedArray[n]);
            n += 1;
        }
    }

    // 返回
    onGoBack() {
        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '确认退出',
            '要保存修改吗？',
            [
                {
                    text: '不保存', onPress: () => {
                    this.props.navigator.pop()
                }
                },
                {
                    text: '保存', onPress: () => {
                    this.onSave(true);
                }
                },
            ]
        )
    }


    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'标签排序页'}
                style={{
                    backgroundColor: this.state.theme.themeColor
                }}
                statusBar={{
                    backgroundColor: this.state.theme.themeColor
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
            <SortableListView
                style={{flex: 1}} // 样式
                data={this.state.checkedArray} // 数据
                order={Object.keys(this.state.checkedArray)} // 生成的key值
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row} theme={this.props.theme}/>}
            />
        </View>
    }
}

// 创建拖拽列表的内容组件
class SortCell extends Component {

    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={styles.item}
            {...this.props.sortHandlers}
        >
            <View style={styles.row}>
                <Image style={{width: 26, height: 26, tintColor: this.props.theme.themeColor, marginRight: 15}}
                       source={require('./img/ic_sort.png')}/>
                <Text style={styles.text}>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 15,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: '#333'
    }
});