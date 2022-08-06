/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-07-31 19:48:01
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 16:11:56
 * @FilePath: /vue3-template/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { RouteRecordRaw } from 'vue-router';
import { isNavigationFailure, Router } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useAsyncRouteStore } from '@/stores/router';
import { ACCESS_TOKEN } from '@/types/mutation-types';
import { storage } from '@/utils/Storage';
import { PageEnum } from '@/enums/pageEnums';
import { constantRouterIcon } from "./routerIcon";

import generatedRoutes from 'virtual:generated-pages'

/**
 * 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
 export const routerGenerator = (routerMap: any): any[] => {
    return routerMap.map((item:any) => {
        const meta = item.meta || {}
        const currentRouter: any = {
            path: `${item.path}`,
            // 路由名称
            name: item.name || '',
            // s路由对应页面的 组件
            component: item.component,
            // meta: 页面标题, 菜单图标
            meta: {
                ...meta,
                label: meta.title,
                // @ts-ignore
                icon: constantRouterIcon[meta.icon] || null,
            },
        };
  
      // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
      currentRouter.path = currentRouter.path.replace('//', '/');
      // 重定向
      item.redirect && (currentRouter.redirect = item.redirect);
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        //如果未定义 redirect 默认第一个子路由为 redirect
        !item.redirect && (currentRouter.redirect = `${item.path}${item.children[0].path}`);
        // Recursion
        currentRouter.children = routerGenerator(item.children);
      }
      return currentRouter;
    });
};
  

export const generatedMenus = () => {
    const userStore = useUserStore();
    const asyncRouteStore = useAsyncRouteStore();
    let accessorRouterMap = new Map<string, string>();
    generatedRoutes.map( (router:any) => {
        const baseRoute = router.meta.baseRoute;
        if( baseRoute ){
            const parent_router = accessorRouterMap.get( baseRoute ) ;
            // @ts-ignore
            const children = parent_router.children || [];
            children.push( router );
            // @ts-ignore
            parent_router.children = children;
        }else{
            accessorRouterMap.set( router.name , router );
        }
    })

    const accessRouter = Array.from( accessorRouterMap.values() )

    const menus = routerGenerator( accessRouter );
    asyncRouteStore.setMenus( menus );
}

/**
 * @description: 
 * 路由守卫
 * @return {*}
 */
const LOGIN_PATH = PageEnum.LOGIN_URL;

const whitePathList = [LOGIN_PATH]; // no redirect whitelist

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // @ts-ignore
    const Loading = window['$loading'] || null;
    Loading && Loading.start();
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.HOME_URL);
      return;
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    const token = storage.get(ACCESS_TOKEN) || "token";

    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }
    


    next();
    Loading && Loading.finish();
  });

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      //console.log('failed navigation', failure)
    }
    const asyncRouteStore = useAsyncRouteStore();
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents;
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name;
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName);
      if (index != -1) {
        keepAliveComponents.splice(index, 1);
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
    // @ts-ignore
    const Loading = window['$loading'] || null;
    Loading && Loading.finish();
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
