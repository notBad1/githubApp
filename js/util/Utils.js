/**
 * Created by Administrator on 2018-8-14.
 * 公用的工具方法
 */

export default class Utils {
    /**
     * 检查 item是否被收藏过
     * @param item
     * @param items
     * @returns {boolean}
     */
    static checkFavorite(item, items) {
        for (let i = 0, l = items.length; i < l; i++) {
            let key = item.id ? item.id.toString() : item.fullName.toString();
            if (key === items[i]) {
                return true
            }
        }
        return false
    }
}