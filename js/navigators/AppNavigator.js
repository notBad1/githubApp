/**
 * Created by zhaolu on 2018-10-11.
 * 配置项目中所有页面的路由
 */

import {createStackNavigator} from 'react-navigation'

import WelcomePage from '../pages/WelcomePage'
import HomePage from '../pages/HomePage'
import RepositoryDetail from '../pages/RepositoryDetail'
import SearchPage from '../pages/SearchPage'
import CostomKeyPage from '../pages/tags/CostomKeyPage'
import FavoritePage from '../pages/FavoritePage'
import CustomThemePage from '../pages/tags/CustomThemePage'
import AboutAuthorPage from '../pages/tags/AboutAuthorPage'
import AboutPage from '../pages/tags/AboutPage'
import WebSitePage from '../pages/tags/WebSitePage'
import SortKeyPage from '../pages/tags/SortKeyPage'


export default AppNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    HomePage: {
        screen: HomePage
    },
    RepositoryDetail: {
        screen: RepositoryDetail
    },
    SearchPage:{
        screen: SearchPage
    },
    CostomKeyPage: {
        screen: CostomKeyPage
    },
    FavoritePage: {
        screen : FavoritePage
    },
    CustomThemePage:{
        screen: CustomThemePage
    },
    WebSitePage: {
        screen: WebSitePage
    }


})