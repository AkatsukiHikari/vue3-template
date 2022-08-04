/*
 * @Author: hikari
 * @Date: 2022-04-25 09:01:36
 * @LastEditTime: 2022-07-31 20:11:14
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/api/user/index.ts
 */
import { request } from '@/utils/http/axios/request'
import { make_parma } from '@/utils/utils';

export interface loginForm{
    username: string,
    password: string,
}

export const login = ( params:loginForm ) => {
    return request({
        url: '/login',
        method: 'POST',
        params,
    },{});
}

export const get_user_profile = () => {
    return request({
        url: "/userinfo/user/getUserProfile",
        method: "GET",
    }, {});
}

export const user_logout = () => {
    return request({
        url: "/auth/oauth2/logout",
        method: "POST",
    }, {});
}

