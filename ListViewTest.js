/**
 * Created by Administrator on 2018-8-10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'

import NavigatorBar from './js/common/navigatorBar'

let data = {
    "statusCode": 0,
    "result": [
        {
            "email": "s.martinez@jones.co.uk",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "c.gonzalez@rodriguez.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "r.lopez@walker.org",
            "fullName": "张三张三"
        },
        {
            "email": "x.hall@thomas.co.uk",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "o.moore@young.net",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "i.allen@allen.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "u.smith@robinson.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "l.williams@walker.io",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "e.martin@martinez.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "x.hernandez@anderson.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "k.brown@rodriguez.co.uk",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "i.moore@martin.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "h.hernandez@clark.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "a.perez@jackson.co.uk",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "h.jones@lee.edu",
            "fullName": "张三张三张三"
        }
    ]
};

export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            isLoading: true
        };
        this.onLoad();
    }

    renderRow(item) {
        return <View style={styles.row}>
            <TouchableOpacity
                onPress={() => {
                    this.toast.show('你点击了: ' + item.fullName, DURATION.LENGTH_LONG);
                }}
            >
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text style={styles.tips}>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }

    renderFooter() {
        return <View>
            <Image style={{width: 400, height: 300}}
                   source={{uri: 'http://t2.hddhhn.com/uploads/tu/201612/98/st93.png'}} />
            </View>
    }

    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading: false
            })
        },1000)
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title='ListViewTest'
                    style={{
                        backgroundColor: '#ee6363'
                    }}
                    statusBar={{
                        backgroundColor: '#ee6363',
                    }}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this.renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={() => this.renderFooter()}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad()}
                        />
                    }
                />
                <Toast ref={toast => {
                    this.toast = toast
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tips: {
        fontSize: 22,
        color: '#333'
    },
    row: {
        height: 80
    },
    line: {
        height: 1,
        backgroundColor: '#000'
    }
});