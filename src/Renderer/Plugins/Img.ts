import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { applyStyle }       from "./Helper"                          ;
import { IVDom_Element }    from "../../Interfaces/IVDom_Element"    ;
import { IDocument }        from "../../Interfaces/IDocument"        ;

export class ImgRenderer implements IRenderingEnine {
  themeStyles            !: any                                                                                    ;
  globalRefs              : any                                                                                    ;
  private _succeeded      : boolean = false                                                                        ;
  public applyTo          : string[]           = ["BLOCK-Q", "HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "BLOCK"] ;
  public options          : TRenderingOption   = {}                                                                ;
  public content          : string             = ""                                                                ;
  public domContent       : IVDom_Element | null = null                                                            ;
  public type             : string             = ""                                                                ;
  public weight           : number            = 100                                                                ;
  private document       !: IDocument                                                                              ;
  public getDocument     ?: () => IDocument                                                                        ;
  render(): string {
    if (!this.document) this.document = this.getDocument!();

    let rgx = /!\[(?<alt>.*?)\]\((?<link>.*?)\s*(?<title>\".+\")?\)/;
    this._succeeded = rgx.test(this.content);
    if (this._succeeded) {
      return this.content.replace(rgx, `<img src="$2" alt="$1" title=$3/>`)
      .replace(/[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT]/g, "")
      .replace(/[oO][nN][eE][rR][rR][oO][rR]/g,"");
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