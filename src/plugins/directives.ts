/*
 * @Author: hikari
 * @Date: 2022-04-16 10:01:07
 * @LastEditTime: 2022-04-16 11:06:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/plugins/directives.ts
 */
import { App } from 'vue'
import { permission } from '@/directives/permissions'

export function setupDirectives( app: any ){
    app.directive('permission' , permission );
}