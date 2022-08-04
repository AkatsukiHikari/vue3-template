/*
 * @Author: hikari
 * @Date: 2022-04-04 16:47:11
 * @LastEditTime: 2022-04-04 16:51:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/enums/httpEnums.ts
 */
/**
 * @description: 请求结果集
 */
export enum ResultEnum {
    SUCCESS = 0,
    ERROR = -1,
    TIMEOUT = 10042,
    TYPE = 'success',
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // json
    TEXT = 'text/plain;charset=UTF-8',
    // form-data 一般配合qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  上传
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}