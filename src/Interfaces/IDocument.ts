import { IVDom_Element } from "./IVDom_Element";

export interface IDocument {
  root: IVDom_Element;
  findFirst(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element | null;
  findAll(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element[] | null;
  createElement(tagName: string, textContent?: string): IVDom_Element;
}
