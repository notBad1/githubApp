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

import WebViewTest from '../../WebViewTest'

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

    render() {
        return <View style={styles.container}>
            {/*底部导航*/}
            <TabNavigator
                tabBarStyle={{backgroundColor: '#fff'}}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_popular'}
                    selectedTitleStyle={{color: '#2196f3'}}
                    title="最热"
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]}
                                                     source={require('../../res/images/ic_polular.png')}/>}
                    // badgeText="1"
                    onPress={() => this.setState({selectedTab: 'tb_popular'})}>
                    <PopularPage {...this.props}/>
                    {/*<AsyncStorageTest/>*/}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_trending'}
                    selectedTitleStyle={{color: '#2196f3'}}
                    title="趋势"
                    renderIcon={() => <Image style={styles.image}
                                             source={require('../../res/images/ic_trending.png')}/>}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]}
                                                     source={require('../../res/images/ic_trending.png')}/>}
                    onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                    <TrendingPage />
                    {/*<WebViewTest/>*/}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_favorite'}
                    selectedTitleStyle={{color: '#2196f3'}}
                    title="收藏"
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]}
                                                     source={require('../../res/images/ic_polular.png')}/>}
                    // badgeText="1"
                    onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                    <FavoritePage />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_my'}
                    selectedTitleStyle={{color: '#2196f3'}}
                    title="我的"
                    renderIcon={() => <Image style={styles.image}
                                             source={require('../../res/images/ic_trending.png')}/>}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]}
                                                     source={require('../../res/images/ic_trending.png')}/>}
                    // renderBadge={() => <CustomBadgeView />}
                    onPress={() => this.setState({selectedTab: 'tb_my'})}>
                    <MyPage />
                </TabNavigator.Item>
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