/**
 * Created by Administrator on 2018-8-14.
 * 公用的工具方法
 */

import RepositoryDetail from '../pages/RepositoryDetail';

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
}