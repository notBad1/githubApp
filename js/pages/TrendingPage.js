/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import NavigatorBar from '../common/navigatorBar'
import TrendingTab from './TrendingTab'


// 自定义页签
import CostomKeyPage from './tags/CostomKeyPage'
// 页签排序
import SortKeyPage from './tags/SortKeyPage'

// 弹出框
import TimeSpan from '../model/TimeSpan'
import Popover from '../common/Popover'
import KeyView from '../model/KeyView'

// 导入第三方组件
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view'

// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'

// 初始化一个数组
const timeSpanTextArray = [
    new TimeSpan('今 天', 'daily'),
    new TimeSpan('本 周', 'weekly'),
    new TimeSpan('本 月', 'monthly')
];
const keyViewArray = [
    new KeyView('自定义语言', CostomKeyPage, false, FLAG_LANGUAGE.flag_language),
    new KeyView('语言排序', SortKeyPage, false, FLAG_LANGUAGE.flag_language),
    new KeyView('删除语言', CostomKeyPage, true, FLAG_LANGUAGE.flag_language)
];

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        // 初始化languageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages: [], //标签数组
            isVisible: false, // 是否显示弹出框
            buttonRect: {}, //弹框显示位置
            timeSpan: timeSpanTextArray[0],
            btn: ''
        }
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
                    languages: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    // 显示弹出框
    showPopover(ref) {
        this.refs[ref].measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height},
                btn: ref
            });
        });
    }

    // 关闭弹出框
    closePopover() {
        this.setState({isVisible: false});
    }

    onSelected(item) {
        this.setState({
            isVisible: false,
        });
        this.state.btn === 'button' ?
            this.setState({
                timeSpan: item,
            })
            :
            this.props.navigator.push({
                component: item.component,
                params: {
                    ...this.props,
                    isRemoveKey: item.isRemoveKey,
                    flag: item.flag
                }
            })
    }

    // 导航栏标题
    renderTitleView() {
        return <View>
            <TouchableOpacity ref="button"
                              onPress={() => {
                                  this.showPopover('button')
                              }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: '#fff'}}>趋势</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff',
                        marginLeft: 8,
                        alignSelf: 'flex-end'
                    }}>{this.state.timeSpan.showText}</Text>
                    <Image style={{width: 15, height: 15, marginLeft: 8}}
                           source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>

            </TouchableOpacity>
        </View>
    }

    render() {
        let array = this.state.btn === 'button' ? timeSpanTextArray : keyViewArray;
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor="#2196f3"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="mintcream"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {this.state.languages.map((item, i, arry) => {
                    return item.checked &&
                        <TrendingTab
                            key={i}
                            path={item.path}
                            tabLabel={item.short_name ? item.short_name : item.name}
                            timeSpan={this.state.timeSpan}
                            {...this.props}
                        />
                })}
            </ScrollableTabView>
            : null;
        let timeSpanView =
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement="bottom"
                onClose={() => {
                    this.closePopover()
                }}
                contentStyle={{backgroundColor: '#000', opacity: 0.7}}
            >
                {array.map((item, i, arry) => {
                    return <Text key={i}
                                 onPress={() => {
                                     this.onSelected(item)
                                 }}
                                 style={{
                                     fontSize: 16,
                                     color: '#fff',
                                     paddingHorizontal: 15,
                                     marginVertical: 8
                                 }}
                    >{item.showText ? item.showText : item.showName}</Text>
                })}

            </Popover>;

        return <View style={styles.container}>
            <NavigatorBar
                titleView={this.renderTitleView()}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
                leftButton={
                    <View></View>
                }
                rightButton={
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.onSeach()
                            }}
                        >
                            <Image style={{width: 26, height: 26, margin: 12}}
                                   source={require('../../res/images/ic_search_white_48pt.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            ref="button1"
                            onPress={() => this.showPopover('button1')}
                        >
                            <Image style={{width: 26, height: 26, margin: 12}}
                                   source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
                        </TouchableOpacity>
                    </View>
                }
            />
            {/*页签*/}
            {content}
            {/*弹出框*/}
            {timeSpanView}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});