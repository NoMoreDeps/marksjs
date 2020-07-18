import { V_HTMLElement } from "./HTMLElement";
export declare class Document {
    private target;
    private _root;
    constructor(target: "Dom" | "Text");
    get root(): V_HTMLElement;
    findFirst(predicate: (elt: V_HTMLElement) => boolean, deepLevel?: number): V_HTMLElement | null;
    findAll(predicate: (elt: V_HTMLElement) => boolean, deepLevel?: number): V_HTMLElement[] | null;
    createElement(tagName: string, textContent?: string): V_HTMLElement;
}
