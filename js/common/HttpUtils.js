/**
 * Created by Administrator on 2018-8-10.
 */
export default class HttpUtils {
    // 定义静态函数
    static get(url){
        // 返回Promise对象
        return new Promise((resolve, reject)=>{
            fetch(url)
                .then((response) => response.json()) // 解析json
                .then((result) => {    //获取解析出的json数据
                    resolve(result);
                })
                .catch((error) => { //发生异常
                   reject(error)
                });
        })
    }
    static post(url, data){
        // 返回Promise对象
        return new Promise((resolve, reject)=>{
            fetch(url,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // 返回数据类型
                    'Content-Type': 'application/json', //请求头
                },
                // 提交数据 ——对象序列化
                body: JSON.stringify(data)
            })
                .then((response) => response.json()) // 解析json
                .then((result) => {    //获取解析出的json数据
                    resolve(result);
                })
                .catch((error) => { //发生异常
                    reject(error)
                });
        })
    }
}