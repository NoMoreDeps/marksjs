import { IRenderingEnine }                                from "../../Interfaces/IRenderingEngine" ;
import { TRenderingOption }                               from "../../Interfaces/IRenderingOption" ;
import { applyStyle, prepareInternals, processInternals } from "./Helper"                          ;
import { IVDom_Element }                                  from "../../Interfaces/IVDom_Element"    ;
import { IDocument }                                      from "../../Interfaces/IDocument"        ;
import { VDom_Element }                                   from "../../VDom/Html/VDom_Element"      ;

export class ListRenderer implements IRenderingEnine {
  themeStyles            !: any                                          ;
  globalRefs              : any                                          ;
  private _succeeded      : boolean               = false                ;
  public applyTo          : string[]              = ["LIST-U", "LIST-O"] ;
  public options          : TRenderingOption      = {}                   ;
  public domContent       : IVDom_Element | null    = null               ;
  public content          : string                = ""                   ;
  public type             : string                = ""                   ;
  public weight           : number                = 0                    ;
  private document       !: IDocument                                    ;
  public getDocument     ?: () => IDocument                              ;
  render(): string {
    if (!this.document) this.document = this.getDocument!();

    //console.log(this.content, this.options, this.themeStyles)
    this._succeeded           = false;
    
    // Transform content;
    
    prepareInternals(this);

    const tab = this.content.split("\n");
    let lastIndex = -1;
    let curIndent = 0;

    const nbIndent = (text: string) => {
      let size = 0;
      for(let i=0; i<text.length; i++) {
        if (text.charAt(i) !== " ") {
          break;
        }
        size++;
      }

      return size;
    }

    let list = [] as any[];

    tab.forEach((_, idx, all) => {
      const s = nbIndent(_);
      const row = {s, text: _.trimLeft().substr(2).trimLeft(), parent: lastIndex, i: idx, c: []};
      if (s > curIndent) {
        lastIndex = idx - 1;
        row.parent = lastIndex;
        curIndent = s;
      }
      if (s < curIndent) {
        // Have to find the correct parent
        let goodParentIdx = -1;
        let goodParent = null;
        list.forEach((p) =>{
          if (p.i < row.i && p.s < row.s) {
            goodParentIdx = p.i;
            goodParent = p;
          }
        });
        
          lastIndex = goodParentIdx;
          row.parent = goodParentIdx;
          curIndent = s;
      
      }
      list.push(row);
    });

    //console.log(this.type, list);
    list = list.map(_ => {
      if (_.parent !== -1) {
        list.filter(__ => __.i === _.parent)[0].c.push(_);
      }
      return _;
    }).filter(_ => _.parent == -1);
    //console.log(this.type, list);


    const createNode = (ll: IVDom_Element, list: any[]) => {
      list.forEach(_ => {
        const l = this.document.createElement("li");
        l.setInnerHTML(_.text);
        ll.appendChild(l);
        if (_.c.length) {
          const newLL = this.document.createElement(this.type === "LIST-U" ? "ul" : "ol");
          l.appendChild(newLL);
          createNode(newLL, _.c);
        }
      })
      return ll;
    }

    const rootLL = this.document.createElement(this.type === "LIST-U" ? "ul" : "ol");
    createNode(rootLL, list);

    this.domContent = rootLL;
    processInternals(this, "list");

    return this.content;
  }

  succeeded(): boolean {
    return this._succeeded;
  }

  canProcess(): boolean {
    return (this as any).applyTo.includes(this.type);
  }

  set(type: string, content: string, options: TRenderingOption) {
    this.type    = type    ;
    this.content = content ;
    this.options = options ;
  }
}