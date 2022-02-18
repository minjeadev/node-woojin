import { WoojinlangError } from '../api/error';
import { Types } from '../type/index';
import { Console } from '../api/print';

const words = {
  reserved: ["나는 신우진이다", "저는 이만..","우","시","이","인","신","진",";",":","만약","이라면","#","//",":=","uglyguri","beautifulguri"]
}

export class Variable{

  static variables = [];
  static namedVariable = {};

  static async setVar(x:string):Promise<void> {
    let index = (x.includes("이")) ? x.split("이").length - 1 : 0
    x = x.replace(/이/gi, "").replace(/인/gi, "").replace(/ /gi, "")
    let typeRes = await Types.getType(x)
    switch (typeRes?.type) {
      case "number":
        var n = 0
        n += x.split(":").length;
        n -= x.split(";").length;
        this.variables[index] = n;
        break;
      case "bool":
        let b;
        b = (x.includes("uglyguri")) ? true : (x.includes("beautifulguri")) ? false : undefined;
        this.variables[index] = b;
        break;
      case "string":
        this.variables[index] = typeRes?.value;
        break;
      case "array":
        this.variables[index] = typeRes?.value;
        break;
      default:
        throw WoojinlangError.TYPE_ERROR("잘못된 타입입니다.")
        break;
    }
  }

  // 이름있는 변수 생성 함수 (이름:=값)
  static async setNamedVar(vname: string, vval: string) {
    for (let i = 0; i < words.reserved.length; i++) {
      if (vname.startsWith(words.reserved[i])) throw WoojinlangError.SYNTAX_ERROR("변수명이 시작할수 없는 단어로 시작하였습니다");
    }
    let typeRes = await Types.getType(vval)
    this.namedVariable[vname] = typeRes?.value;
  }

  static getVar(x: string) {
    if (x.includes("우")) {
      let value = this.variables[x.split("우").length - 1];
      if (value == undefined) throw WoojinlangError.TYPE_ERROR("존재하지 않는 변수입니다.");
      return value;
    } else {
      let val = (x.includes("[")) ? this.getArrContent(x) : this.namedVariable[x];
      if (val == undefined) throw WoojinlangError.SYNTAX_ERROR("unxpected variable: " + x);
      return val
    }
  }

  static getArrContent(x: string) {
    if (x.includes("[")) {
      let arr = this.getVar(x.split("[")[0]);
      if (Array.isArray(arr)) {
        let indexs: any = "["+x.split("[").splice(1, x.split("[").length).join("[");
        if(x.split("[").length-1!==x.split("]").length-1) throw WoojinlangError.SYNTAX_ERROR("잘못된 인덱스입니다.")
        indexs = indexs.split("[").join(",").split("]").join("").substring(1)
        indexs = (indexs.includes(",")) ? indexs.split(",") : [indexs]
        let array = arr;
        for (let i = 0; i < indexs.length; i++) {
          if (isNaN(indexs[i])) throw WoojinlangError.SYNTAX_ERROR("숫자가 아닌 값이 입력되었습니다.")
          if (!Number.isInteger(i)) throw WoojinlangError.SYNTAX_ERROR("정수가 아닌 값이 입력되었습니다.")
          if (array[Number(indexs[i])] == undefined) throw WoojinlangError.TYPE_ERROR("존재하지 않는 인덱스입니다.")
          array = array[Number(indexs[i])]
        }
        return array
      }
    }
  }
}
