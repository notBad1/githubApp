/**
 * Created by Administrator on 2018-8-27.
 * 数据库中增删改查 用户是否收藏
 */
import {
    AsyncStorage
} from 'react-native';

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {
    // flag 传入模块标识
    constructor(flag) {
        this.flag = flag;
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
    }

    /**
     * 项目收藏，保存用户收藏的项目
     * @param key  项目id或者项目名称
     * @param val  收藏的项目
     * @param callBack
     */
    saveFavoriteItem(key, val, callBack) {
        AsyncStorage.setItem(key, val, (error) => {
            if (!error) {
                // 将key值保存下来
                this.updateFavoriteKeys(key, true);
            }
        })
    }

    /**
     * 取消收藏， 删除已经收藏的项目
     * @param key
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error) => {
            if (!error) {
                // 将key值删除
                this.updateFavoriteKeys(key, false);
            }
        })
    }

    /**
     * 获取用户收藏项目所有的key集合
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    /**
     * 更新项目  key集合
     * @param key
     * @param isAdd  true添加，false 删除
     */
    updateFavoriteKeys(key, isAdd) {
        // 获取用户保存的所有的key集合获取出来
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                //找出 用户操作的key在key集合的索引值
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favoriteKeys.push(key);
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index, 1);
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
            }
        });
    }
}
