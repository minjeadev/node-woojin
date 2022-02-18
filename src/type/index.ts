import { WoojinlangError } from '../api/error';
import { Variable } from '../variables';

export class Types {

  static numClac = (x:string):any => {
    let n = 0;
    if (x.includes(":")) n += x.split(":").length - 1
    if (x.includes(";")) n -= x.split(";").length - 1
    if (x.includes(":") || x.includes(";")) return n;
    if (x.includes("우")) return Variable.getVar(x);
    else return Variable.getVar(x);
  }
  
  static getType (x: string):any{
    if (x) {
      //x = x.replace(/uglyguri/gi, "true").replace(/beautifulguri/gi, "false");
      let type = null;
      let value = null;
      
      if (x.startsWith(":") || x.startsWith(";")) {
        let splited = x.split("");
        for (let i = 0; i < splited.length; i++) {
          if (![":", ";"].includes(splited[i])) throw WoojinlangError.SYNTAX_ERROR("예측하지 못한 토큰")
        }
        return { type: "number", value: this.numClac(x) }
      } else if (x.startsWith("uglyguri") || x.startsWith("beautifulguri")) {
        let falses = x.split("beautifulguri").length - 1;
        let trues = x.split("uglyguri").length - 1;
        if ((trues == 1 && falses == 0) || (trues == 0 && falses == 1)) {
          let bindex = ["uglyguri", "beautifulguri"].indexOf(x)
          let value = (bindex == 0) ? true : (bindex == 0) ? false : undefined;
          return { type: "bool", value: value }
        } else {
          throw WoojinlangError.SYNTAX_ERROR("논리 자료형은 중복되어서는 안됩니다.")
        }
      } else if (x.startsWith(`"`)) {
        let splited = x.split(`"`);
        if (splited.length-1<2) throw WoojinlangError.SYNTAX_ERROR("문자열을 닫아주세요")
        let value = x.split(`"`)[1].split(`"`)[0];
        return { type: "string", value: value }
      } else if (x.startsWith("[")) {
        let arr: any = x.substring(1);
        if (!arr.endsWith("]")) throw WoojinlangError.SYNTAX_ERROR("배열을 닫아주세요")
        arr = arr.slice(0,arr.length-1);
        if (!arr.includes(",")) throw WoojinlangError.SYNTAX_ERROR("배열에 원소를 2개 이상 담아주세요")
        arr = arr.split(",");
        let value = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].startsWith("[")) {
            let narr = arr.slice(i, arr.length);
            for (let n = 0; n < narr.length; n++) {
              if (narr[n].endsWith("]")) {
                let nvalue = narr.slice(0, n + 1).join(",");
                value.push(this.getType(nvalue)?.value);
                i += n
                break;
              }
            }
          } else {
            if (this.getType(arr[i])?.type == undefined) throw WoojinlangError.SYNTAX_ERROR("예측하지 못한 토큰")
            value.push(this.getType(arr[i])?.value)
          }
        }
        return { type: "array", value: value }
      }
    }
  }
}
