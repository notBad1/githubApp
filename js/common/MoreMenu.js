/**
 * Created by Administrator on 2018-9-4.
 * 更多菜单
 * 可配置菜单
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';


import Popover from '../common/Popover'


// 页面组件
import {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'
// 自定义页签
import CostomKeyPage from '../pages/tags/CostomKeyPage'
// 页签排序
import SortKeyPage from '../pages/tags/SortKeyPage'
// 关于作者
import AboutAuthorPage from '../pages/tags/AboutAuthorPage'
// 关于我
import AboutPage from '../pages/tags/AboutPage'
// 主题
import CustomThemePage from '../pages/tags/CustomThemePage'


export const MORE_MENU = {
    Custom_Language: '自定义语言',
    Sort_Language: '语言排序',
    Custom_Key: '自定义标签',
    Sort_Key: '标签排序',
    Remove_Key: '删除标签',
    About_Author: '关于作者',
    Custom_Theme: '自定义主题',
    About: '关于',
    WebSite: 'Web Site',
    FeedBack: '反馈',
    Share: '分享'
};

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false, // 是否显示弹出框
            buttonRect: {}, //弹框显示位置
        }
    }

    // 定义组件属性
    static propTypes = {
        conentStyle: View.propTypes.style, // 组件样式
        menus: PropTypes.array.isRequired,//菜单数组,必选
        anchorView: PropTypes.func, // 弹出框显示位置的元素
    };

    // 打开更多菜单
    open() {
        this.showPopover();
    }

    // 显示弹出框
    showPopover(ref) {
        if (!this.props.anchorView())return;
        let anchorView = this.props.anchorView();
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height},
                btn: ref,
                modalVisible: true
            });
        });
    }

    // 关闭弹出框
    closePopover() {
        this.setState({isVisible: false});
    }


    //菜单点击方法
    onMenuSelected(tab) {
        this.closePopover(); // 关闭弹出框
        if(typeof (this.props.onMoreMenuSelected) === 'function'){
            this.props.onMoreMenuSelected(tab);
        }
        // 打开页面
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
                break;
            case MORE_MENU.About_Author:
                targetComponent = AboutAuthorPage;
                break;
            case MORE_MENU.FeedBack:
                // 打开邮箱的URL
                let url = 'mailto://mail.qq.com/cgi-bin/frame_html?sid=139oyEgiAakmch1G&r=a87bcc0213e40e292ad6492b4489cf7f'
                // 打开邮箱
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case MORE_MENU.Share:
                break;
        }

        if (targetComponent) {
            this.props.navigator.push({
                component: targetComponent,
                params: params
            })
        }
    }


    renderMoreMenu() {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            contentMarginRight={10}
            onClose={() => {
                this.closePopover()
            }}
            contentStyle={{backgroundColor: '#343434', opacity: 0.85}}
        >
            {this.props.menus.map((item, i, arry) => {
                return <Text key={i}
                             onPress={() => {
                                 this.onMenuSelected(arry[i])
                             }}
                             style={{
                                 fontSize: 16,
                                 color: '#fff',
                                 paddingHorizontal: 15,
                                 marginVertical: 8,
                                 textAlign: 'center'
                             }}
                >{arry[i]}</Text>
            })}

        </Popover>;
        return view;
    }

    render() {
        return this.renderMoreMenu();
    }
}
