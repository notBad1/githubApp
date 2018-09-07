/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import NavigatorBar from '../common/navigatorBar'

// 导入第三方组件
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view'
// 引入页面
import FavoriteTab from './FavoriteTab'

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'收藏'}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
            />
            <ScrollableTabView
                tabBarBackgroundColor="#2196f3"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="mintcream"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar />}
            >
                <FavoriteTab tabLabel='最热' flag="popular" {...this.props}/>
                <FavoriteTab tabLabel='趋势' flag="trending" {...this.props}/>
            </ScrollableTabView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});