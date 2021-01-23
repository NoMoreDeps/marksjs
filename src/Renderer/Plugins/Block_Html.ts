import { IRenderingEnine }                    from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                   from "../../Interfaces/IRenderingOption" ;
import { MarksRenderer }                      from "../../MarksRenderer"               ;
import { prepareInternals, processInternals } from "./Helper"                          ;
import { Document }                           from "../../VDom/Html/Document"          ;
import { IVDom_Element }                      from "../../Interfaces/IVDom_Element"    ;
import { IDocument }                          from "../../Interfaces/IDocument"        ;

export class BlockHtmlRenderer implements IRenderingEnine {
  themeStyles           !: any                            ;
  globalRefs             : any                            ;
  private _succeeded     : boolean = false                ;
  public applyTo         : string[]           = ["BLOCK"] ;
  public options         : TRenderingOption   = {}        ;
  public content         : string             = ""        ;
  public domContent      : IVDom_Element | null = null    ;
  public type            : string             = ""        ;
  public weight          : number             = 0         ;
  public cloneRenderer  ?: () => MarksRenderer            ;
  public getDocument    ?: () => IDocument                ;
  private document!: IDocument;

  render(): string {
    if (!this.document) this.document = this.getDocument!();
    this._succeeded = false;

    
    
    prepareInternals(this);

    this.domContent = this.document.createElement(this.options.elt ?? "div");
    this.domContent.setInnerHTML(this.content);
   
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