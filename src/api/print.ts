import { WoojinlangError } from '../api/error';
const cannotPrintables = ["array"];

export class Console {
  static Print(t: string, v: any) {
    if (cannotPrintables.includes(t)) {
      if (v == undefined) throw WoojinlangError.SYNTAX_ERROR("출력할수 없는 타입입니다.")
    }
    process.stdout.write(String(v)+"\n")
  }
}
