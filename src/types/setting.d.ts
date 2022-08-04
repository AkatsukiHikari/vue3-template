/*
 * @Author: hikari
 * @Date: 2022-04-03 17:28:47
 * @LastEditTime: 2022-04-12 17:30:09
 * @LastEditors: Please set LastEditors
 * @Description: 设置类的自定义类
 * @FilePath: /cloud-desktop-plus/src/types/setting.d.ts
 */

// 导航菜单类型
export type MenuSetting = {
    minMenuWidht: number,
    menuWidth: number,
    fixed: boolean,
    collapsed: boolean
}

// 多标签类型
export type MultiTabSetting = {
    bgColor: string , 
    show: boolean,
    fixed: boolean,
}

// 面包屑类型
export type CrumbsSetting = {
    show: boolean,
    showIcon: boolean,
}