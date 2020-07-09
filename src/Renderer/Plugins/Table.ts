import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processNestedRef, processRef }                    from "./Helper"                          ;

type TTableRenderingoptions = TRenderingOption & {
  format    ?: "markdown" | "csv";
  separator ?: string;
};

export class TableRenderer implements IRenderingEnine {
  themeStyles      !: any                       ;
  globalRefs : any                                        ;
  private _succeeded : boolean                = false     ;
  public applyTo     : string[]               = ["TABLE"] ;
  public options     : TTableRenderingoptions = {}        ;       
  public domContent  : HTMLElement | null     = null      ;
  public content     : string                 = ""        ;
  public type        : string                 = ""        ;
  public weight      : number                 = 0         ;

  render(): string {
    this._succeeded = false;
    
   prepareInternals(this);

    const tabs = this.content.split("\n")
      .map(_ => {
        _ = _.trim();
        if (_.endsWith("|")) {
          _ = _.substring(0, _.length - 1)
        }
        _ = _.substr(1);
        return _;
      });

    if (tabs.length < 2) {
      return this.content;
    }

    const headers   = tabs.shift()!.split("|") ;
    const alignInfo = tabs.shift()!.split("|").map(_ => {
      let align = "left";
      _.startsWith(":") && _.endsWith(":") && (align = "center");
      !_.startsWith(":") && _.endsWith(":") && (align = "right");
      return align;
    }) ;

    let strTable = `
  <table>
    <thead>
      <tr>
      ${
        headers.map((_,i) => {
          return `        <th align="${alignInfo[i]}">${_}</th>`;
        }).join("\n")
      }
      </tr>
    <tbody>
    ${tabs.map(row => `
      <tr>
      ${
        row.split("|").map((_, i) => {
          return `        <td align="${alignInfo[i]}">${_}</td>`;
        }).join("\n")
      }
      </tr>`).join("\n")
    }
    </tbody>
  </table>
    `;

    this.domContent = document.createElement("div");
    this.domContent.innerHTML = strTable;

    if (this.domContent?.querySelector("table")) {
      this.domContent = this.domContent?.querySelector("table");
      applyStyle(this, "table");
      if (this.options.width) this.domContent!.style.width=this.options.width;
    }

    processNestedRef(this);
    processRef(this);

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