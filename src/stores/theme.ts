/*
 * @Author: Hikari 66936871+Hikari@users.noreply.github.com
 * @Date: 2022-07-23 15:02:47
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 15:12:53
 * @FilePath: /vue3-template/src/stores/theme.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import themeSetting from '@/settings/themeSetting'

const  { isDarkTheme , appThemeList , appTheme } = themeSetting;

interface IAppState {
    // 主题风格
    appTheme: string,
    // 其它颜色主题
    appThemeList: string[],
    // 是否是深色主题
    isDarkTheme: boolean,
}

export const useThemeStore = defineStore({
    id: "app-theme",
    state: (): IAppState => ({
        appTheme,
        appThemeList,
        isDarkTheme,
    }),

    getters:{
        getDarkTheme():boolean {
            return this.isDarkTheme;
        },

        getAppTheme() :string {
            return this.appTheme;
        },
        
        getAppThemeList(): string[] {
          return this.appThemeList;
        },
    }
})