/*
 * @Author: hikari
 * @Date: 2022-04-04 17:32:39
 * @LastEditTime: 2022-04-13 18:11:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/utils/dateUtils.ts
 */
import moment from 'moment'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'hh:mm A'

export const formatToDateTime = (
    date: Date | undefined,
    format: string = DATE_TIME_FORMAT
) =>{
    return moment( date ).format( format );
}

export const formatToDate = (
    date: Date | undefined,
    format: string = DATE_FORMAT
) =>  {
    return moment( date ).format( format );
}

export const formatToTime = (format: string = TIME_FORMAT) => {
    return moment().format( format );
}

export const formatToDateAndTime = ( dateFormat: string = DATE_FORMAT,
    timeFormat = TIME_FORMAT) => {
    return {
        date: moment().format( dateFormat ),
        time: moment().format( timeFormat ),
    }
}

