/**
 * Created by Administrator on 2018-8-24.
 * 数据模型
 *
 */
// 参数 数据，选中状态，
export default function ProjectModel(item, isFavorite) {
    this.item = item; // 数据
    this.isFavorite = isFavorite; // 选中状态
}