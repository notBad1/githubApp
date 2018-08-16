/**
 * Created by Administrator on 2018-8-13.
 * 获取数据模块
 */
export default class DataRepository {
    // 封装获取数据方法
    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
        })

    }
}