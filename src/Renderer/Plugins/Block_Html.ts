import { IRenderingEnine }                    from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                   from "../../Interfaces/IRenderingOption" ;
import { MarksRenderer }                      from "../../MarksRenderer"               ;
import { prepareInternals, processInternals } from "./Helper"                          ;

export class BlockHtmlRenderer implements IRenderingEnine {
  themeStyles          !: any                            ;
  globalRefs            : any                            ;
  private _succeeded    : boolean = false                ;
  public applyTo        : string[]           = ["BLOCK"] ;
  public options        : TRenderingOption   = {}        ;
  public content        : string             = ""        ;
  public domContent     : HTMLElement | null = null      ;
  public type           : string             = ""        ;
  public weight         : number             = 0         ;
  public cloneRenderer ?: () => MarksRenderer            ;

  render(): string {
    this._succeeded = false;
    
    prepareInternals(this);

    this.domContent = document.createElement(this.options.elt ?? "div");
    this.domContent.innerHTML= this.content;
   
    processInternals(this, "html");
    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "html") {
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