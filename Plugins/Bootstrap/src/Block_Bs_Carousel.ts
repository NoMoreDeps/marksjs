import { IRenderingEnine, TRenderingOption } from "@marks-js/marks";
import { Helper } from "@marks-js/marks";


export class BlockBsCarouselRenderer implements IRenderingEnine {
  themeStyles       !: any;                           ;
  globalRefs         : any                            ;
  private _succeeded : boolean = false                ;
  public applyTo     : string[]           = ["BLOCK"] ;
  public options     : TRenderingOption   = {}        ;
  public content     : string             = ""        ;
  public domContent  : HTMLElement | null = null      ;
  public type        : string             = ""        ;
  public weight      : number             = 0         ;

  render(): string {
    this._succeeded = false;
    const payload = JSON.parse(`{ ${this.content} }`);

    this.domContent = document.createElement("div");
    this.domContent.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" style="width:800px; height:400px;">
    <div class="carousel-item active">
      <img src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png" class="d-block w-100" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    
    `;
   

    Helper.applyStyle(this, "bs-button");

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
    if (this.options.name?.toLowerCase() === "bs-carousel") {
      return true;
    }
    return false;
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}