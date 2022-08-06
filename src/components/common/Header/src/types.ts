/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 14:15:32
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 14:24:34
 * @FilePath: /vue3-template/src/components/common/Header/src/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 点击头像弹出的选项
export type AvatarOption = {
    label: string,
    key: string,
}

export type IconOption = {
    iconName: string,
    tips: string,
    event?: object,
}