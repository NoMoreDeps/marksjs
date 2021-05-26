import { IRenderingEnine }                    from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                   from "../../Interfaces/IRenderingOption" ;
import { applyStyle, processRef, loadAssets } from "./Helper"                          ;
import { IVDom_Element }                      from "../../Interfaces/IVDom_Element"    ;
import { IDocument }                          from "../../Interfaces/IDocument"        ;

let hasBeenInit = false;

export class CodeRenderer implements IRenderingEnine {
  themeStyles        !    : any                                                                    ;
  globalRefs              : any                                                                    ;
  private _succeeded      : boolean               = false                                          ;
  public applyTo          : string[]              = ["CODE"]                                       ;
  public options          : TRenderingOption      = {}                                             ;
  public domContent       : IVDom_Element | null    = null                                         ;
  public content          : string                = ""                                             ;
  public type             : string                = ""                                             ;
  public weight           : number                = 0                                              ;
  private _version        : string                = "1.20.0"                                       ;
  private _serverPath     : string                = "https://cdnjs.cloudflare.com/ajax/libs/prism" ;
  private _depName        : string                = "marks_prism_dep"                              ;
  private document     !  : IDocument                                                              ;
  public getDocument     ?: () => IDocument                                                        ;

  private _MountScript = `function _mksPrismMountScript() {
    if (!window["Prism"]) {
      setTimeout(() => {
        _mksPrismMountScript();
      }, 100);
      return;
    }
    Prism.highlightAll();
  };_mksPrismMountScript();`
  
  constructor({skipInit, version, serverPath}: {skipInit?: boolean, version?: string, serverPath?: string} = {skipInit: false}){
    if (!hasBeenInit) hasBeenInit = !!skipInit;

    this._version    = version ?? this._version       ;
    this._serverPath = serverPath ?? this._serverPath ;
  }

  render(): string {
    if (!this.document) this.document = this.getDocument!();
    this._succeeded = false                          ;
    const code      = this.document.createElement("code") ;
    this.domContent = this.document.createElement("pre")  ;

    code.appendText(this.content);
    this.domContent.appendChild(code);
    applyStyle(this, "code");

    if (this.options.language) {
      code.classList.add(`language-${this.options.language}`);
    }

    processRef(this);
    this.domContent.onMount(this._MountScript);
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

  async willInit() {
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
  }
}