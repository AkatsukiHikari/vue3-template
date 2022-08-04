/*
 * @Author: Hikari 66936871+Hikari@users.noreply.github.com
 * @Date: 2022-07-23 15:34:30
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-07-31 20:44:36
 * @FilePath: /vue3-template/src/hooks/setting/useAppSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed } from 'vue'
import { useThemeStore } from "@/stores/theme"

export const useThemeSetting = () => {
    const themeStore = useThemeStore();

    const getDarkTheme = computed(() => themeStore.isDarkTheme);

    const getAppTheme = computed(() => themeStore.appTheme);

    const getAppThemeList = computed(() => themeStore.appThemeList);

    return {
        getDarkTheme,
        getAppTheme,
        getAppThemeList,
    };
}