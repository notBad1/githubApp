/**
 * Created by Administrator on 2018-9-11.
 * 搜索页面
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import {ACTION_HOME} from './HomePage'
import Utils from '../util/Utils'
import ViewUtil from '../util/ViewUtil'
import makeCancleable from '../util/Cancleable'
import GlobalStyles from '../../res/styles/GlobalStyles'
import {FLAG_STORYGE} from '../expand/dao/DataRepository'
import ProjectModel from '../model/ProjectModel'
import ActionUtils from '../util/ActionUtils'
import RepositoryCell from '../common/RepositoryCell'
// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'

// 导入第三方组件
import Toast, {DURATION} from 'react-native-easy-toast'
import FavoriteDao from '../expand/dao/FavoriteDao'

const API_URL = 'https://api.github.com/search/repositories?q=';
let favoriteDao = new FavoriteDao(FLAG_STORYGE.flag_popular);

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        // 初始化languageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flage_key);
        this.keys = [];
        this.iskeyChange = false;
        this.state = {
            rightButText: '搜索',
            isLoading: false,
            favoriteKeys: [],
            showBottombutton: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            theme: this.props.theme
        }
    }

    // 更新 每一项收藏时的状态
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            rightButText: '搜索',
            dataSource: this.state.dataSource.cloneWithRows(projectModels),
            isLoading: false
        })
    }

    // 获取用户收藏的key集合
    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys()
            .then((result) => {
                if (result) {
                    this.updateState({
                        favoriteKeys: result
                    })
                }
                this.flushFavoriteState()
            })
            .catch((error) => {
                this.flushFavoriteState()
            })
    }

    updateState(dic) {
        this.setState(dic)
    }

    loadData() { //加载数据
        this.updateState({
            isLoading: true,
            showBottombutton: false
        });
        let url = API_URL + this.text;
        this.cancleable = makeCancleable(fetch(url));
        this.cancleable.promise
            .then((response) => response.json())
            .then((result) => {
                if (!this || !result || !result.items || result.items.length === 0) {
                    this.toast.show(this.text + '没有获取到数据', DURATION.LENGTH_SHORT);
                    this.updateState({
                        isLoading: false,
                        rightButText: '搜索'
                    });
                    return;
                }
                this.items = result.items;
                this.getFavoriteKeys();
                if (!this.checkKeyIsExist(this.text, this.keys)) {
                    this.updateState({
                        showBottombutton: true
                    });
                }
            })
            .catch((e) => {
                this.updateState({
                    isLoading: false,
                    rightButText: '搜索'
                });
            })
    }

    onRightButClick() {
        if (this.state.rightButText === '搜索') {
            this.updateState({
                rightButText: '取消'
            });
            this.loadData();
        } else {
            this.updateState({
                rightButText: '搜索',
                isLoading: false
            });
            this.cancleable.cancel(); // 取消搜索
        }

    }

    renderNavBar() {
        let backBut = ViewUtil.getLeftButton(() => {
            this.refs.input.blur();// 隐藏键盘
            this.props.navigator.pop();
        });
        let inputText = <TextInput ref="input" style={styles.textInput} underlineColorAndroid="transparent"
                                   onChangeText={text => this.text = text}/>;
        let rightBut = ViewUtil.getRightButton(this.state.rightButText, () => {
            this.refs.input.blur();// 隐藏键盘
            this.onRightButClick()
        });
        return <View style={[styles.navBar,{backgroundColor: this.state.theme.themeColor}]}>
            {backBut}
            {inputText}
            {rightBut}
        </View>
    }

    renderRow(projectModel) {
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            flag="popular"
            onSelected={() => {
                ActionUtils.onSelected({
                    projectModel: projectModel,
                    flag: FLAG_STORYGE.flag_popular,
                    ...this.props
                })
            }}
            onFavorite={(item, isFavorite) => {
                ActionUtils.onFavorite(item, isFavorite, favoriteDao, FLAG_STORYGE.flag_popular)
            }}
        />
    }


    componentDidMount() {
        // 组件被调用时
        this.initkeys();
    }

    componentWillUnmount() { //组件被卸载
        if (this.iskeyChange) {
            DeviceEventEmitter.emit('ACTION_HOME', ACTION_HOME.A_RESTART)
        }

    }

    /**
     * 初始化标签集合 获取所有标签
     */
    async initkeys() {
        this.keys = await this.languageDao.fetch()
    }

    /**
     * 数据库中是否存在用户输入的key
     */
    checkKeyIsExist(key, keys) {
        for (let i = 0, l = keys.length; i < l; i++) {
            //toLowerCase() 把字符串转换成小写
            if (key.toLowerCase() === keys[i].name.toLowerCase())return true;
        }
        return false;
    }

    /**
     * 添加标签
     */
    saveKey() {
        let key = this.text;
        if (!this.checkKeyIsExist(key, this.keys)) {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            this.keys.unshift(key);
            this.languageDao.save(this.keys);
            this.iskeyChange = true;
            this.toast.show(key.name + '添加成功', DURATION.LENGTH_SHORT);
        } else {
            this.toast.show(key.name + '已经存在', DURATION.LENGTH_SHORT)
        }
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, {backgroundColor: this.state.theme.themeColor}]}/>;
        }

        let bottomButton = this.state.showBottombutton ? <TouchableOpacity
            style={[styles.button, {backgroundColor: this.state.theme.themeColor}]}
            onPress={() => this.saveKey()}
        >
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>添加标签</Text>
            </View>
        </TouchableOpacity> : null;

        return <View style={styles.container}>
            {statusBar}
            {this.renderNavBar()}
            <View style={{flex: 1}}>
                {
                    this.state.isLoading ? <ActivityIndicator style={styles.centering} animating={this.state.isLoading}
                                                              size="large"/> : null
                }
                {
                    !this.state.isLoading ? <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) => this.renderRow(data)}
                        // 下拉刷新组件
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isLoading}// 刷新状态
                                // 监听下拉状态 用户下拉刷新的时候获取数据
                                onRefresh={() => this.loadData()}
                                // 指示器颜色
                                colors={['#2196f3']} //android
                                tintColor={["#2196f3"]} //ios
                                // 标题 ios
                                title={'loading...'}
                            />
                        }
                    /> : null
                }
            </View>
            {bottomButton}
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    statusBar: {
        height: 20
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android
    },
    textInput: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 40,
        borderColor: '#f9f9f9',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        paddingLeft: 8,
        marginLeft: 10,
        marginRight: 10,
        color: '#fff'
    },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10
    },
    title: {
        fontSize: 18,
        color: "#fff"
    }

});