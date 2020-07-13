import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;

export class EscapeRenderer implements IRenderingEnine {
  globalRefs : any                                                                                         ;
  themeStyles      !: any                                                                         ;
  private _succeeded: boolean            = false                                                           ;
  public applyTo    : string[]           = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"] ;
  public options    : TRenderingOption   = {}                                                              ;
  public content    : string             = ""                                                              ;
  public domContent : HTMLElement | null = null                                                            ;
  public type       : string             = ""                                                              ;
  public weight      : number            = 150                                                             ;


  render(): string {

    let rgx = /\\\\/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#92;");
    }

    rgx = /\\&/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#38;");
    }

    rgx = /\\\-/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#45;");
    }

    rgx = /\\\./g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#46;");
    }
    
    rgx = /\\`/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#96;");
    }

    rgx = /\\\*/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#42;");
    }

    rgx = /\\_/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#95;");
    }

    rgx = /\\~/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#126;");
    }

  

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.type === "BLOCK") {
      return this.options.emp !== undefined ?? false;
    }

    return true;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}