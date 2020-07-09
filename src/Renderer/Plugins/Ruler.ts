import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { applyStyle }       from "./Helper"                          ;

export class RulerRenderer implements IRenderingEnine {
  themeStyles      !: any                       ;
  globalRefs : any                                       ;
  private _succeeded : boolean               = false     ;
  public applyTo     : string[]              = ["RULER"] ;
  public options     : TRenderingOption      = {}        ;       
  public domContent  : HTMLElement | null    = null      ;
  public content     : string                = ""        ;
  public type        : string                = ""        ;
  public weight      : number                = 110       ;

  render(): string {
    this._succeeded = false;
    this.domContent = document.createElement("hr"); 
    if (this.options.variant === "dashed") {
      this.domContent.style.borderStyle = "dashed";
    }

    applyStyle(this, "hr");
    
    if (this.options.ref) {
      this.globalRefs[this.options.ref] = this.domContent;
      this.domContent = null;
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