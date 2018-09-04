/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import NavigatorBar from '../common/navigatorBar'
import MoreMenu, {MORE_MENU} from '../common/MoreMenu'
import GlobalStyles from '../../res/styles/GlobalStyles'
import ViewUtil from '../util/ViewUtil'
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'

import AboutPage from './tags/AboutPage'
import CostomKeyPage from './tags/CostomKeyPage'
import SortKeyPage from './tags/SortKeyPage'
import CustomThemePage from './tags/CustomThemePage'
import AboutAuthorPage from './tags/AboutAuthorPage'


export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onClick(tab) {
        let targetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.About:
                targetComponent = AboutPage;
                break;
            case MORE_MENU.Custom_Language:
                targetComponent = CostomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Sort_Language:
                targetComponent = SortKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Key:
                targetComponent = CostomKeyPage;
                params.flag = FLAG_LANGUAGE.flage_key;
                break;
            case MORE_MENU.Sort_Key:
                targetComponent = SortKeyPage;
                params.flag = FLAG_LANGUAGE.flage_key;
                break;
            case MORE_MENU.Remove_Key:
                targetComponent = CostomKeyPage;
                params.flag = FLAG_LANGUAGE.flage_key;
                params.isRemoveKey = true;
                break;
            case MORE_MENU.Custom_Theme:
                targetComponent = CustomThemePage;
                break;
            case MORE_MENU.About_Author:
                targetComponent = AboutAuthorPage;
                break;
        }

        if (targetComponent) {
            this.props.navigator.push({
                component: targetComponent,
                params: params
            })
        }

    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'我的'}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
            />
            {/*滚动试图*/}
            <ScrollView>
                <TouchableHighlight
                    onPress={() => {
                        this.onClick(MORE_MENU.About)
                    }}
                >
                    <View style={styles.item}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../res/images/ic_trending.png')}
                                   style={[{width: 45, height: 45, marginRight: 10}, {tintColor: '#2196f3'}]}
                            />
                            <Text style={styles.text}>GitHub Popular</Text>
                        </View>
                        <Image source={require('../../res/images/ic_tiaozhuan.png')}
                               style={[{width: 30, height: 30}, {tintColor: '#2196f3'}]}
                        />
                    </View>
                </TouchableHighlight>
                <View style={GlobalStyles.line}/>
                <Text style={styles.title}> 趋势管理 </Text>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.Custom_Language)
                        }, require('./tags/img/ic_custom_language.png'), '自定义语言', '#2196f3', null
                    )
                }
                <View style={GlobalStyles.line}/>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.Sort_Language)
                        }, require('./tags/img/ic_swap_vert.png'), '语言排序', '#2196f3', null
                    )
                }
                <View style={GlobalStyles.line}/>
                <Text style={styles.title}> 标签管理 </Text>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.Custom_Key)
                        }, require('./tags/img/ic_custom_language.png'), '自定义标签', '#2196f3', null
                    )
                }
                <View style={GlobalStyles.line}/>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.Sort_Key)
                        }, require('./tags/img/ic_swap_vert.png'), '标签排序', '#2196f3', null)
                }
                <View style={GlobalStyles.line}/>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.Remove_Key)
                        }, require('./tags/img/ic_remove.png'), '删除标签', '#2196f3', null)
                }
                <View style={GlobalStyles.line}/>
                <Text style={styles.title}> 设置 </Text>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.Custom_Theme)
                        }, require('./tags/img/ic_custom_theme.png'), '自定义主题', '#2196f3', null)
                }
                <View style={GlobalStyles.line}/>
                {
                    ViewUtil.getSetingItem(
                        () => {
                            this.onClick(MORE_MENU.About_Author)
                        }, require('./tags/img/ic_insert_emoticon.png'), '关于作者', '#2196f3', null)
                }
                <View style={GlobalStyles.line}/>
            </ScrollView>

        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 25
    },
    text: {
        color: '#333',
        fontSize: 18
    },
    title: {
        fontSize: 18,
        color: '#666',
        padding: 10
    }

});