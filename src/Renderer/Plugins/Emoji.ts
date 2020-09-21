import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { IVDom_Element }    from "../../Interfaces/IVDom_Element"    ;
import { loadAssets }       from "./Helper"                          ;

let hasBeenInit = false;

export class EmojiRenderer implements IRenderingEnine {
  themeStyles      !: any                                                                                         ;
  globalRefs        : any                                                                                         ;
  private _succeeded: boolean = false                                                                             ;
  public applyTo    : string[]           = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"]        ;
  public options    : TRenderingOption   = {}                                                                     ;
  public content    : string             = ""                                                                     ;
  public domContent : IVDom_Element | null = null                                                                 ;
  public type       : string             = ""                                                                     ;
  public weight      : number            = 100                                                                    ;
  private _serverPath : string           = "https://cdn.jsdelivr.net/gh/NoMoreDeps/marksjs/statics/emoji.css"     ;

  render(): string {
    let rgx  = /\:([aA-zZ0-9+-]+)\:/ ;
    let rgxSkipBegin = /\:(-+)\:/;
    let rgxSkipEnd = /##(-+)##/;
    let content = this.content;

    content = content.replace(rgxSkipBegin, `##$1##`);

    this._succeeded = rgx.test(content);
    if (this._succeeded) {
      content = content.replace(rgx, `<i class="em em-$1" aria-role="presentation"></i>`);
    }

    content = content.replace(rgxSkipEnd, `:$1:`);
    if (this._succeeded) {
      return content;
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

  async renderFinished(targetElement: HTMLElement | undefined) {
    if (!hasBeenInit) {
      hasBeenInit  = true;
      
      await loadAssets([
        `${this._serverPath}`,
      ]);
    }
  }
}
