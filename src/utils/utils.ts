export const make_parma=( obj:any )=>{
    let params = '';
    for(var key in obj){
        let value = obj[key]
        params += key + "=" +value + '&';
    }
    return params.substr(0,params.length - 1);
}