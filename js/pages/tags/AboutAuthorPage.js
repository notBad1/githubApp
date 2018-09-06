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
    Linking,  //打开邮箱
    Clipboard //剪切板
} from 'react-native';

import ViewUtil from '../../util/ViewUtil'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import Toast from 'react-native-easy-toast'

import AboutCommon, {FLAG_ABOUT}  from './AboutCommon'
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
            author: config.author,
            showRepository: false,
            showBlog: false,
            showQQ: false,
            showContact: false,
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
            case FLAG.BLOG.name:
                this.updataState({
                    showBlog: !this.state.showBlog
                });
                break;
            case FLAG.REPOSITORY.name:
                this.updataState({
                    showRepository: !this.state.showRepository
                });
                break;
            case FLAG.QQ.name:
                this.updataState({
                    showQQ: !this.state.showQQ
                });
                break;
            case FLAG.CONTACT.name:
                this.updataState({
                    showContact: !this.state.showContact
                });
                break;
            case FLAG.BLOG.items.CSDN.title:
                targetComponent = WebSitePage;
                params.url = FLAG.BLOG.items.CSDN.url;
                params.title = FLAG.BLOG.items.CSDN.title;
                break;
            case FLAG.BLOG.items.GITHUB.title:
                targetComponent = WebSitePage;
                params.url = FLAG.BLOG.items.GITHUB.url;
                params.title = FLAG.BLOG.items.GITHUB.title;
                break;
            case FLAG.BLOG.items.JIANSHU.title:
                targetComponent = WebSitePage;
                params.url = FLAG.BLOG.items.JIANSHU.url;
                params.title = FLAG.BLOG.items.JIANSHU.title;
                break;
            case FLAG.BLOG.items.PERSONAL_BLOG.title:
                targetComponent = WebSitePage;
                params.url = FLAG.BLOG.items.PERSONAL_BLOG.url;
                params.title = FLAG.BLOG.items.PERSONAL_BLOG.title;
                break;
            case FLAG.CONTACT.items.QQ.title:
                Clipboard.setString(FLAG.CONTACT.items.QQ.account);
                this.toast.show('QQ: ' + FLAG.CONTACT.items.QQ.account + '已复制到剪贴板');
                break;
            case FLAG.CONTACT.items.Email.title:
                // 打开邮箱的URL
                let url = 'mailto://' + FLAG.CONTACT.items.Email.account;
                // 打开邮箱
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case FLAG.QQ.items.RN.title:
                Clipboard.setString(FLAG.QQ.items.RN.account);
                this.toast.show('React Native学习交流群: ' + FLAG.QQ.items.RN.account + '已复制到剪贴板');
                break;
            case FLAG.QQ.items.MD.title:
                Clipboard.setString(FLAG.QQ.items.MD.account);
                this.toast.show('移动开发者技术分享群: ' + FLAG.QQ.items.MD.account + '已复制到剪贴板');
                break;
        }

        if (targetComponent) {
            this.props.navigator.push({
                component: targetComponent,
                params: params
            })
        }

    }

    /**
     * 右侧图标
     * @param isShow
     * @returns {*}
     */
    getExpandableIcon(isShow) {
        return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png');
    }

    renderItems(dic, isShow) {
        if (!dic) return null;
        let views = [];
        for (let i in dic) {
            let title = isShow ? dic[i].title + ' : ' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {
                        ViewUtil.getSetingItem(() => {
                            this.onClick(dic[i].title);
                        }, '', title, '#2196f3')
                    }
                    <View style={GlobalStyles.line}/>
                </View>
            )
        }
        return views;
    }

    render() {
        let contentView = <View>
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(FLAG.BLOG.name);
                }, require('../../../res/images/ic_computer.png'), FLAG.BLOG.name, '#2196f3', this.getExpandableIcon(this.state.showBlog))
            }
            <View style={GlobalStyles.line}/>
            {
                this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null
            }
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(FLAG.REPOSITORY.name);
                }, require('../../../res/images/ic_code.png'), FLAG.REPOSITORY, '#2196f3', this.getExpandableIcon(this.state.showRepository))
            }
            <View style={GlobalStyles.line}/>
            {
                this.state.showRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null
            }
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(FLAG.QQ.name);
                }, require('../../../res/images/ic_computer.png'), FLAG.QQ.name, '#2196f3', this.getExpandableIcon(this.state.showQQ))
            }
            <View style={GlobalStyles.line}/>
            {
                this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null
            }
            {
                ViewUtil.getSetingItem(() => {
                    this.onClick(FLAG.CONTACT.name);
                }, require('../../../res/images/ic_contacts.png'), FLAG.CONTACT.name, '#2196f3', this.getExpandableIcon(this.state.showContact))
            }
            <View style={GlobalStyles.line}/>
            {
                this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null
            }

        </View>;
        return <View style={GlobalStyles.root_container}>
            {this.aboutCommon.render(contentView, this.state.author)}
            <Toast ref={(toast) => {
                this.toast = toast
            }}/>
        </View>
    }
}

