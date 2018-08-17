/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

// 导入页面组件
// import Boy from './boy'
import setup from './js/pages/setup'

// export default class githubApp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             // selectedTab: 'tb_popular'
//         }
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 {/*页面跳转*/}
//                 <Navigator
//                     // 初始化路由
//                     initialRoute={{
//                         component: Boy
//                     }}
//                     // 每个页面被渲染的时候会回调rederScene方法
//                     renderScene={(route, navigator) => {
//                         // 取出组件
//                         let Component = route.component;
//                         // 返回组件 navigator传给组件，还有其他属性
//                         return <Component navigator={navigator} {...route.params}/>
//                     }}
//                 ></Navigator>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     }
// });

AppRegistry.registerComponent('githubApp', () => setup);
