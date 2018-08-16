/**
 * Created by Administrator on 2018-8-14.
 * AsyncStorage基本使用案例
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TextInput
} from 'react-native';

import NavigatorBar from './js/common/navigatorBar'

// 导入第三方组件
import Toast, {DURATION} from 'react-native-easy-toast';

const KEY = 'text';

export default class AsyncStorageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // 保存
    onSave() {
        // 三个参数： key，value，回调函数：参数是错误
        AsyncStorage.setItem(KEY, this.text, (error) => {
            if (!error) {
                // 如果没有错误，提示保存成功
                this.toast.show('保存成功', DURATION.LENGTH_LONG);
            } else {
                this.toast.show('保存失败', DURATION.LENGTH_LONG);
            }
        })
    }

    // 删除
    onRemove() {
        AsyncStorage.removeItem(KEY, (error) => {
            if (!error) {
                this.toast.show('删除成功', DURATION.LENGTH_LONG);
            } else {
                this.toast.show('删除失败', DURATION.LENGTH_LONG);
            }
        })
    }

    // 取出
    onFetch() {
        // 两个参数： key,回调函数：错误信息，结果
        AsyncStorage.getItem(KEY, (error, result) => {
            if (!error) {
                // 如果没有错误
                if (result !== '' && result !== null) {
                    this.toast.show('取出内容  为:' + result, DURATION.LENGTH_LONG);
                } else {
                    this.toast.show('取出的内容不存在', DURATION.LENGTH_LONG);
                }

            } else {
                this.toast.show('取出失败', DURATION.LENGTH_LONG);
            }
        })
    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title={'AsyncStorage基本使用案例'}
                style={{
                    backgroundColor: '#2196f3'
                }}
                statusBar={{
                    backgroundColor: '#2196f3'
                }}
            />
            <TextInput style={{height: 50, margin: 10}}
                       onChangeText={text => this.text = text}
            />
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}
                      onPress={() => this.onSave()}
                >保存</Text>
                <Text style={styles.text}
                      onPress={() => this.onRemove()}
                >移除</Text>
                <Text style={styles.text}
                      onPress={() => this.onFetch()}
                >取出</Text>
            </View>
            <Toast ref={toast => {
                this.toast = toast
            }}/>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 22,
        color: '#333',
        paddingHorizontal: 10
    }
});