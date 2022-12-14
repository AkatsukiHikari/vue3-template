/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 17:29:02
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 17:33:31
 * @FilePath: /vue3-template/src/router/base.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const RedirectRoute: any = {
  path: '/redirect',
  name: 'Redirect',
  component: import('@/layouts/index.vue'),
  meta: {
    title: 'Redirect',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/pages/redirect/index.vue'),
      meta: {
        title: 'Redirect',
        hideBreadcrumb: true,
      },
    },
  ],
};
