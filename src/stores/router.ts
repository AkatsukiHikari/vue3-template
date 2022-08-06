/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-07-31 11:03:57
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-03 16:44:35
 * @FilePath: /vue3-template/src/stores/routeStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { useRoute,useRouter, RouteRecordRaw } from 'vue-router';

export interface IAsyncRouteState {
    menus: RouteRecordRaw[];
    addRouters: any[];
    keepAliveComponents: string[];
}



export const useAsyncRouteStore = defineStore({
    id: 'appRoute',
    state: (): IAsyncRouteState => ({
      menus: [],
      addRouters: [],
      keepAliveComponents: [],
    }),

    getters: {
      getMenus(): RouteRecordRaw[] {
        return this.menus;
      },
    },
    
    actions: {
      getRouters() {
        return toRaw(this.addRouters);
      },

      setMenus(menus: any[]) {
        // 设置路由菜单
        this.menus = menus;
      },

      setKeepAliveComponents(compNames :any) {
        // 设置需要缓存的组件
        this.keepAliveComponents = compNames;
      },
      

    }

  });