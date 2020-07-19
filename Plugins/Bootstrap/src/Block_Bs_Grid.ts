import { 
  Helper           , 
  IMarksRenderer   , 
  TRenderingOption , 
  IRenderingEnine 
} from "@marks-js/marks";
import { IVDom_Element } from "@marks-js/marks/Interfaces/IVDom_Element" ;
import { IDocument }     from "@marks-js/marks/Interfaces/IDocument"     ;

export class BlockBsGridRenderer implements IRenderingEnine {
  themeStyles          !: any                            ;
  globalRefs            : any                            ;
  private _succeeded    : boolean = false                ;
  public applyTo        : string[]           = ["BLOCK"] ;
  public options        : TRenderingOption   = {}        ;
  public content        : string             = ""        ;
  public domContent     : IVDom_Element | null = null      ;
  public type           : string             = ""        ;
  public weight         : number             = 0         ;
  public cloneRenderer ?: () => IMarksRenderer           ;
  public getDocument     ?: () => IDocument                ;
  private document       !: IDocument                      ;

  render(): string {
    if (!this.document) this.document = this.getDocument!();
    this._succeeded = false;
    this.options.nested = "true";
    this.domContent = this.document.createElement("div");

    Helper.prepareInternals(this);

    this.domContent.classList.add("container");
    const gridDef = this.content.split("\n").map(_ => _.trim());

    let row = this.document.createElement("div");
    row.classList.add("row");

    gridDef.forEach(cell => {
      if (cell === "") {
        if (row.childElementCount > 0) {
          this.domContent?.appendChild(row);
        }
        row = this.document.createElement("div");
        row.classList.add("row");
        return;
      }
      const [styles, placeholder] = cell.split("|");
      const cellDom = this.document.createElement("div");
      styles.split(",").forEach(s => {
        cellDom.classList.add(s);
      });
      cellDom.setInnerHTML(placeholder);
      row.appendChild(cellDom);
    });

    if (row.childElementCount > 0) {
      this.domContent?.appendChild(row);
    }
    
    Helper.processInternals(this, "bs-grid");

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    if (this.options.name?.toLowerCase() === "bs-grid") {
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