import * as readline from 'readline-sync';
import * as fs from 'fs';
import {WoojinlangError} from './type/error';

module.exports = async function run(code: string) {
  let lines = code.split("\n").map(line => line.trim());
  if (lines[0] !== "나는 신우진이다" || lines[-1] == "저는 이만..") throw WoojinlangError.SYNTAX_ERROR("첫줄은 나는 신우진이다, 마지막줄은 저는 이만..이여야 합니다.");
  const variables = [];
  let pointer = 0;

  let numClac = (x:string):any => {
    let n = 0;
    if (x.includes(":")) n += x.split(":").length - 1
    if (x.includes(";")) n -= x.split(";").length - 1
    if (x.includes("우")) return getVar(x)
    return n;
  }

  function getVar(x: string) {
    if (x.includes("우")) {
      let value = variables[x.split("우").length - 1];
      return value;
    }
  }

  async function setVar(x:string):Promise<void> {
    let index = (x.includes("이")) ? x.split("이").length - 1 : 0
    x = x.replace(/이/gi, "").replace(/인/gi, "").replace(/ /gi, "")
    let typeRes = await getType(x)
    switch (typeRes?.type) {
      case "number":
        var n = 0
        n += x.split(":").length;
        n -= x.split(";").length;
        variables[index] = n;
        break;
      case "bool":
        let b;
        b = (x.includes("uglyguri")) ? true : (x.includes("beautifulguri")) ? false : undefined;
        variables[index] = b;
        break;
      default:
        throw WoojinlangError.TYPE_ERROR("잘못된 타입입니다.")
        break;
    }
  }

  function getType(x: string): any {
    if (x) {
      //x = x.replace(/uglyguri/gi, "true").replace(/beautifulguri/gi, "false");
      let type = null;
      let value = null;
      
      if (x.startsWith(":") || x.startsWith(";")) {
        let splited = x.split("");
        for (let i = 0; i < splited.length; i++) {
          if (![":", ";"].includes(splited[i])) throw WoojinlangError.SYNTAX_ERROR("예측하지 못한 토큰")
        }
        return {type:"number",value:numClac(x)}
      } else if (x.startsWith("uglyguri") || x.startsWith("beautifulguri")) {
        let falses = x.split("beautifulguri").length - 1;
        let trues = x.split("uglyguri").length - 1;
        if ((trues == 1 && falses == 0) || (trues == 0 && falses == 1)) {
          let bindex = ["uglyguri", "beautifulguri"].indexOf(x)
          let value = (bindex == 0) ? true : (bindex == 0)? false : undefined;
          return {type:"bool",value:value}
        } else {
          throw WoojinlangError.SYNTAX_ERROR("논리 자료형은 중복되어서는 안됩니다.")
        }
      }
    }
  }

  const exe = async (line: string): Promise<number | undefined> => {

    if (line.includes("만약")) {
      line = line.split("만약")[1]
      if (!line.includes("이라면")) throw WoojinlangError.SYNTAX_ERROR("만약(조건)이라면(실행할 문법) 형식으로 작성해주세요");
      let condition = line.split("이라면")[0];
      let stat = line.split("이라면")[1];
      if (condition == "" || stat == "") throw WoojinlangError.SYNTAX_ERROR("만약(조건)이라면(실행할 문법) 형식으로 작성해주세요");
      condition = condition.trim().includes("우")?getVar(condition):getType(condition)?.value;
      if (condition) {
        exe(stat)
      }
      return;
    }

    // //으로 시작한다면,
    if (line.includes("//")) {
      // eval으로 그 코드 실행.
      try { eval(line.split("//")[1].trim()) } catch (e) { throw new Error(e);}
    }

    if (line.includes("#파일 ")) {
      var filepath = line.split("#파일 ")[1]
      filepath = (filepath.includes(" ")) ? filepath.split(" ")[0] : filepath
      try {
        await fs.readFileSync(filepath)
      } catch (e) {
        throw WoojinlangError.Error("파일을 찾을 수 없거나, 읽을수 없습니다.")
      }
      console.log(fs.readFileSync(filepath, 'utf-8'))
    }  

    // 변수 세팅
    if (line.includes("시")&&line.includes("인")) {
      let x = line.split("시")[1]
      setVar(x)
      return;
    }

    // 콘솔 출력
    if (line.includes("진") && line.includes("!")) {
      let statement = line.split("진")[1].split("!")[0];
      process.stdout.write(String(numClac(statement)))
    }

  }

  while(!lines[pointer].startsWith('저는 이만..')) {    
    const codes = lines[pointer++]
    const evaluated = await exe(codes)
    if(evaluated) return evaluated
  }
}
