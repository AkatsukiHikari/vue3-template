import { defineStore } from 'pinia';
import { storage } from '@/utils/Storage';
import { login } from '@/api/user'
import { ACCESS_TOKEN, CURRENT_USER } from '@/types/mutation-types';
/*
 * @Author: hikari
 * @Date: 2022-04-05 09:06:53
 * @LastEditTime: 2022-08-06 19:21:57
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: 用户状态管理
 * @FilePath: /cloud-desktop-plus/src/stores/user.ts
 */


export interface IUserInfo {
    // 用户名
    userName?: string,
    // 手机号
    phone? :string,
    // 用户id
    id? :number,
    // 头像
    userAvatar?: string,
    // 地址
    address?:string,
    // 邮箱
    email? :string,
    // 备注
    remark?: string,
}

export interface IUserState {
    user?: IUserInfo,
    // 角色
    roles?: string[],
    // 权限 
    permissions? : string[],
}

export const useUserStore = defineStore("user-store",{
    state: ():IUserState => {
        return {
            user: {},
            roles: [],
            permissions: [],
        }
    },

    actions:{
        // 登录
        async login( userInfo:any ) {
            return Promise.resolve({
                code: 0
            })
            try {
                const response = await login(userInfo);
                const { result, code } = response;
                if (code === 0) {
                    const ex = 7 * 24 * 60 * 60 * 1000;
                    storage.set(ACCESS_TOKEN, result.token, ex);
                    storage.set(CURRENT_USER, result, ex);
                    this.setUserInfo(result);
                }
                return Promise.resolve(response);
            } catch (e) {
                return Promise.reject(e);
            }
        },

        logout(){
            this.setPermissions([]);
            this.setUserInfo({});
            storage.remove(ACCESS_TOKEN);
            storage.remove(CURRENT_USER);
            return Promise.resolve('');
        },
        /**
         * @description: 
         * 获取用户信息
         * 调用接口
         * @return {*}
         */        
        async getInfo() {

        },
        
        setUserInfo( userInfo: IUserInfo ){
            this.user = userInfo;
        },
        
        setPermissions(permissions: string[]){
            this.permissions = permissions;
        },

        setRoles( roles: string[] ){
            this.roles = roles;
        }
    },

    getters:{
        getUserInfo: ( state ) => {
            return state.user;
        },

        getPermissions: ( state ) => {
            return state.permissions || [];
        },
    }
})