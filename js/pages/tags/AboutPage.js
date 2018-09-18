/**
 * Created by Administrator on 2018-9-4.
 * 关于页面
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Linking  //打开邮箱
} from 'react-native';

import ViewUtil from '../../util/ViewUtil'
import MoreMenu, {MORE_MENU} from '../../common/MoreMenu'
import GlobalStyles from '../../../res/styles/GlobalStyles'

import AboutCommon, {FLAG_ABOUT}  from './AboutCommon'
import AboutAuthorPage from './AboutAuthorPage'
import WebSitePage from './WebSitePage'

import config from '../../../res/data/config.json'

export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.updataState(dic), FLAG_ABOUT.flag_about, config);
        this.state = {
            projectModels: [],
            author: config.author,
            theme: this.props.theme
        };
    }

    updataState(dic) {
        this.setState(dic);
    }

    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }

    onClick(tab) {
        let targetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.About_Author:
                targetComponent = AboutAuthorPage;
                break;
            case MORE_MENU.WebSite:
                targetComponent = WebSitePage;
                params.url = 'http://www.devio.org/io/GitHubPopular/';
                params.title = 'GitHub Popular';
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
        }

        if (targetComponent) {
            this.props.navigator.push({
                component: targetComponent,
                params: params
            })
        }

    }

    render() {
        let color = this.state.theme.themeColor;
        let contentView = <View>

            {
                this.aboutCommon.renderRepository(this.state.projectModels)
            }
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(MORE_MENU.WebSite);
                }, require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, color)
            }
            <View style={GlobalStyles.line}/>
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(MORE_MENU.About_Author);
                }, require('./img/ic_insert_emoticon.png'), MORE_MENU.About_Author, color)
            }
            <View style={GlobalStyles.line}/>
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(MORE_MENU.FeedBack);
                }, require('../../../res/images/ic_feedback.png'), MORE_MENU.FeedBack, color)
            }
            <View style={GlobalStyles.line}/>
        </View>;
        return this.aboutCommon.render(contentView,
            {
                'name': 'GitHub Popular',
                'description': '这是一个用来查看GitHub最受欢迎与最热项目的APP，它基于react Native支持android和ios双平台',
                'avator': this.state.author.avator1,
                'backgroundImage': this.state.author.backgroundImage1
            }
        )
    }
}

