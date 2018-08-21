/**
 * Created by Administrator on 2018-8-13.
 * 最热页面，页面显示每一列
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';



export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <TouchableOpacity style={styles.container}
                                 onPress={this.props.onSelected}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{this.props.data.full_name}</Text>
                <Text style={{color: '#666', fontSize: 14, marginBottom: 8}}>{this.props.data.description}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#666', fontSize: 14}}>Author: </Text>
                        <Image style={{height: 22, width: 22}} source={{uri: this.props.data.owner.avatar_url}}/>
                    </View>
                    <Text style={{color: '#666', fontSize: 14}}>Star: {this.props.data.stargazers_count}</Text>
                    <Image style={{height: 22, width: 22}} source={require('../../res/images/ic_star.png')}/>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cell_container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 6,
        borderRadius: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
        marginHorizontal: 8,
        // 阴影效果
        // ios
        shadowColor: '#ddd',
        shadowOffset:{width: 0.5,height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android
        elevation: 2
    },
    title: {
        color: '#333',
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 5
    }
});