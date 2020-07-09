import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { MarksRenderer }    from "../../MarksRenderer"               ;

import { 
  applyStyle     , 
  processRef     , 
  formatMinSpace 
} from "./Helper";

export class BlockMarksRenderer implements IRenderingEnine {

  themeStyles       !: any                            ;
  globalRefs         : any                            ;
  private _succeeded : boolean = false                ;
  public applyTo     : string[]           = ["BLOCK"] ;
  public options     : TRenderingOption   = {}        ;
  public content     : string             = ""        ;
  public domContent  : HTMLElement | null = null      ;
  public type        : string             = ""        ;
  public weight      : number            = 0          ;
  
  public cloneRenderer ?: () => MarksRenderer         ;

  render(): string {
    this._succeeded     = false                  ;
    const renderer      = this.cloneRenderer?.() ;
    this.options.noPelt = "true"                 ;

    if (renderer) {
      this.content    = formatMinSpace(this.content)          ;
      this.domContent = renderer.internalRender(this.content) ;

      const refBackup = this.domContent;
      if (this.options.fetch) {
        fetch(this.options.fetch).then(_ => _.text()).then(_ => {
          const ct = renderer.internalRender(_);
          if (this.options.before) {
            refBackup.prepend(ct);
          } else {
            refBackup.appendChild(ct);
          }
        });
      }
    } else {
      this.domContent = document.createElement(this.options.elt ?? "div");
      this.domContent.appendChild(document.createTextNode(this.content));
    }

    applyStyle(this, "marks");
    processRef(this);

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "marks") {
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