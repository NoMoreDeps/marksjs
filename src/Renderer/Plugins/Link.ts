import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { applyStyle }       from "./Helper"                          ;
import { IVDom_Element }    from "../../Interfaces/IVDom_Element"    ;

export class LinkRenderer implements IRenderingEnine {
  themeStyles       !: any;                                                                                   ;
  globalRefs         : any                                                                                    ;
  private _succeeded : boolean = false                                                                        ;
  public applyTo     : string[]           = ["BLOCK-Q", "HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "BLOCK"] ;
  public options     : TRenderingOption   = {}                                                                ;
  public content     : string             = ""                                                                ;
  public domContent  : IVDom_Element | null = null                                                            ;
  public type        : string             = ""                                                                ;
  public weight      : number            = 90                                                                 ;

  render(): string {
    let rgx = /\[(?<alt>.*?)\]\((?<link>.*?)\s*(?<to>\".+\")?\)/;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      let link = this.content
        .replace(rgx, `<a href="$2" target=$3>$1</a>`)
        .replace(/[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT]/g, "")
        .replace(/[oO][nN][eE][rR][rR][oO][rR]/g,"");
      if (link.includes("target=>")) {
        link = link.replace("target=>", ">");
      }
      return link;
    }

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.type === "BLOCK") {
      return this.options.emp !== undefined ?? false;
    }

    return true;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}