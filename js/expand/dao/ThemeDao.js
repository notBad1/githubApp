/**
 * Created by Administrator on 2018-8-27.
 * 主题数据库
 */
import {
    AsyncStorage
} from 'react-native';
import ThemFactory, {ThemeFlags} from '../../../res/styles/ThemFactory'


const THEME_KEY = 'theme_key'; // 主题保存在数据库的标识

export default class ThemeDao {

    /**
     * 从数据库中获取当前的主题
     */
    getTheme(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(THEME_KEY,(e,r)=>{
                if(e){
                    reject(JSON.stringify(e));
                    return;
                }
                if(!r){
                    this.save(ThemeFlags.Default);
                    r=ThemeFlags.Default;
                }
                resolve(ThemFactory.createTheme(r))
            })
        })
    }
    /**
     * 将主题保存在数据库中的方法、
     *
     * @param themFlag
     */
    save(themFlag){
        AsyncStorage.setItem(THEME_KEY,themFlag,(e)=>{})
    }

}
