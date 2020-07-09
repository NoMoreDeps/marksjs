import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processInternals }                    from "./Helper"                          ;
import { MarksRenderer }                 from "../../MarksRenderer"               ;

export class BlockQRenderer implements IRenderingEnine {
  globalRefs            : any                                 ;
  themeStyles          !: any                        ;
  private _succeeded    : boolean               = false       ;
  public applyTo        : string[]              = ["BLOCK-Q"] ;
  public options        : TRenderingOption      = {}          ;       
  public domContent     : HTMLElement | null    = null        ;
  public content        : string                = ""          ;
  public type           : string                = ""          ;
  public weight         : number                = 0           ;
  public cloneRenderer ?: () => MarksRenderer                 ;

  render(): string {
    this._succeeded = false;

    prepareInternals(this);
    
    this.domContent = document.createElement("blockquote");

    const renderer = this.cloneRenderer?.();
    if (renderer) {
      const contentTab = this.content.split("\n");
      this.content = contentTab.map(_ => _.trimLeft())
        .join("\n");
      
      const child = renderer.internalRender(this.content);
      if (child) {
        this.domContent.appendChild(child);
      }
    } else {
      console.log("No renderer")
    }

    processInternals(this, "blockquote");
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