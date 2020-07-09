import { IRenderingEnine }                     from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                    from "../../Interfaces/IRenderingOption" ;
import {  prepareInternals, processInternals } from "./Helper"                          ;

export class TextRenderer implements IRenderingEnine {
  themeStyles       !: any                                       ;
  globalRefs         : any                                       ;
  private _succeeded : boolean               = false             ;
  public applyTo     : string[]              = ["TEXT", "BLANK"] ;
  public options     : TRenderingOption      = {}                ;       
  public domContent  : HTMLElement | null    = null              ;
  public content     : string                = ""                ;
  public type        : string                = ""                ;
  public weight      : number                = 0                 ;

  render(): string {
    //console.log(this.content, this.options, this.themeStyles)
    this._succeeded           = false;
    if (this.type === "BLANK") {
      this.domContent = document.createElement("p");
      for(let i=1; i < this.content.length; i+=2) {
        this.domContent.appendChild(document.createElement("br"));
      }
    } else {
      if (this.content.length > 0) {
        prepareInternals(this);

        this.domContent           = document.createElement(this.options.elt ?? "span");
        this.domContent.innerHTML = this.content.replace(/\n/g, "<br />");
        
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