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

    /**
     * 检查项目更新时间
     * @param time  项目更新时间
     * @returns {boolean}  true 不需要更新，false 需要更新
     */
    static checkDate(time) {
        // 取出当前的日期
        let now = new Date();
        // 获取数据库保存的日期
        let t = new Date();
        t.setTime(time);
        // 对比日期相差多久
        if (now.getMonth() !== t.getMonth())return false; //如果两个日期的月份不相同，说明过期了
        if (now.getDay() !== t.getDay())return false; //如果两个日期的天不相同，说明过期了
        if (now.getHours() - t.getHours() > 4)return false; //设置数据过时的时间为4个小时
        return true; // 如果上述条件都满足，说明数据没有过时
    }
}