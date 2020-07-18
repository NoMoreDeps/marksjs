import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processInternals }                    from "./Helper"                          ;
import { MarksRenderer }                 from "../../MarksRenderer"               ;
import { IDocument } from "../../Interfaces/IDocument";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";

export class BlockQRenderer implements IRenderingEnine {
  globalRefs            : any                                 ;
  themeStyles          !: any                        ;
  private _succeeded    : boolean               = false       ;
  public applyTo        : string[]              = ["BLOCK-Q"] ;
  public options        : TRenderingOption      = {}          ;       
  public domContent     : IVDom_Element | null    = null        ;
  public content        : string                = ""          ;
  public type           : string                = ""          ;
  public weight         : number                = 0           ;
  public cloneRenderer ?: () => MarksRenderer                 ;
  private document     !: IDocument                      ;
  public getDocument   ?: () => IDocument                ;
  render(): string {
    if (!this.document) this.document = this.getDocument!();
    
    this._succeeded = false;

    prepareInternals(this);
    
    this.domContent = this.document.createElement("blockquote");

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