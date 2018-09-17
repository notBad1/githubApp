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

// 弹出框
import {FLAG_TAB} from  './HomePage'
import ViewUtil from '../util/ViewUtil'
import MoreMenu, {MORE_MENU} from '../common/MoreMenu'

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        }
    }


    renderMoreMenu() {
        let menus = [
            MORE_MENU.Custom_Theme,
            MORE_MENU.About_Author,
            MORE_MENU.About
        ];

        let params = {
            ...this.props,
            formPage: FLAG_TAB.flag_favoriteTab
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
            {ViewUtil.getMoreButton(() => this.refs.moreMenuButton.open())}
        </View>
    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'收藏'}
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
            <ScrollableTabView
                tabBarBackgroundColor={this.state.theme.themeColor}
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="mintcream"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar />}
            >
                <FavoriteTab tabLabel='最热' flag="popular" {...this.props}/>
                <FavoriteTab tabLabel='趋势' flag="trending" {...this.props}/>
            </ScrollableTabView>
            {this.renderMoreMenu()}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});