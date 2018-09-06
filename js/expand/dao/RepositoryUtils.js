/**
 * Created by Administrator on 2018-9-5.
 * 渲染数据工具类
 */

import {
    AsyncStorage
} from 'react-native';

import DataRepository, {FLAG_STORYGE} from './DataRepository'
import Utils from '../../util/Utils'



export default class RepositoryUtils {
    constructor(aboutCommon) {
        this.aboutCommon = aboutCommon;
        this.dataRepository = new DataRepository(FLAG_STORYGE.flag_my);
        this.itemMap = new Map();// 保存取出的数据
    }

    /**
     * 更新数据
     * @param k
     * @param v
     */
    updateData(k, v) {
        this.itemMap.set(k, v);
        let arr = [];
        for (let val of this.itemMap.values()) {
            arr.push(val)
        }
        // 通知aboutCommon组件，数据发生改变
        this.aboutCommon.onNotifyDataChange(arr);
    }

    /**
     * 获取指定url下个的数据
     * @param url
     */
    fetchRepository(url) {
        this.dataRepository.fetchRepository(url)
            .then(result => {
                if (result) {
                    // 如果数据不为空，就更新数据
                    this.updateData(url, result);
                    // 如果数据过时，就从网络上重新获取数据
                    if (!Utils.checkDate(result.update_date)) {
                        return this.dataRepository.fetchNetRepository(url);
                    }
                }
            })
            .then(item => {
                if (item) {
                    this.updateData(url, item);
                }
            })
            .catch(e => {

            })
    }

    /**
     * 批量获取一组urls对应的数据
     * @param urls
     */
    fetchRepositories(urls) {
        for (let i = 0, l = urls.length; i < l; i++) {
            let url = urls[i];
            this.fetchRepository(url);
        }
    }
}

