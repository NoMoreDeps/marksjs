import {V_HTMLElement} from "./HTMLElement";

export class Document {
  private _root!: V_HTMLElement;

  constructor(private target: "Dom" | "Text") {
    this._root = new V_HTMLElement(this, "div", target);
  }

  get root() {
    return this._root;
  }

  findFirst(predicate: (elt: V_HTMLElement) => boolean, deepLevel: number = -1) {
    return this.root.findFirst(predicate, deepLevel); 
  }

  findAll(predicate: (elt: V_HTMLElement) => boolean, deepLevel: number = -1) {
    return (this.root as V_HTMLElement).findAll(predicate, deepLevel);
  }

  createElement(tagName: string, textContent?: string): V_HTMLElement {
    return new V_HTMLElement(this, tagName, this.target, textContent);
  }
}