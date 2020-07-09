import { IMarksRenderer, TRenderingOption, IRenderingEnine } from "@marks-js/marks"                         ;
import { loadAssets }                                        from "@marks-js/marks/Renderer/Plugins/Helper" ;

let hasBeenInit = false;
declare var mermaid: any;

export class BlockMermaidRenderer implements IRenderingEnine {
  themeStyles          !: any                                ;
  globalRefs            : any                                ;
  private _succeeded    : boolean = false                    ;
  public applyTo        : string[]           = ["BLOCK"]     ;
  public options        : TRenderingOption   = {}            ;
  public content        : string             = ""            ;
  public domContent     : HTMLElement | null = null          ;
  public type           : string             = ""            ;
  public weight         : number             = 0             ;
  public cloneRenderer ?: () => IMarksRenderer               ;
  private _version      : string            = "8.5.2"        ;
  private _selector     : string            = "marksMermaid" ;

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
    this._succeeded = false;
    
    this.domContent = document.createElement("div");
    this.domContent.classList.add(this._selector);
    this.domContent.innerHTML= this.content;
   
    if (this.options.ref) {
      this.globalRefs[this.options.ref] = this.domContent;
      this.domContent = null;
    }

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

  async renderFinished(targetElement: HTMLElement | undefined) {
    const waitAsync = () => new Promise(r => setTimeout(() => { r(); }, 0));

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

    if (targetElement) {
      while(!targetElement.parentElement) {
        await waitAsync();
      }
    }

    while(!(window as any)["mermaid"]) {
      await waitAsync();
    }
    
    mermaid.init(undefined, `.${this._selector}`);

    for (let i=0; i<5; i++) {
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>(`.${this._selector} > svg`).forEach(_ => _.style.width = "100%")
      }, 100 * i);
    }
  }
}