import { IRenderingEnine }        from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }       from "../../Interfaces/IRenderingOption" ;
import { applyStyle, processRef } from "./Helper"                          ;
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
import { IDocument } from "../../Interfaces/IDocument";

export class BlockImgRenderer implements IRenderingEnine {
  themeStyles          !: any                            ;
  globalRefs            : any                            ;
  private _succeeded    : boolean            = false     ;
  public applyTo        : string[]           = ["BLOCK"] ;
  public options        : TRenderingOption   = {}        ;
  public content        : string             = ""        ;
  public domContent     : IVDom_Element | null = null    ;
  public type           : string             = ""        ;
  public weight         : number             = 0         ;
  private document     !: IDocument                      ;
  public getDocument   ?: () => IDocument                ;

  render(): string {
    if (!this.document) this.document = this.getDocument!();

    this._succeeded = false;
    const payload = JSON.parse(`{ ${this.content} }`);

    this.domContent = this.document.createElement("img");
    this.domContent.setAttribute("alt"   , payload.alt);
    this.domContent.setAttribute("title" , payload.title);
    this.domContent.setAttribute("src"   , payload.src);

    applyStyle(this, "img");
    processRef(this);

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "img") {
      return true;
    }
    return false;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}