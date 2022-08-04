/*
 * @Author: hikari
 * @Date: 2022-04-12 17:30:49
 * @LastEditTime: 2022-04-14 10:28:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/types/theme.ts
 */
type ThemeType = 'primary' | 'warn' | 'danger' | 'info' | string;

export { ThemeType };

/**
 * 按纽主题
 */
export interface Theme {
    // 颜色 
    color? :string,
    // 字体颜色 
    fontColor? : string,
    // 鼠标放上去背景颜色 
    hoverColor?: string,
    // 鼠标放上去字体颜色 
    hoverFontColor? :string,
}

/**
 * 主题
 */
export const ButtonTheme: Record<ThemeType, Theme> = {
    primary: {
        color: "#2f79d0",
        fontColor: "white",
        hoverColor: "#4386D4"
    },
    warn: {
        color: "#f19035",
        fontColor: "white",
        hoverColor: "#f29b49",
    },
    danger: {
        color: "#d63230",
        fontColor: "white",
        hoverColor: "#da4644"
    },
    info: {
        color: "#BEBFC4",
        fontColor: "black",
        hoverColor: "#bcbcbc"
    }
}