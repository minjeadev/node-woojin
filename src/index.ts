import * as readline from 'readline-sync';
import * as fs from 'fs';
import {WoojinlangError} from './api/error';
import { Types } from './type/index';
import { Variable } from './variables/index';
import { Console } from './api/print';

module.exports = async function run(code: string) {
  let lines = code.split("\n").map(line => line.trim());
  if (lines[0] !== "나는 신우진이다" || lines[-1] == "저는 이만..") throw WoojinlangError.SYNTAX_ERROR("첫줄은 나는 신우진이다, 마지막줄은 저는 이만..이여야 합니다.");
  let pointer = 0;
  function getNamedVars() {
    return Variable.namedVariable;
  }

  function getUnNamedVars() {
    return Variable.variables;
  }

  const exe = async (line: string): Promise<number | undefined> => {

    if (line.includes(":=")) {
      let varname = line.split(":=")[0].trim();
      let varvalue = line.split(":=")[1].trim();
      if (varname.includes(" ")) throw WoojinlangError.SYNTAX_ERROR("변수명에는 공백을 사용할 수 없습니다.")
      let varvalType = await Types.getType(varvalue);
      if (varvalType?.type == undefined) throw WoojinlangError.SYNTAX_ERROR("알수 없는 타입입니다.")
      Variable.setNamedVar(varname, varvalue);
    }

    if (line.includes("만약")) {
      line = line.split("만약")[1]
      if (!line.includes("이라면")) throw WoojinlangError.SYNTAX_ERROR("만약(조건)이라면(실행할 문법) 형식으로 작성해주세요");
      let condition = line.split("이라면")[0];
      let stat = line.split("이라면")[1];
      if (condition == "" || stat == "") throw WoojinlangError.SYNTAX_ERROR("만약(조건)이라면(실행할 문법) 형식으로 작성해주세요");
      condition = condition.trim().includes("우")?Variable.getVar(condition):Types.getType(condition)?.value;
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
      Variable.setVar(x)
      return;
    }

    // 콘솔 출력
    if (line.includes("진") && line.includes("!")) {
      let statement = line.split("진")[1].split("!")[0];
      Console.Print(Types.getType(statement)?.type, Types.numClac(statement));
    }

  }

  while(!lines[pointer].startsWith('저는 이만..')) {    
    const codes = lines[pointer++]
    const evaluated = await exe(codes)
    if(evaluated) return evaluated
  }
}
