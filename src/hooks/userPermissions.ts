/*
 * @Author: hikari
 * @Date: 2022-04-02 15:58:16
 * @LastEditTime: 2022-07-31 11:22:56
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/hooks/usePermission.ts
 */
import { useUserStore } from '@/stores/user'

export function usePermission() {
    const userStore = useUserStore( );

    /**
     * 检查权限 
     * @param accesses 
     */
    function _somePermissions(accesses: string []){
        return userStore.getPermissions.some( permission => {
             return accesses.includes( permission );
         });
    }

    // 指令 用于v-if
    function hasPermission( accesses: string[] ) :boolean{
        if(!accesses || !accesses.length ) return true;
        return _somePermissions( accesses );
    }

    // 是否包含所有指定的权限
    function hasEveryPermission( accesses: string[] ){
        return userStore.getPermissions.every( permission => {
            return accesses.includes( permission );
        })
    }

    // 包含某个权限
    function hasSomePermission( accesses: string[] ){
        if( !accesses || !accesses.length ) return true;
        return _somePermissions( accesses );
    }


    return { hasPermission, hasEveryPermission, hasSomePermission };
}