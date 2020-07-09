import { IRenderingEnine }  from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption } from "../../Interfaces/IRenderingOption" ;
import { applyStyle, processRef, loadScript, loadAssets, waitAsync }       from "./Helper"                          ;

let hasBeenInit = false;
declare var Prism: any;

export class CodeRenderer implements IRenderingEnine {
  themeStyles        !: any                                                                    ;
  globalRefs          : any                                                                    ;
  private _succeeded  : boolean               = false                                          ;
  public applyTo      : string[]              = ["CODE"]                                       ;
  public options      : TRenderingOption      = {}                                             ;
  public domContent   : HTMLElement | null    = null                                           ;
  public content      : string                = ""                                             ;
  public type         : string                = ""                                             ;
  public weight       : number                = 0                                              ;
  private _version    : string                = "1.20.0"                                       ;
  private _serverPath : string                = "https://cdnjs.cloudflare.com/ajax/libs/prism" ;
  private _depName    : string                = "marks_prism_dep";

  constructor({skipInit, version, serverPath}: {skipInit?: boolean, version?: string, serverPath?: string} = {skipInit: false}){
    hasBeenInit      = !!skipInit                     ;
    this._version    = version ?? this._version       ;
    this._serverPath = serverPath ?? this._serverPath ;
  }

  render(): string {
    this._succeeded = false                          ;
    const code      = document.createElement("code") ;
    this.domContent = document.createElement("pre")  ;

    code.appendChild(document.createTextNode(this.content));
    this.domContent.appendChild(code);
    applyStyle(this, "code");

    if (this.options.language) {
      code.classList.add(`language-${this.options.language}`);
    }

    processRef(this);

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    return this.type === "CODE";
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }

  async renderFinished(targetElement: HTMLElement | undefined) {
    if (!hasBeenInit) {
      hasBeenInit  = true  ;
      
      await loadAssets([
        `${this._serverPath}/${this._version}/components/prism-core.min.js`               ,
        `${this._serverPath}/${this._version}/plugins/autoloader/prism-autoloader.min.js` ,
        `${this._serverPath}/${this._version}/themes/prism-tomorrow.min.css`              ,
        `${this._serverPath}/${this._version}/components/prism-bash.min.js`               ,
        `${this._serverPath}/${this._version}/components/prism-clike.min.js`              ,
        `${this._serverPath}/${this._version}/components/prism-javascript.min.js`         ,
        `${this._serverPath}/${this._version}/components/prism-typescript.min.js`
      ]);
    }

    while(!(window as any)["Prism"]) {
      await waitAsync();
    }

    Prism.highlightAll();
  }
}