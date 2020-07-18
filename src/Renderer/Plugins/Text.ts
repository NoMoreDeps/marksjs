import { IRenderingEnine }                     from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                    from "../../Interfaces/IRenderingOption" ;
import {  prepareInternals, processInternals } from "./Helper"                          ;
import { IVDom_Element }                       from "../../Interfaces/IVDom_Element"    ;
import { IDocument }                           from "../../Interfaces/IDocument"        ;

export class TextRenderer implements IRenderingEnine {
  themeStyles            !: any                                       ;
  globalRefs              : any                                       ;
  private _succeeded      : boolean               = false             ;
  public applyTo          : string[]              = ["TEXT", "BLANK"] ;
  public options          : TRenderingOption      = {}                ;
  public domContent       : IVDom_Element | null    = null            ;
  public content          : string                = ""                ;
  public type             : string                = ""                ;
  public weight           : number                = 0                 ;
  private document       !: IDocument                                 ;
  public getDocument     ?: () => IDocument                           ;
  
  render(): string {
    if (!this.document) this.document = this.getDocument!();
    //console.log(this.content, this.options, this.themeStyles)
    this._succeeded           = false;
    if (this.type === "BLANK") {
      this.domContent = this.document.createElement("p");
      for(let i=1; i < this.content.length; i+=2) {
        this.domContent.appendChild(this.document.createElement("br"));
      }
    } else {
      if (this.content.length > 0) {
        prepareInternals(this);

        this.domContent           = this.document.createElement(this.options.elt ?? "span");
        this.domContent.setInnerHTML(this.content.replace(/\n/g, "<br />"));
        
         processInternals(this, "text");
      }
    }

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    return (this as any).applyTo.includes(this.type);
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}