/**
 * Created by Administrator on 2018-8-13.
 * 最热页面，趋势 ，页面显示每一列
 * 项目收藏
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import HTMLView from 'react-native-htmlview';


export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.porjectModel.isFavorite, //是否收藏
            favoriteIcon: this.props.porjectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        }
    }

    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.porjectModel.isFavorite);
    }

    onPressfavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.porjectModel.item, !this.state.isFavorite);
    }


    render() {
        let item = this.props.porjectModel.item ? this.props.porjectModel.item : this.props.porjectModel;
        let flag = this.props.flag;
        let description = flag === 'trending' && '<p>' + item.description + '</p>';
        let favoriteBut = <TouchableOpacity
            onPress={() => {
                this.onPressfavorite()
            }}
        >
            <Image style={{height: 22, width: 22, tintColor: '#2196f3'}}
                   source={this.state.favoriteIcon}/>
        </TouchableOpacity>;

        return <TouchableOpacity style={styles.container}
                                 onPress={this.props.onSelected}
        >
            <View style={styles.cell_container}>
                <Text
                    style={styles.title}>{flag === 'trending' ? item.fullName : item.full_name}</Text>

                {
                    flag === 'trending' ? <HTMLView
                        value={description}
                        onLinkPress={(url) => {
                        }}
                        stylesheet={{
                            p: styles.text,
                            a: styles.text
                        }}
                    /> :
                        <Text
                            style={styles.text}>{item.description}</Text>
                }


                {
                    flag === 'trending' &&
                    <Text style={styles.text}>Star: {item.meta}</Text>
                }

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: '#333',
                            fontSize: 14
                        }}>{flag === 'trending' ? 'Build by' : 'Author'}: </Text>
                        {
                            flag === 'trending' ?
                                item.contributors.map((item, i, array) => {
                                    return <Image style={{height: 22, width: 22}} key={i} source={{uri: array[i]}}/>
                                }) :
                                <Image style={{height: 22, width: 22}}
                                       source={{uri: item.owner.avatar_url}}/>
                        }

                    </View>
                    {
                        flag !== 'trending' && <Text style={{
                            color: '#666',
                            fontSize: 14
                        }}>Star: { item.stargazers_count}</Text>
                    }

                    {favoriteBut}
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
        shadowOffset: {width: 0.5, height: 0.5},
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
    },
    text: {
        color: '#666',
        fontSize: 14,
        marginBottom: 8
    }
});