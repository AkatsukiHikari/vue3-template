/*
 * @Author: Hikari 66936871+Hikari@users.noreply.github.com
 * @Date: 2022-07-29 11:27:38
 * @LastEditors: Hikari 66936871+Hikari@users.noreply.github.com
 * @LastEditTime: 2022-07-29 11:27:39
 * @FilePath: /vue3-template/src/enums/breakpointEnum.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum sizeEnum {
    XS = 'XS',
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
    XL = 'XL',
    XXL = 'XXL',
  }
  
  export enum screenEnum {
    XS = 480,
    SM = 576,
    MD = 768,
    LG = 992,
    XL = 1200,
    XXL = 1600,
  }
  
  const screenMap = new Map<sizeEnum, number>();
  
  screenMap.set(sizeEnum.XS, screenEnum.XS);
  screenMap.set(sizeEnum.SM, screenEnum.SM);
  screenMap.set(sizeEnum.MD, screenEnum.MD);
  screenMap.set(sizeEnum.LG, screenEnum.LG);
  screenMap.set(sizeEnum.XL, screenEnum.XL);
  screenMap.set(sizeEnum.XXL, screenEnum.XXL);
  
  export { screenMap };