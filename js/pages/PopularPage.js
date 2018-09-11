/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

// 导入第三方组件
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view'

// 导入页面组件
import NavigatorBar from '../common/navigatorBar'
import PopularTab from './PopularTab'
import SearchPage from './SearchPage'
// 弹出框
import Popover from '../common/Popover'
import KeyView from '../model/KeyView'

// 自定义页签
import CostomKeyPage from './tags/CostomKeyPage'
// 页签排序
import SortKeyPage from './tags/SortKeyPage'
// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'


const keyViewArray = [
    new KeyView('自定义标签', CostomKeyPage, false, FLAG_LANGUAGE.flage_key),
    new KeyView('页签排序', SortKeyPage, false, FLAG_LANGUAGE.flage_key),
    new KeyView('删除标签', CostomKeyPage, true, FLAG_LANGUAGE.flage_key)
];

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        // 初始化languageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flage_key);
        this.state = {
            languages: [], //标签数组
            isVisible: false, // 是否显示弹出框
            buttonRect: {}, //弹框显示位置
        }
    }

    onSeach() {
        this.props.navigator.push({
            component: SearchPage,
            params: {
                ...this.props,
            }
        })
    }

    // 组件刚完成初始化
    componentDidMount() {
        // 加载数据
        this.loadData();
    }

    //从Dao中加载标签数据
    loadData() {
        // 加载标签
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    // 显示弹出框
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    // 关闭弹出框
    closePopover() {
        this.setState({isVisible: false});
    }

    // 选中标签
    onSelectKeyView(keyView) {
        this.setState({
            isVisible: false
        });
        this.props.navigator.push({
            component: keyView.component,
            params: {
                ...this.props,
                isRemoveKey: keyView.isRemoveKey,
                flag: keyView.flag
            }
        })
    }

    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor="#2196f3"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="mintcream"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {this.state.languages.map((item, i, arry) => {
                    return item.checked && <PopularTab key={i} tabLabel={item.name} {...this.props}/>
                })}
            </ScrollableTabView>
            : null
        let keyView =
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement="bottom"
                onClose={() => {
                    this.closePopover()
                }}
                contentStyle={{backgroundColor: '#000', opacity: 0.7}}
            >
                {keyViewArray.map((keyView, i, arry) => {
                    return <Text key={i}
                                 onPress={() => {
                                     this.onSelectKeyView(keyView)
                                 }}
                                 style={{
                                     fontSize: 16,
                                     color: '#fff',
                                     paddingHorizontal: 8,
                                     marginVertical: 6,
                                     textAlign: 'center'
                                 }}
                    >{keyView.showName}</Text>
                })}

            </Popover>;

        return <View style={styles.container}>
            {/*导航栏*/}
            <NavigatorBar
                title='最热'
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
                leftButton={
                    <View></View>
                }
                rightButton={
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.onSeach()
                            }}
                        >
                            <Image style={{width: 26, height: 26, margin: 12}}
                                   source={require('../../res/images/ic_search_white_48pt.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            ref="button"
                            onPress={() => this.showPopover()}
                        >
                            <Image style={{width: 26, height: 26, margin: 12}}
                                   source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
                        </TouchableOpacity>
                    </View>
                }
            />
            {/*页签*/}
            {content}
            {keyView}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});