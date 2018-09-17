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

// 导入第三方组件
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view'

// 导入页面组件
import {FLAG_TAB} from  './HomePage'
import ViewUtil from '../util/ViewUtil'
import NavigatorBar from '../common/navigatorBar'
import PopularTab from './PopularTab'
import SearchPage from './SearchPage'
// 弹出框
import MoreMenu, {MORE_MENU} from '../common/MoreMenu'

// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'


export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        // 初始化languageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flage_key);
        this.state = {
            languages: [], //标签数组
            theme: this.props.theme
        }
    }

    onSeach() {
        this.props.navigator.push({
            component: SearchPage,
            params: {
                ...this.props,
            }
        })
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

    renderMoreMenu() {
        let menus = [
            MORE_MENU.Custom_Key,
            MORE_MENU.Sort_Key,
            MORE_MENU.Remove_Key,
            MORE_MENU.Custom_Theme,
            MORE_MENU.About_Author,
            MORE_MENU.About
        ];

        let params = {
            ...this.props,
            formPage: FLAG_TAB.flag_popularTab
        };

        return <MoreMenu
            {...params}
            menus={menus}
            anchorView={() => this.refs.moreButton}
            ref="moreMenuButton"
        />
    }

    renderRightButton() {
        return <View style={{flexDirection: 'row'}}>
            {ViewUtil.getSearchButton(() => this.onSeach())}
            {ViewUtil.getMoreButton(() => this.refs.moreMenuButton.open())}
        </View>
    }

    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor= {this.state.theme.themeColor}
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="mintcream"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {this.state.languages.map((item, i, arry) => {
                    return item.checked && <PopularTab key={i} tabLabel={item.name} {...this.props}/>
                })}
            </ScrollableTabView>
            : null;

        return <View style={styles.container}>
            {/*导航栏*/}
            <NavigatorBar
                title='最热'
                style={{
                    backgroundColor: this.state.theme.themeColor
                }}
                statusBar={{
                    backgroundColor: this.state.theme.themeColor
                }}
                leftButton={<View></View>}
                rightButton={this.renderRightButton()}
            />
            {/*页签*/}
            {content}
            {/*弹出框*/}
            {this.renderMoreMenu()}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});