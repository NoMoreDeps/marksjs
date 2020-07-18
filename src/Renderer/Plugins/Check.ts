import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processInternals }                    from "./Helper"                          ;
import { IDocument } from "../../Interfaces/IDocument";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";

export class CheckRenderer implements IRenderingEnine {
  themeStyles       !: any                               ;
  globalRefs         : any                               ;
  private _succeeded : boolean               = false     ;
  public applyTo     : string[]              = ["CHECK"] ;
  public options     : TRenderingOption      = {}        ;       
  public domContent  : IVDom_Element | null    = null      ;
  public content     : string                = ""        ;
  public type        : string                = ""        ;
  public weight      : number                = 0         ;
  private document     !: IDocument                      ;
  public getDocument   ?: () => IDocument                ;
  render(): string {
    if (!this.document) this.document = this.getDocument!();

    prepareInternals(this);
    this.domContent = this.document.createElement(this.options?.ordered ? "ol" : "ul");

    const checkRgx = /\s*(?<type>[\-0-9]\.?)\s*(?<check>\[[ x]\])\s*(?<text>.*)\s*/;
    const list = this.content
      .split("\n")
      .map(_ => _.trim())
      .map(_ => {
        const rg = checkRgx.exec(_);
        return {
          type  : rg?.groups?.["type"],
          check : rg?.groups?.["check"],
          text  : rg?.groups?.["text"] as string,
        }
      })
      .forEach(_ => {
        const li      = this.document.createElement("li")    ;
        const domType = this.document.createElement("input") ;

        domType.setAttribute("type", "checkbox");
        _.check?.toLowerCase() === "[x]" && (domType.setAttribute("checked", "checked"));

        domType.setAttribute("onclick", `() => false`);
        domType.setStyle("margin-right", "5px");

        li.appendChild(domType);

        const text     = this.document.createElement("span") ;
        text.setInnerHTML(_.text);

        li.appendChild(text);
        !!!this.options?.bullet && (li.setStyle("list-style-type" ,"none"));
        this.domContent?.appendChild(li);
      })

   processInternals(this, "task");

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