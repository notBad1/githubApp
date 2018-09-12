/**
 * Created by Administrator on 2018-8-14.
 * 公用的工具方法
 */

import RepositoryDetail from '../pages/RepositoryDetail';
import {FLAG_STORYGE} from '../expand/dao/DataRepository'
export default class ActionUtils {
    /**
     * 打开页面详情页
     * @param params 要传递一些参数
     */
    static onSelected(params) {
        let {navigator} = params;
        navigator.push({
            component: RepositoryDetail,
            params: {
                ...params
            }
        })
    }

    //收藏按钮的点击回调函数
    static onFavorite(item, isFavorite, favoriteDao, flag) {
        let key = flag === FLAG_STORYGE.flag_trending ? item.fullName.toString() : item.id.toString();
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
        } else {
            favoriteDao.removeFavoriteItem(key)
        }
    }
}