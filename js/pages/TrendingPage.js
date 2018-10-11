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

// 弹出框
import {FLAG_TAB} from  './HomePage'
import ViewUtil from '../util/ViewUtil'
import MoreMenu, {MORE_MENU} from '../common/MoreMenu'
import TimeSpan from '../model/TimeSpan'
import BaseComponent from './BaseComponent'
import CustomThemePage from './tags/CustomThemePage'

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

export default class PopularPages extends BaseComponent {
    constructor(props) {
        super(props);
        // 初始化languageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages: [], //标签数组
            isVisible: false, // 是否显示弹出框
            buttonRect: {}, //弹框显示位置
            timeSpan: timeSpanTextArray[0],
            btn: '',
            theme: this.props.theme,
            modalVisible: false
        }
    }

    // 组件刚完成初始化
    componentDidMount() {
        super.componentDidMount();
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
    // showPopover(ref) {
    //     this.refs[ref].measure((ox, oy, width, height, px, py) => {
    //         this.setState({
    //             isVisible: true,
    //             buttonRect: {x: px, y: py, width: width, height: height},
    //             btn: ref
    //         });
    //     });
    // }

    // 关闭弹出框
    // closePopover() {
    //     this.setState({isVisible: false});
    // }

    onSelected(item) {
        this.setState({
            isVisible: false,
        });
        this.setState({
            timeSpan: item,
        });
    }

    // 导航栏标题
    renderTitleView() {
        return <View>
            <TouchableOpacity ref="button"
                              onPress={() => {
                                  {/*this.showPopover('button')*/}
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

    renderMoreMenu() {
        let menus = [
            MORE_MENU.Custom_Language,
            MORE_MENU.Sort_Language,
            MORE_MENU.Custom_Theme,
            MORE_MENU.About_Author,
            MORE_MENU.About
        ];

        let params = {
            ...this.props,
            formPage: FLAG_TAB.flag_trendingTab
        };

        return <MoreMenu
            {...params}
            menus={menus}
            anchorView={() => this.refs.moreButton}
            onMoreMenuSelected={(tab)=>{
                if(tab === MORE_MENU.Custom_Theme){
                    this.setState({
                        modalVisible: true
                    })
                }
            }}
            ref="moreMenuButton"
        />
    }

    onClose(){ // 关闭弹出框
        this.setState({
            modalVisible: false
        })
    }

    returnThemeView(){
        return <CustomThemePage
            modalVisible={this.state.modalVisible}
            onClose = {()=>this.onClose()}
            {...this.props}
        />
    }

    renderRightButton() {
        return <View style={{flexDirection: 'row'}}>
            {ViewUtil.getMoreButton(() => this.refs.moreMenuButton.open())}
        </View>
    }
    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor={this.state.theme.themeColor}
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
        let timeSpanView =null;
            {/*<Popover*/}
                {/*isVisible={this.state.isVisible}*/}
                {/*fromRect={this.state.buttonRect}*/}
                {/*placement="bottom"*/}
                {/*onClose={() => {*/}
                    {/*this.closePopover()*/}
                {/*}}*/}
                {/*contentStyle={{backgroundColor: '#000', opacity: 0.7}}*/}
            {/*>*/}
                {/*{timeSpanTextArray.map((item, i, arry) => {*/}
                    {/*return <Text key={i}*/}
                                 {/*onPress={() => {*/}
                                     {/*this.onSelected(item)*/}
                                 {/*}}*/}
                                 {/*style={{*/}
                                     {/*fontSize: 16,*/}
                                     {/*color: '#fff',*/}
                                     {/*paddingHorizontal: 15,*/}
                                     {/*marginVertical: 8*/}
                                 {/*}}*/}
                    {/*>{item.showText}</Text>*/}
            //     })}
            //
            // </Popover>;

        return <View style={styles.container}>
            <NavigatorBar
                titleView={this.renderTitleView()}
                style={{
                    backgroundColor: this.state.theme.themeColor
                }}
                statusBar={{
                    backgroundColor: this.state.theme.themeColor
                }}
                leftButton={
                    <View></View>
                }
                rightButton={ this.renderRightButton()}
            />
            {/*页签*/}
            {content}
            {/*弹出框*/}
            {timeSpanView}
            {this.renderMoreMenu()}
            {/*自定义主题弹出框*/}
            {this.returnThemeView()}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});