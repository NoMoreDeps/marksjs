import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { IVDom_Element }    from "../../Interfaces/IVDom_Element"    ;

export class LineRenderer implements IRenderingEnine {
  themeStyles       !: any                                                                                  ;
  globalRefs         : any                                                                                  ;
  private _succeeded : boolean = false                                                                      ;
  public applyTo     : string[]           = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"] ;
  public options     : TRenderingOption   = {}                                                              ;
  public content     : string             = ""                                                              ;
  public domContent  : IVDom_Element | null = null                                                          ;
  public type        : string             = ""                                                              ;
  public weight      : number            = 101                                                              ;

  render(): string {
    let rgx = /\~{2}(.*?)\~{2}/;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "<span style='text-decoration: line-through'>$1</span>");
    }

    rgx = /\~{1}(.*?)\~{1}/;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, "<span style='text-decoration: underline'>$1</span>");
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