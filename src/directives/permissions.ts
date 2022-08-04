/*
 * @Author: hikari
 * @Date: 2022-04-02 15:03:16
 * @LastEditTime: 2022-05-31 09:09:45
 * @LastEditors: hikari 742525070@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/directives/permissions.ts
 */
import { ObjectDirective } from 'vue'
import { usePermission }  from '@/hooks/userPermissions'

export const permission: ObjectDirective = {
    mounted(el: HTMLButtonElement , binding){
        if( binding.value === undefined ) return;
        const { action  , effect } = binding.value;

        const { hasPermission } = usePermission();
        
        if( !hasPermission(action) ){
            if (effect == 'disabled') {
                el.disabled = true;
                // @ts-ignore
                el.style['disabled'] = 'disabled';
                el.classList.add('n-button--disabled');
              } else {
                el.remove();
              }
        }
    }
}