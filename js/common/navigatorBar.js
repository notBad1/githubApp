/**
 * Created by Administrator on 2018-8-9.
 * 导航页面
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    StatusBar
} from 'react-native';

// 定义常量
const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default','light-content','dark-content']),
    hidden: PropTypes.bool
}

export default class NavigatorBar extends Component {
    // 属性约束
    static propTypes = {
        // 样式约束 必须使用View的样式
        style: View.propTypes.style,
        // 标题
        title: PropTypes.string,
        // 标题元素
        titleView: PropTypes.element,
        // 是否隐藏
        hide: PropTypes.bool,
        // 左侧按钮和右侧按钮
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        // 状态栏
        statusBar: PropTypes.shape(StatusBarShape)
    };

    // 状态栏默认设置
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        }
    }

    render() {
        // 设置状态栏
        let statusBar =  <View style={[styles.statusBar, this.props.statusBar]}>
            <StatusBar {...this.props.statusBar}/>
        </View>;
        // 获取titleView
        let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewConainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5'
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios'? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
    },
    titleViewConainer: {
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    statusBar: {
        height: Platform.OS === 'ios'? STATUS_BAR_HEIGHT: 0
    }

});

