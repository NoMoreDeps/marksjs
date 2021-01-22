import { IRenderingEnine, TRenderingOption } from "@marks-js/marks";
import { Helper } from "@marks-js/marks";
import { IVDom_Element } from "@marks-js/marks/Interfaces/IVDom_Element";
import { IDocument } from "@marks-js/marks/Interfaces/IDocument";
import { loadAssets } from "@marks-js/marks/Renderer/Plugins/Helper";

const _wnd = window as any;

export class BlockBsButtonRenderer implements IRenderingEnine {
  themeStyles                !: any;                                                            ;
  globalRefs                  : any                                                             ;
  private _succeeded          : boolean = false                                                 ;
  public applyTo              : string[]             = ["BLOCK"]                                ;
  public options              : TRenderingOption     = {}                                       ;
  public content              : string               = ""                                       ;
  public domContent           : IVDom_Element | null = null                                     ;
  public type                 : string               = ""                                       ;
  public weight               : number               = 0                                        ;
  private _version            : string               = "5.0.0-beta1"                            ;
  private _serverPath         : string               = "https://cdn.jsdelivr.net/npm/bootstrap" ;
  public getDocument         ?: () => IDocument                                                 ;
  private document           !: IDocument                                                       ;

  private getMountedScript() {
    return `function _MarksMermaidMountScript${0}() {
      if (!window["bootstrap"]) {
        setTimeout(() => {
          _MarksMermaidMountScript${0}();
        }, 100);
        return;
      }
      new bootstrap.Carousel(document.querySelector('#carouselExampleControls'));
    };_MarksMermaidMountScript${0}();`;
  }
  
  render(): string {
    if (!this.document) this.document = this.getDocument!();

    this._succeeded = false;
    const payload = JSON.parse(`{ ${this.content} }`);

    this.domContent = this.document.createElement("div");
    this.domContent.setInnerHTML(`<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div style="width:100vw;height:300px;background-color:red"></div>
      </div>
      <div class="carousel-item">
      <div style="width:100vw;height:300px;background-color:blue"></div>

      </div>
      <div class="carousel-item">
      <div style="width:100vw;height:300px;background-color:green"></div>

      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">;
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>`);
    //this.domContent.setInnerHTML(`<button type="button" class="btn btn${payload.outline ? "-outline" : ""}-${payload.type}${payload.noWrap ? " text-nowrap" : ""}">${payload.text}</button>`);
    //this.domContent = this.domContent.getChildItem(0);

    Helper.applyStyle(this, "bs-button");
    Helper.processRef(this);

    this.domContent.onMount(this.getMountedScript());

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "bs-button") {
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
    if (!_wnd["_MarksBS5Init"]) {
      _wnd["_MarksBS5Init"]  = true  ;
      
      await loadAssets([
        `${this._serverPath}@${this._version}/dist/css/bootstrap.min.css`,
        `${this._serverPath}@${this._version}/dist/js/bootstrap.bundle.min.js`
      ]);
    }
  }
}