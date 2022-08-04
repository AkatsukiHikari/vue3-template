/*
 * @Author: hikari
 * @Date: 2022-04-15 13:26:03
 * @LastEditTime: 2022-04-15 15:34:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/types/index.ts
 */

export type BackgroundSize = "bg-cover" | "bg-contain" | "bg-repeat";

// 背景图配置
export type BackgroundImage = {
    // 背景图类型  local 本地图片 net 网络图片
    type: 'local' | 'net',

    // 图片填充类型
    size?: BackgroundSize,

    // 开启模糊效果
    blur?: boolean,

    // 高度
    bright?: number,

    // 文件路径
    url? : string,
}

// 水印设置
export interface WatermarkSetting {
    // 水印类型 本地图片 | 网络图片 | 文本
    type : 'local-image' | 'net-image' | 'text',
    // 是否跨越边界线
    cross? : boolean,
    // 旋转角度
    rotate?: number,
    // 宽度
    width?: number,
    // 高度
    height? :number,

    // x轴间隔
    xOffset?: number,
    // y轴间隔
    yOffset? : number,

    // -------- 文本模式 ------------
    // 水印文本信息
    content?: string,
    // 字体大小
    fontSize?:  number,
    // 字体颜色 
    fontColor?: string,

    // -------- 图片模式 ----------
    // 图片路径
    image?: string,
    // 图片不透明度
    imageOpacity?: number,
    
}   

// 主题配置
export type SystemTheme = {
    // 背景是纯色还是图片
    background?: "image" | "color",
    backgroundColor?: string,
    backgroundImage?: BackgroundImage,
    barColor? :string,
    darkMode?: boolean
}
