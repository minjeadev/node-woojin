import * as readline from 'readline-sync';
import * as fs from 'fs';

export class Woojinlang{
  public version = '0.0.1';

  static async run(code: string) {
    let lines = code.split("\n").map(line => line.trim());
    if (lines[0] !== "나는 신우진이다" || lines[-1] == "저는 이만..") throw new Error("SyntaxError: 첫줄은 나는 신우진이다, 마지막줄은 저는 이만..이여야 합니다.");
    const variables: number[] = [];
    let pointer = 0;

    let numClac = (x:string):number => {
      let n = 0;
      if (x.includes(":")) n += x.split(":").length - 1
      if (x.includes(";")) n -= x.split(";").length - 1
      if (x.includes("우")) n += variables[x.split("우").length - 1]
      return n;
    }

    function setVar(x:string):void {
      let n = 0
      let index = (x.includes("이")) ? x.split("이").length - 1 : 0
      n += x.split(":").length;
      n -= x.split(";").length;
      variables[index] = n;
    }

    const exe = async (line: string): Promise<number | undefined> => {

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
          console.log("파일을 읽을수 없습니다.")
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

}
