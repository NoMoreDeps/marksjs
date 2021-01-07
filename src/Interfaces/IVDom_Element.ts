import { VDom_Element } from "../VDom/Html/VDom_Element";

export interface IVDom_Element {
  id      ?: string;
  tagName  : string      ;
  dom     ?: HTMLElement ;
  childElementCount: number;
  
  prepend(element: IVDom_Element): void;
  appendChild(element: IVDom_Element): void;
  setStyle(cssStyleName: string, value: any): void;

  classList: {
    add    : (className: string) => void;
    remove : (className: string) => void;
    toggle : (className: string) => void;
  }

  getChildItem(index: number): IVDom_Element;
  setInnerHTML(html: string): void;
  setInnerText(text: string): void;
  appendText(text: string): void;
  prependText(text: string): void;
  setAttribute(attName: string, value: string): void;
  getAttribute(attName: string): any;
  removeAttribute(attName: string): void;

  getScripts(): string[];
  onMount(script: string): void;

  addEventListener(eventName: string, handler: (...args: any[]) => void): void;
  
  toDom(): HTMLElement | null;
  toHtml(indentLevel: number): string

  findFirst(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element | null;
  findAll(predicate: (elt: IVDom_Element) => boolean, deepLevel?: number): IVDom_Element[] | null;
}
