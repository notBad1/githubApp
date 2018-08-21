/**
 * Created by Administrator on 2018-8-14.
 * 从数据库中获取语言数据
 */
import {
    AsyncStorage
} from 'react-native';

// 导入默认自定义标签 导入JSON文件，JSON文件转化成json对象
import keys from '../../../res/data/keys.json'
import langs from '../../../res/data/langs.json'

// 设置模块标识导出，希望其他模块可以使用这个变量
export let FLAG_LANGUAGE = {
    flag_language: 'flag_language_language',//做为key存储到数据库中
    flage_key: 'flag_language_key'
}

export default class LanguageDao {
    // flag 传入模块标识
    constructor(flag) {
        this.flag = flag
    }

    // 从数据库中获取语言或标签
    fetch(url) {
        return new Promise((resolve, reject) => {
            // 获取当前标识模块
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (!error) {
                    if (result) {
                        try {
                            resolve(JSON.parse(result))// 解析成对象
                        } catch (e) {
                            reject(e)
                        }
                    }else{ //用户第一次进入时，数据库中没有数据，就使用默认标签和语言
                        let data= this.flag === FLAG_LANGUAGE.flage_key ? keys: langs
                        // 把数据保存到数据库中
                        this.save(data);
                        // 把数据返回给调用者
                        resolve(data);
                    }
                } else {
                    reject(error)
                }
            });
        })

    }


    // 向数据库中保存数据
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{})
    }
}