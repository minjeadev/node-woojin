export class WoojinlangError {
  private version = "v1.0.0"

  static Error = (message:string) => {
    let err = new Error(message);
    err.name = 'WoojinError';
    return err
  };
  static UNEX_TOKEN = (token:string) => {
    let err = new Error(`예기치 않은 토큰: ${token}`);
    err.name = 'SyntaxError';
    return err
  };
  static SYNTAX_ERROR = (message:string) => {
    let err = new Error(message);
    err.name = 'SyntaxError';
    return err
  };

  static TYPE_ERROR = (message:string) => {
    let err = new Error(message);
    err.name = 'TypeError';
    return err
  };
}
