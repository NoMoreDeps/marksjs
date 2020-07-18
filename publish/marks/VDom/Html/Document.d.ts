import { IVDom_Element } from "../../Interfaces/IVDom_Element";
import { IDocument } from "../../Interfaces/IDocument";
export declare class Document implements IDocument {
    private target;
    private _root;
    constructor(target: "Dom" | "Text");
    get root(): IVDom_Element;
    findFirst(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element | null;
    findAll(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element[] | null;
    createElement(tagName: string, textContent?: string): IVDom_Element;
}
