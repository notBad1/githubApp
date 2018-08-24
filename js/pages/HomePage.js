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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular'
        }
    }

    // 在组件完成加载的时候，希望注册一个通知
    componentDidMount() {
        this.listenter = DeviceEventEmitter.addListener('showToast', (text) => {
            //在首页显示通知
            this.toast.show(text, DURATION.LENGTH_SHORT);
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