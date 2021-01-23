import { IRenderingEnine }                    from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                   from "../../Interfaces/IRenderingOption" ;
import { prepareInternals, processInternals } from "./Helper"                          ;
import { IDocument }                          from "../../Interfaces/IDocument"        ;
import { IVDom_Element }                      from "../../Interfaces/IVDom_Element"    ;

export class HeadRenderer implements IRenderingEnine {
  themeStyles            !: any                           ;
  globalRefs              : any                           ;
  private _succeeded      : boolean = false               ;
  public applyTo          : string[]           = ["HEAD"] ;
  public options          : TRenderingOption   = {}       ;
  public content          : string             = ""       ;
  public domContent       : IVDom_Element | null = null   ;
  public type             : string             = ""       ;
  public weight           : number                = 0     ;
  private document       !: IDocument                     ;
  public getDocument     ?: () => IDocument               ;
  render(): string {
    if (!this.document) this.document = this.getDocument!();
    
    let rgx = /^\s*(?<header>#{1,6})(?<content>.*)/;
    this._succeeded = rgx.test(this.content);

    if (this._succeeded) {
      prepareInternals(this);

      const rgxRes  = rgx.exec(this.content);
      const header  = rgxRes?.groups?.["header"]  ?? "";
      const content = rgxRes?.groups?.["content"] ?? "";

      this.content = `<h${header.length}>${content}</h${header.length}>`;
      this.domContent = this.document.createElement(`div`);
      this.domContent.setInnerHTML(this.content);
      this.domContent = this.domContent.getChildItem(0);

     processInternals(this, "head");
    }

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    return this.type === "HEAD";
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}