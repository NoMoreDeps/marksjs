import { IRenderingEnine } from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }              from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processRef, processInternals }                    from "./Helper"                          ;
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
import { IDocument } from "../../Interfaces/IDocument";

type TTableRenderingoptions = TRenderingOption & {
  format    ?: "markdown" | "csv";
  separator ?: string;
};

export class BlockTableRenderer implements IRenderingEnine {
  globalRefs          : any                                ;
  themeStyles        !: any                       ;
  private _succeeded  : boolean                = false     ;
  public applyTo      : string[]               = ["BLOCK"] ;
  public options      : TTableRenderingoptions = {}        ;       
  public domContent   : IVDom_Element | null     = null      ;
  public content      : string                 = ""        ;
  public type         : string                 = ""        ;
  public weight       : number                 = 100       ;
  private document     !: IDocument                      ;
  public getDocument   ?: () => IDocument                ;

  render(): string {
    if (!this.document) this.document = this.getDocument!();

    this._succeeded = false;
    prepareInternals(this);

    if (this.options.format === "markdown") {
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
      </thead>
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

      this.domContent = this.document.createElement("div");
      this.domContent.setInnerHTML(strTable);
    }

    if (this.options.format === "csv") {
      const sep = this.options.separator ?? ",";

      const tabs = this.content.split("\n")
        .map(_ => {
          _ = _.trim();
          return _;
        });

      if (tabs.length < 2) {
        return this.content;
      }

      const headers   = tabs.shift()!.split(sep) ;
      const alignInfo = headers.map((_,i) => {
        return this.options[`colAlign${i + 1}`] ?? "left";
      })

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
      </thead>
      <tbody>
      ${tabs.map(row => `
        <tr>
        ${
          row.split(sep).map((_, i) => {
            return `        <td align="${alignInfo[i]}">${_}</td>`;
          }).join("\n")
        }
        </tr>`).join("\n")
      }
      </tbody>
    </table>
      `;

      this.domContent = this.document.createElement("div");
      this.domContent.setInnerHTML(strTable);
    }

    if (this.domContent?.findFirst(_ => _.tagName === "table")) {
      this.domContent = this.domContent?.findFirst(_ => _.tagName === "table");
      applyStyle(this, "table");
      if (this.options.width) this.domContent!.setStyle("width", this.options.width);
    }

    processInternals(this, "table");

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "table") {
      if (this.options.format) {
        switch(this.options.format) {
          case "markdown":
          case "csv":
            return true;
          default:
            return false;
        }
      }
    }
    return false;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}