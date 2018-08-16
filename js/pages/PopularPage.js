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
import PopularTab from '../common/PopularTab'
import CostomKeyPage from '../common/CostomKeyPage'
// 读取本地标签
import LanguageDao, {FLAG_LANGUAGE}  from '../expand/dao/LanguageDao'


export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        // 初始化languageDao
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flage_key);
        this.state = {
            languages: [] //标签数组
        }
    }

    onSeach() {

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

    render() {
        let content = this.state.languages.length>0?
            <ScrollableTabView
                tabBarBackgroundColor="#2196f3"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="mintcream"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {this.state.languages.map((item, i, arry) => {
                    return item.checked && <PopularTab key={i} tabLabel={'' + item.name}/>
                })}
            </ScrollableTabView>
            : null

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
                            onPress={() => {
                                this.props.navigator.push({
                                    component: CostomKeyPage,
                                    params: {...this.props}
                                })
                            }}
                        >
                            <Image style={{width: 26, height: 26, margin: 12}}
                                   source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
                        </TouchableOpacity>
                    </View>
                }
            />
            {/*页签*/}
            {content}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    }
});