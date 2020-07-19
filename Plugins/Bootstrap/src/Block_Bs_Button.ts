import { IRenderingEnine, TRenderingOption } from "@marks-js/marks";
import { Helper } from "@marks-js/marks";
import { IVDom_Element } from "@marks-js/marks/Interfaces/IVDom_Element";
import { IDocument } from "@marks-js/marks/Interfaces/IDocument";


export class BlockBsButtonRenderer implements IRenderingEnine {
  themeStyles            !: any;                           ;
  globalRefs              : any                            ;
  private _succeeded      : boolean = false                ;
  public applyTo          : string[]           = ["BLOCK"] ;
  public options          : TRenderingOption   = {}        ;
  public content          : string             = ""        ;
  public domContent       : IVDom_Element | null = null    ;
  public type             : string             = ""        ;
  public weight           : number             = 0         ;
  public getDocument     ?: () => IDocument                ;
  private document       !: IDocument                      ;

  
  render(): string {
    if (!this.document) this.document = this.getDocument!();

    this._succeeded = false;
    const payload = JSON.parse(`{ ${this.content} }`);

    this.domContent = this.document.createElement("button");
    this.domContent.setAttribute("type", "button");
    this.domContent.classList.add("btn");
    this.domContent.classList.add(`btn-${payload.outlined ? "outline-" : ""}${payload.type ?? "primary"}`);
    this.domContent.setInnerText(payload.label);
    if (payload.onClick) {
      this.domContent.setAttribute("onClick", payload.onClick);
    }

    Helper.applyStyle(this, "bs-button");
    Helper.processRef(this);

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "bs-button") {
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