/*
 * @Author: hikari
 * @Date: 2022-04-05 09:05:02
 * @LastEditTime: 2022-07-31 09:12:25
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/utils/http/axios/request.ts
 */
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import Storage from '@/utils/storage'
import { ACCESS_TOKEN } from '@/types/mutation-types'

const UNKNOWN_ERROR = '请求发生错误，请重试';

const service = axios.create({
    timeout: 6000,
})

export interface RequestOptions{
    // 访问这个接口是不是需要权限 
    permCode?: string,

    // 是否直接取data
    isGetDataDirectly?: boolean,

    // 请求成功的提示信息
    successMsg?:string,

    // 请求失败的提示信息
    errorMsg?: string,
}

service.interceptors.request.use(
    (config) => {
        const token = Storage.get( ACCESS_TOKEN );
        if( token && config.headers ){
            config.headers["Authorization"] = token;
        }
        return config;
    },
    error => {
        Promise.reject( error );
    }
)

service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if( res.code !== 0){
            // 403未登录
            if(res.code == 403){
                window.open(`${import.meta.env.VITE_CLOUD_SSO}?redirect=${window.location.href}`,'_self');
                return Promise.reject()
            }else{
                window.$message.error(res.message || UNKNOWN_ERROR);
                const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };           
                return Promise.reject( error );
            }           
        }else{
            return res;
        }
    },
    error => {
        const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
        window.$message.error(errMsg);
        error.message = errMsg;
        return Promise.reject(error);
    }
)

export type Response<T = any> = {
    code: number,
    message: string ,
    count?: number,
    data: T
}

export type BaseResponse <T = any > = Promise<Response<T>>;


export const request = async <T = any>(
    config: AxiosRequestConfig,
    options: RequestOptions
): Promise<T> => {
    try{
        const { successMsg, errorMsg, permCode, isGetDataDirectly = false } = options;
        const res = await service.request(config);
        successMsg && window.$message.success(successMsg);
        errorMsg && window.$message.error(errorMsg);
        return isGetDataDirectly ? res.data : res;
    }
    catch( error:any ){
        return Promise.reject( error );
    }
}