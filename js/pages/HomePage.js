/**
 * Created by Administrator on 2018-8-10.
 * 首页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter // 事件发射器
} from 'react-native';

// 导入第三方组件
import TabNavigator from 'react-native-tab-navigator';
import Toast, {DURATION} from 'react-native-easy-toast'
// 引入页面
import PopularPage from './PopularPage'
import FavoritePage from './FavoritePage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'

// import WebViewTest from '../../WebViewTest'
// import TrendingTest from '../../TrendingTest'
// import AsyncStorageTest from '../../AsyncStorageTest'

export const ACTION_HOME = {
    'A_SHOWST': 'showToast',
    'A_RESTART': 'restart'
};
export const FLAG_TAB = {
    flag_popularTab: 'tb_popular',
    flag_trendingTab: 'tb_trending',
    flag_favoriteTab: 'tb_favorite',
    flag_myTab: 'tb_my'
};

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        let selectedTab = this.props.selectedTab ? this.props.selectedTab : 'tb_popular';
        this.state = {
            selectedTab: selectedTab
        }
    }

    // 在组件完成加载的时候，希望注册一个通知
    componentDidMount() {
        this.listenter = DeviceEventEmitter.addListener('ACTION_HOME', (action, params) => {
            this.onAction(action, params);
        })
    }

    /**
     * 通知事件回调处理
     * */
    onAction(action, params) {
        if (ACTION_HOME.A_RESTART === action) {
            this.onRestart(params);
        } else if (ACTION_HOME.A_SHOWST === action) {
            //在首页显示通知
            this.toast.show(params.text, DURATION.LENGTH_SHORT);
        }
    }

    /**
     * 重启首页
     * jumpToTab 默认显示页面
     * */
    onRestart(jumpToTab) {
        this.props.navigator.resetTo({
            component: HomePage,
            params: {
                ...this.props,
                selectedTab: jumpToTab
            }
        })
    }

    // 组件卸载的时候取消监听
    componentWillUnmount() {
        // 取消监听
        this.listenter && this.listenter.remove();
    }

    // TabItem 方法
    _renderTab(Component, selectedTab, title, Icon) {
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectedTab}
            selectedTitleStyle={{color: '#2196f3'}}
            title={title}
            renderIcon={() => <Image style={styles.image} source={Icon}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]} source={Icon}/>}
            onPress={() => this.setState({selectedTab: selectedTab})}>
            <Component {...this.props}/>
        </TabNavigator.Item>
    }

    render() {
        return <View style={styles.container}>
            {/*底部导航*/}
            <TabNavigator tabBarStyle={{backgroundColor: '#fff'}}>
                {this._renderTab(PopularPage, 'tb_popular', '最热', require('../../res/images/ic_polular.png'))}
                {this._renderTab(TrendingPage, 'tb_trending', '趋势', require('../../res/images/ic_trending.png'))}
                {this._renderTab(FavoritePage, 'tb_favorite', '收藏', require('../../res/images/ic_favorite.png'))}
                {this._renderTab(MyPage, 'tb_my', '我的', require('../../res/images/ic_my.png'))}
            </TabNavigator>
            <Toast ref={toast => {
                this.toast = toast
            }}/>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    page1: {
        flex: 1,
        backgroundColor: '#f00'
    },
    page2: {
        flex: 1,
        backgroundColor: '#00f'
    },
    image: {
        width: 22,
        height: 22
    }
});