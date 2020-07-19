import { Document } from "./Document";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
export declare class VDom_Element implements IVDom_Element {
    #private;
    private _doc;
    private _tagName;
    private target;
    private textContent?;
    dom?: HTMLElement;
    private childNodes;
    private _classList;
    private _attributes;
    private _styles;
    private _style;
    get id(): string;
    get childElementCount(): number;
    constructor(_doc: Document, _tagName: string, target: "Dom" | "Text", textContent?: string | undefined);
    get tagName(): string;
    getChildItem(index: number): IVDom_Element;
    prepend(element: IVDom_Element): void;
    appendChild(element: IVDom_Element): void;
    setStyle(cssStyleName: string, value: any): void;
    classList: {
        add: (className: string) => void;
        remove: (className: string) => void;
        toggle: (className: string) => void;
    };
    setInnerHTML(html: string): void;
    setInnerText(text: string): void;
    setAttribute(attName: string, value: string): void;
    getAttribute(attName: string): any;
    removeAttribute(attName: string): void;
    findFirst(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element | null;
    findAll(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element[] | null;
    addEventListener(eventName: string, handler: (...args: any[]) => void): void;
    toDom(): HTMLElement | null;
    toHtml(indentLevel?: number): string;
}
