/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavigatorBar from '../common/navigatorBar'

// 导入第三方组件

export default class PopularPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'趋势'}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
            />
            <Text>趋势</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});