/**
 * Created by Administrator on 2018-8-23.
 * 弹出框
 */

// 默认导出一个方法 ——两个参数
export default function KeyView(showName, component,isRemoveKey,flag) {
    this.showName = showName;
    this.component = component;
    this.isRemoveKey = isRemoveKey;
    this.flag = flag
}