import { IRenderingEnine, TRenderingOption } from "@marks-js/marks";
import { Helper } from "@marks-js/marks";


export class BlockBsButtonRenderer implements IRenderingEnine {
  themeStyles       !: any;                           ;
  globalRefs         : any                            ;
  private _succeeded : boolean = false                ;
  public applyTo     : string[]           = ["BLOCK"] ;
  public options     : TRenderingOption   = {}        ;
  public content     : string             = ""        ;
  public domContent  : HTMLElement | null = null      ;
  public type        : string             = ""        ;
  public weight      : number             = 0         ;

  render(): string {
    this._succeeded = false;
    const payload = JSON.parse(`{ ${this.content} }`);

    this.domContent = document.createElement("button");
    this.domContent.setAttribute("type", "button");
    this.domContent.classList.add("btn");
    this.domContent.classList.add(`btn-${payload.outlined ? "outline-" : ""}${payload.type ?? "primary"}`);
    this.domContent.innerHTML = payload.label;
    if (payload.onClick) {
      const fct = new Function(payload.onClick);
      this.domContent.onclick = fct as any;
    }

    Helper.applyStyle(this, "bs-button");

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