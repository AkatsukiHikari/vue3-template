/*
 * @Author: hikari
 * @Date: 2022-04-04 09:03:58
 * @LastEditTime: 2022-04-04 09:26:10
 * @LastEditors: Please set LastEditors
 * @Description: 判断各种类型
 * @FilePath: /cloud-desktop-plus/src/utils/is/index.ts
 */
const toString = Object.prototype.toString;

export function is(val: unknown , type: string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * 是否为函数
 * @param val 
 * @returns 
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is( val , 'Function');
}

/**
 * 判断是否已定义
 * @param val 
 * @returns 
 */
export function isDef<T = unknown> (val? : T): val is T  {
    return typeof val !== 'undefined';
}

/**
 * 判断是否是对象
 * @param val 
 * @returns 
 */
export const isObject = (val : any) : val is Record<any, any> => {
    return val !== null && is (val , 'Object');
}

/**
 * 判断是否是时间日期
 * @param val 
 * @returns 
 */
export const isDate = (val : unknown) : val is Date => {
    return is(val , "Date" );
}

/**
 * 判断是否为数字 
 * @param val
 * @returns 
 */
export const isNumber = (val : unknown) : val is number => {
    return is (val , "Number");
}

/**
 * 判断是否为字符串
 * @param val 
 * @returns 
 */
export const isString = (val : unknown) : val is string => {
    return is (val , "String");
}

/**
 * 判断是否为boolean
 * @param val 
 * @returns 
 */
export const isBoolean = (val: unknown) : val is boolean => {
    return is (val , 'Boolean');
}

/**
 * 判断是否为数组
 * @param val 
 * @returns 
 */
export const isArray = (val: any): val is Array<any> => {
    return val && Array.isArray( val );
}

