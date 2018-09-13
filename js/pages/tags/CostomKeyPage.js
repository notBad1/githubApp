/**
 * Created by Administrator on 2018-8-14.
 * 自定义标签页
 * 标签移除页
 */
/**
 * Created by Administrator on 2018-8-10.
 * 自定义标签页 flag=key
 * 删除标签 isRemoveKey=true
 * 自定义语言 flag=languages
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Alert,
    DeviceEventEmitter
} from 'react-native';

// 页面组件
// 导航栏
import NavigatorBar from '../../common/navigatorBar'
// 返回按钮
import ViewUtil from '../../util/ViewUtil'
// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../../expand/dao/LanguageDao'
// 操作数组方法
import ArrayUtils from '../../util/ArrayUtils'
import {ACTION_HOME,FLAG_TAB} from '../../pages/HomePage'
// 导入第三方组件
import CheckBox from 'react-native-check-box'

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        // 初始化LanguageDao
        this.languageDao = new LanguageDao(this.props.flag);
        // 定义数组用于保存用户所做的修改
        this.changeValues = [];
        // 定义是否是标签移除页 ,  通过this.props.isRemoveKey判断用户点击的标签移除还是自定义标签
        this.isRemoveKey = this.props.isRemoveKey ? true : false;
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

    // checkBox
    renderCheckBox(data) {
        let leftText = data.name;
        // 在标签移除页面，checkBox默认都不选中
        let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this.onClick(data)}
                isChecked={isChecked} // 是否选中
                leftText={leftText} // 左侧文字
                leftTextStyle={{color: '#333', fontSize: 16}}
                checkedImage={<Image source={require('./img/ic_check_box.png')} style={{tintColor: '#2196f3'}}/>}
                unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')}
                                       style={{tintColor: '#2196f3'}}/>}
            />);
    }

    // 渲染列表
    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0)return null;
        let len = this.state.dataArray.length
        let views = [];
        // 遍历数组
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.items}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            );
        }

        views.push(
            <View key={len - 1}>
                <View style={styles.items}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}></View>
            </View>
        );

        return views
    }

    // checkBox点击事件
    onClick(data) {
        // 在标签移除页面，点击是否选中不修改其原本的订阅状态
        if (!this.isRemoveKey) {
            data.checked = !data.checked;
        }
        // 记录下用户所做的修改  this.changeValues保存用户所做修改的数组
        ArrayUtils.updateArray(data, this.changeValues);
    }

    // 保存
    onSave() {
        if (this.changeValues.length === 0) {
            // 如果用户没有做修改，就直接关闭当前页面
            this.props.navigator.pop();
            return;
        }

        if (this.isRemoveKey) {
            // 当用户点击的是移除按钮的时候，遍历用户修改的数组，在this.state.dataArray将其移除
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtils.remove(this.state.dataArray, this.changeValues[i]);
            }
        }

        // 如果用户做修改，就将用户修改保存到数据库中
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
        let jumpToTab = this.props.flag === FLAG_LANGUAGE.flag_language ? FLAG_TAB.flag_trendingTab : FLAG_TAB.flag_popularTab;
        DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_RESTART,jumpToTab)
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
                {
                    text: '不保存', onPress: () => {
                    this.props.navigator.pop()
                }
                },
                {
                    text: '保存', onPress: () => {
                    this.onSave();
                }
                },
            ]
        )
    }


    render() {
        let title = this.props.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : '自定义标签';
        title = this.isRemoveKey ? '标签移除' : title;

        let rightButtonText = this.isRemoveKey ? '移除' : '保存';

        return <View style={styles.container}>
            <NavigatorBar
                title={title}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
                leftButton={ViewUtil.getLeftButton(() => this.onGoBack())}
                rightButton={ViewUtil.getRightButton(rightButtonText, () => this.onSave())}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>
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