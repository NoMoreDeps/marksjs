import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processInternals }                    from "./Helper"                          ;

export class CheckRenderer implements IRenderingEnine {
  themeStyles       !: any                               ;
  globalRefs         : any                               ;
  private _succeeded : boolean               = false     ;
  public applyTo     : string[]              = ["CHECK"] ;
  public options     : TRenderingOption      = {}        ;       
  public domContent  : HTMLElement | null    = null      ;
  public content     : string                = ""        ;
  public type        : string                = ""        ;
  public weight      : number                = 0         ;

  render(): string {
    prepareInternals(this);
    this.domContent = document.createElement(this.options?.ordered ? "ol" : "ul");

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
        const li      = document.createElement("li")    ;
        const domType = document.createElement("input") ;

        domType.setAttribute("type", "checkbox");
        _.check?.toLowerCase() === "[x]" && (domType.setAttribute("checked", "checked"));

        domType.onclick           = () => false ;
        domType.style.marginRight = "5px"       ;

        li.appendChild(domType);

        const text     = document.createElement("span") ;
        text.innerHTML = _.text                         ;

        li.appendChild(text);
        !!!this.options?.bullet && (li.style.listStyleType = "none");
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