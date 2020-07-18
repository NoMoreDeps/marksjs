import { Document } from "./Document";
export declare class V_HTMLElement {
    #private;
    private _doc;
    private _tagName;
    private target;
    private textContent?;
    private dom?;
    private childNodes;
    private _classList;
    private _attributes;
    private _styles;
    private _style;
    constructor(_doc: Document, _tagName: string, target: "Dom" | "Text", textContent?: string | undefined);
    get tagName(): string;
    appendChild(element: V_HTMLElement): void;
    setStyle(cssStyleName: string, value: any): void;
    classList: {
        add: (className: string) => void;
        remove: (className: string) => void;
        toggle: (className: string) => void;
    };
    setInnerHTML(html: string): void;
    setAttribute(attName: string, value: string): void;
    getAttribute(attName: string): void;
    removeAttribute(attName: string): void;
    findFirst(predicate: (elt: V_HTMLElement) => boolean, deepLevel?: number): V_HTMLElement | null;
    findAll(predicate: (elt: V_HTMLElement) => boolean, deepLevel?: number): V_HTMLElement[] | null;
    addEventListener(eventName: string, handler: (...args: any[]) => void): void;
    toDom(): HTMLElement | null;
    toHtml(indentLevel?: number): string;
}
