/**
 * Created by Administrator on 2018-9-4.
 * 关于作者
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

const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'http://jiapenghui.com',
            },
            CSDN: {
                title: 'CSDN',
                url: 'http://blog.csdn.net/fengyuzhengfan',
            },
            JIANSHU: {
                title: '简书',
                url: 'http://www.jianshu.com/users/ca3943a4172a/latest_articles',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/crazycodeboy',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1586866509',
            },
            Email: {
                title: 'Email',
                account: 'crazycodeboy@gmail.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },
};

export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.updataState(dic), FLAG_ABOUT.flag_about_me, config);
        this.state = {
            projectModels: [],
            author: config.author
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
                break;
            case MORE_MENU.FeedBack:
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
        let contentView = <View>
            {
                this.aboutCommon.renderRepository(this.state.projectModels)
            }
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(MORE_MENU.WebSite);
                }, require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, '#2196f3')
            }
            <View style={GlobalStyles.line}/>
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(MORE_MENU.About_Author);
                }, require('./img/ic_insert_emoticon.png'), MORE_MENU.About_Author, '#2196f3')
            }
            <View style={GlobalStyles.line}/>
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(MORE_MENU.FeedBack);
                }, require('../../../res/images/ic_feedback.png'), MORE_MENU.FeedBack, '#2196f3')
            }
            <View style={GlobalStyles.line}/>
        </View>;
        return this.aboutCommon.render(contentView,
            {
                'name': this.state.author.name,
                'description': '这是一个用来查看GitHub最受欢迎与最热项目的APP，它基于react Native支持android和ios双平台',
                'avator': 'https://avatar.csdn.net/8/6/F/1_notbad_.jpg',
                'backgroundImage': 'http://t2.hddhhn.com/uploads/tu/201801/9999/c63fb8c291.jpg'
            }
        )
    }
}

