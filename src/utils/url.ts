/*
 * @Author: hikari
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/utils/url.ts
 */
/**
 * 将对象拼接到参数中
 * @param baseUrl 
 * @param obj 
 * @returns 
 */
export const setObjToUrlParams = (baseUrl: string , obj: Record<string, any> ): string => {
    let parameters = '';
    let url = '';
    
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }

    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
      url = baseUrl + parameters;
    } else {
      url = baseUrl.replace(/\/?$/, '?') + parameters;
    }

    return url;
}

/**
 * 获取图片的路径
 * @param path 
 * @returns 
 */
export const getImageUrlByPath = ( path: string ): string => {
  const url:string = new URL( `../assets/${path}` , import.meta.url).href;
  return url;
}