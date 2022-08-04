import { App } from 'vue'

const dyjs ={
    charCut(name:string,charLength:number){                                           // 控制面包屑 显示文字长度（指定字节数）
        let string = '';
        string = name.replace(/[\u4e00-\u9fa5]/g,"aa");
        if(string.length>charLength){
            let lengs = 0;
            for(let i=0; i<name.length; i++){
                let character = name.charAt(i);
                let reg = /^[\u4e00-\u9fa5]+$/;
                if(reg.test(character)){
                    lengs += 2;
                }
                else{
                    lengs += 1;
                }
                if(lengs>charLength){
                    string = `${name.substring(0,i)}...`;
                    break;
                }
                else if(lengs==charLength){
                    string = `${name.substring(0,i+1)}...`;
                    break;
                }
            }
            return string
        }
        else{
            return name
        }
    },
}

export default dyjs;