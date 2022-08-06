/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 10:00:50
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 19:42:40
 * @FilePath: /vue3-template/src/stores/tabs.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login' ,"/"];

//保留固定路由
function retainAffixRoute(list: any[]) {
    return list.filter((item) => item?.meta?.affix ?? false);
}

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

export const useTabsViewStore = defineStore({
    id: "useTabsViewStore",
    state: (): ITabsViewState => ({
        tabsList: [],
    }),

    getters: {},
    actions: {
        initTabs(routes: Array<RouteItem>) {
            // 初始化标签页
            this.tabsList = routes;
        },
        addTabs(route: RouteItem): boolean {
            // 添加标签页
            if (whiteList.includes(route.name)) return false;
            const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
            if (!isExists) {
                this.tabsList.push(route);
            }
            return true;
        },
        closeLeftTabs(route:RouteItem) {
            // 关闭左侧
            const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
            this.tabsList = this.tabsList.filter((item, i) => i >= index || (item?.meta?.affix ?? false));
        },
        closeRightTabs(route:RouteItem) {
            // 关闭右侧
            const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
            this.tabsList = this.tabsList.filter((item, i) => i <= index || (item?.meta?.affix ?? false));
            },
            closeOtherTabs(route:RouteItem) {
            // 关闭其他
            this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath || (item?.meta?.affix ?? false));
        },
        closeCurrentTab(route:RouteItem) {
            // 关闭当前页
            const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
            this.tabsList.splice(index, 1);
        },
        closeAllTabs() {
            // 关闭全部
            console.log(retainAffixRoute(this.tabsList));
            this.tabsList = retainAffixRoute(this.tabsList);
        },
    },
})