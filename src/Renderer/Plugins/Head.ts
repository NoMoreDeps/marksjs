import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processInternals }                    from "./Helper"                          ;

export class HeadRenderer implements IRenderingEnine {
  themeStyles      !: any                       ;
  globalRefs : any                                        ;
  private _succeeded: boolean = false;
  public applyTo    : string[]           = ["HEAD"] ;
  public options    : TRenderingOption   = {}       ;
  public content    : string             = ""       ;
  public domContent : HTMLElement | null = null     ;
  public type       : string             = ""       ;
  public weight      : number                = 0           ;

  render(): string {
    let rgx = /^\s*(?<header>#{1,6})(?<content>.*)/;
    this._succeeded = rgx.test(this.content);

    if (this._succeeded) {
      prepareInternals(this);

      const rgxRes  = rgx.exec(this.content);
      const header  = rgxRes?.groups?.["header"]  ?? "";
      const content = rgxRes?.groups?.["content"] ?? "";

      this.content = `<h${header.length}>${content}</h${header.length}>`;
      this.domContent = document.createElement(`div`);
      this.domContent.innerHTML = this.content;
      this.domContent = this.domContent.children.item(0) as HTMLElement;

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