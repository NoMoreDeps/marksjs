import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { IVDom_Element } from "../../Interfaces/IVDom_Element";

export class EscapeRenderer implements IRenderingEnine {
  globalRefs : any                                                                                         ;
  themeStyles      !: any                                                                                  ;
  private _succeeded: boolean            = false                                                           ;
  public applyTo    : string[]           = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"] ;
  public options    : TRenderingOption   = {}                                                              ;
  public content    : string             = ""                                                              ;
  public domContent : IVDom_Element | null = null                                                          ;
  public type       : string             = ""                                                              ;
  public weight      : number            = 150                                                             ;


  render(): string {

    if (this.options.xss !== "false") {
      if (this.type !== "BLOCK" || (this.type === "BLOCK" && this.options.name !== "html")) {
        let _rgx = /\</g;
        this._succeeded = _rgx.test(this.content);
        if (this._succeeded) {
          return this.content.replace(_rgx, "&lt;");
        }
      }
    }

    if (this.type === "BLOCK") {
      this.options.emp !== undefined ?? false;
    }

    if (this.type === "BLOCK" && !this.options.emp) {
      this._succeeded = false;
      return this.content;
    }

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

    rgx = /\\=/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&#61;");
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

    rgx = /\\\</g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&lt;");
    }


    rgx = /\\\>/g;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "&gt;");
    }


  

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    return true;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}