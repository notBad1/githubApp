/**
 * Created by Administrator on 2018-9-4.
 * 自定义主题
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    TouchableHighlight,
    Platform,
    DeviceEventEmitter
} from 'react-native';

// 自定义主题颜色
import {ThemeFlags} from '../../../res/styles/ThemFactory'
import ThemeDao from '../../expand/dao/ThemeDao'


export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();
        this.state = {};
    }

    onSelectedTheme(themeKey){
        this.props.onClose(themeKey);
        this.themeDao.save(ThemeFlags[themeKey]);
    }

    getItem (themeKey){
        return (
            <TouchableHighlight
                style={{flex:1}}
                underlayColor='#fff'
                onPress={()=>this.onSelectedTheme(themeKey)}
            >
                <View style={[{backgroundColor: ThemeFlags[themeKey]},styles.themeItem]}>
                    <Text style={styles.themeText}>{themeKey}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderThemeItems() {
        let Views = [];
        // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i+=3) {
            let key1= keys[i],key2=keys[i+1],key3= keys[i+2];
            Views.push(
                <View key={i} style={{flexDirection: 'row'}}>
                    {this.getItem(key1)}
                    {this.getItem(key2)}
                    {this.getItem(key3)}
                </View>
            )
        }
        return Views;

    }

    renderContentView() {
        return (
            <Modal
                animationType="slide" // 动画
                transparent={true}  //透明显示
                visible={this.props.modalVisible} // 显示模态框
                onRequestClose={() => { // 关闭模态框
                    this.props.onClose()
                }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        let view = this.props.modalVisible?<View style={styles.container}>

            {this.renderContentView()}
        </View>: null;
        return view;
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios'?20:10,
        backgroundColor:'white',
        borderRadius:5,
        shadowColor:'gray',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5,
        shadowRadius:2,
        padding:5
    },
    themeText:{
        color:'white',
        fontWeight:'500',
        fontSize:16
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
});
