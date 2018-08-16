/**
 * Created by Administrator on 2018-8-10.
 * 首页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

// 导入第三方组件
import TabNavigator from 'react-native-tab-navigator';
// 引入页面
import PopularPage from './PopularPage'
import FavoritePage from './FavoritePage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'

// import AsyncStorageTest from '../../AsyncStorageTest'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular'
        }
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