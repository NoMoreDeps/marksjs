import {VDom_Element}    from "./VDom_Element"                 ;
import { IVDom_Element } from "../../Interfaces/IVDom_Element" ;
import { IDocument }     from "../../Interfaces/IDocument"     ;

export class Document implements IDocument {
  private _root!: IVDom_Element;

  constructor(private target: "Dom" | "Text") {
    this._root = new VDom_Element(this, "div", target);
  }

  get root() {
    return this._root;
  }

  findFirst(predicate: (elt: IVDom_Element) => boolean, deepLevel: number = -1) {
    return this.root.findFirst(predicate, deepLevel); 
  }

  findAll(predicate: (elt: IVDom_Element) => boolean, deepLevel: number = -1) {
    return (this.root as IVDom_Element).findAll(predicate, deepLevel);
  }

  createElement(tagName: string, textContent?: string): IVDom_Element {
    return new VDom_Element(this, tagName, this.target, textContent);
  }
}

