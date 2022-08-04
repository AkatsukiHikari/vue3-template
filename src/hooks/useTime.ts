/*
 * @Author: hikari
 * @Date: 2022-04-02 15:23:22
 * @LastEditTime: 2022-04-02 15:52:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/hooks/useTime.ts
 */
import { ref , onMounted , onUnmounted } from 'vue'

/**
 * 获取本地的时间
 */
export function useTime(){
    let timer: NodeJS.Timeout ;

    const year = ref<Number>( 0 );
    const month = ref<Number>( 0 );
    const week = ref<String>('');
    const day = ref<Number>( 0 );
    const hour = ref<number | string >( 0 );
    const minute = ref<number | string >( 0 );
    const second = ref<number | string > ( 0 );

    /**
     * 计时器更新时间
     */
    const updateTime = () => {
        const date = new Date();
        year.value = date.getFullYear();
        month.value = date.getMonth() + 1;
        week.value = '日一二三四五六'.charAt( date.getDay() );
        day.value = date.getDate();
        hour.value = (date.getHours() + '')?.padStart(2, '0') ||
            new Intl.NumberFormat(undefined , {minimumFractionDigits:2}).format( date.getHours() );

        minute.value =
            (date.getMinutes() + '')?.padStart(2, '0') ||
            new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
        second.value = date.getSeconds();
    }  

    // 执行一次
    updateTime();

    onMounted( () => {
        clearInterval( timer );
        timer = setInterval( () => updateTime() , 1000 );
    })

    onUnmounted( () => {
        clearInterval( timer );
    })

    return { month , day , hour , minute , second , week };
}