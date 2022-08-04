/**
 * 用于请求接口时通用添加loading
 */
import { isReactive , isRef } from 'vue'

const setLoading = ( loading:any , val:Boolean  ) => {
    if( loading != undefined ){
        if( isReactive (loading) ){
            loading.loading = val;
        } else if( isRef( loading ) ){
            loading.value = val;
        }
    }
}

export const async = ( func: Promise<any> , loading: Boolean ) =>{
    setLoading( loading , true );

    func.finally(() => { setLoading(loading , false ) })
}