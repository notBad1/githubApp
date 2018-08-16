/**
 * Created by Administrator on 2018-8-9.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import NavigatorBar from './js/common/navigatorBar'

export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }

    renderButton (image) {
        return <TouchableOpacity
            onPress={()=>{
                this.props.navigator.pop();
            }}
        >
            <Image style={{width: 24, height: 24,margin: 15}} source={image}/>
        </TouchableOpacity>
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title= {'Girl'}
                    style={{
                        backgroundColor: '#ee6363'
                    }}
                    statusBar={{
                        backgroundColor: '#ee6363',
                    }}
                    leftButton={
                        this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
                    }
                    rightButton={
                        this.renderButton(require('./res/images/ic_star.png'))
                    }
                />
                <Text style={styles.text}>I am Girl</Text>
                <Text style={styles.text}>我收到了男孩送的:{this.props.word}</Text>
                <Text style={styles.text}
                      onPress={()=>{
                          this.props.onCallBack('一盒巧克力');
                          // 关闭当前页面
                          this.props.navigator.pop();
                      }}
                >回赠巧克力</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 22,
        color: '#333'
    },
    image:{
        width: 25,
        height: 25
    }

});