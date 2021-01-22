import { IMarksRenderer, TRenderingOption, IRenderingEnine } from "@marks-js/marks"                          ;
import { loadAssets, processRef }                            from "@marks-js/marks/Renderer/Plugins/Helper"  ;
import { IVDom_Element }                                     from "@marks-js/marks/Interfaces/IVDom_Element" ;
import { IDocument }                                         from "@marks-js/marks/Interfaces/IDocument"     ;

let hasBeenInit       = false ;
let _MountScriptIndex = 0     ;
declare var mermaid: any;

export class BlockMermaidRenderer implements IRenderingEnine {
  themeStyles            !: any                                   ;
  globalRefs              : any                                   ;
  private _succeeded      : boolean = false                       ;
  public applyTo          : string[]             = ["BLOCK"]      ;
  public options          : TRenderingOption     = {}             ;
  public content          : string               = ""             ;
  public domContent       : IVDom_Element | null = null           ;
  public type             : string               = ""             ;
  public weight           : number               = 0              ;
  private _version        : string               = "8.8.0"        ;
  private _selector       : string               = "marksMermaid" ;
  public cloneRenderer   ?: () => IMarksRenderer                  ;
  public getDocument     ?: () => IDocument                       ;
  private document       !: IDocument                             ;

  private getMountedScript() {
    _MountScriptIndex++;
    return `function _MarksMermaidMountScript${_MountScriptIndex}() {
      if (!window["mermaid"]) {
        setTimeout(() => {
          _MarksMermaidMountScript${_MountScriptIndex}();
        }, 100);
        return;
      }
      mermaid.init(undefined, ".${this._selector}");

      for (let i=0; i<5; i++) {
        setTimeout(() => {
          document.querySelectorAll(".${this._selector} > svg").forEach(_ => _.style.width = "100%");
        }, 100 * i);
      }
    };_MarksMermaidMountScript${_MountScriptIndex}();`;
  }

  constructor({skipInit, version, selector}: {skipInit?: boolean, version?: string, selector?: string} = {skipInit: false}) {
    if (skipInit) {
      hasBeenInit = true;
    }
    if (version) {
      this._version = version;
    }
    if (selector) {
      this._selector = selector;
    }
  }

  render(): string {
    if (!this.document) this.document = this.getDocument!();
    this._succeeded = false;
    
    this.domContent = this.document.createElement("div");
    this.domContent.classList.add(this._selector);
    this.domContent.appendText(this.content);

    processRef(this);
    this.domContent.onMount(this.getMountedScript());
    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "mermaid") {
      return true;
    }
    return false;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }

  async willInit() {
    const waitAsync = () => new Promise(r => setTimeout(() => { r(true); }, 0));
    if (!hasBeenInit) {
      hasBeenInit = true;
      
      await loadAssets([`https://unpkg.com/mermaid@${this._version}/dist/mermaid.min.js`]);
      
      while(!(window as any)["mermaid"]) {
        await waitAsync();
      }
  
      mermaid.initialize({
        startOnLoad:false,
        theme: "forest"
      });
    }

  }
}