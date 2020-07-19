import { HtmlParser, Node, NODE_TYPE } from "../Parser/Index" ;
import { Document }                    from "./Document"      ;
import { IVDom_Element } from "../../Interfaces/IVDom_Element";

export class VDom_Element implements IVDom_Element{
  dom                 ?: HTMLElement                    ;
  private childNodes   : IVDom_Element[] = []           ;
  private _classList   : string[] = []                  ;
  private _attributes  : { [key: string]: any } = {}    ;
  private _styles      : { [key: string]: string } = {} ;
  private _style       : string = ""                    ;

  get id(): string {
    return this.getAttribute("id");
  }

  get childElementCount() : number {
    return this.childNodes.length;
  }

  constructor(private _doc: Document, private _tagName: string, private target: "Dom" | "Text", private textContent?: string) {
    this._tagName = this._tagName.toLocaleLowerCase();
    if (target === "Dom" && _tagName === "text") {
      this.dom = document.createElement("span") as unknown as HTMLElement;
      this.dom.innerHTML = textContent!;
    };
    if (target === "Dom" && _tagName === "innerText") {
      this.dom = document.createTextNode(textContent!) as any as HTMLElement;
    };
    target === "Dom" && _tagName !== "text" && _tagName !== "inenrText" && (this.dom = document.createElement(_tagName));
  }

  get tagName() {
    return this._tagName;
  }

  getChildItem(index: number): IVDom_Element {
    return this.childNodes[index];
  }

  prepend(element: IVDom_Element) {
    this.childNodes.unshift(element);
    this.dom?.prepend(element.dom!);
  }

  appendChild(element: IVDom_Element) {
    this.childNodes.push(element);
    this.dom?.appendChild(element.dom!);
  }

  setStyle(cssStyleName: string, value: any) {
    this._styles[cssStyleName] = String(value);
    let style = this._style;
    for(const i in this._styles) {
      style = `${style}${style.trim().length > 0 ? "; " : ""}${i}:${this._styles[i]}`;
    }
    this._attributes.style = style;
    this.dom?.setAttribute("style", style);
  }
  
  classList = {
    add    : (className: string) => {
      !this._classList.includes(className) && this._classList.push(className);
      this.dom?.classList.add(className);
    },
    remove : (className: string) => {
      this._classList = this._classList.filter(_ => _ !== className);
      this.dom?.classList.remove(className);
    },
    toggle : (className: string) => {
      this._classList.includes(className) ? this.classList.add(className) : this.classList.remove(className);
      this.dom?.classList.toggle(className);
    }
  }

  #createNodeFromJson = (json: Node, parentNode?: VDom_Element) => {
    if (json.nodeType === NODE_TYPE.TEXT_NODE) {
      const elt = this._doc.createElement(json.tagName, json.textContent);
      return elt;
    }

    if (json.nodeType === NODE_TYPE.ELEMENT_NODE) {
      const elt = this._doc.createElement(json.tagName);
      if (json.className) {
        json.className
        .split(" ")
        .map(_ => _.trim())
        .forEach(_ => {
          elt.classList.add(_);
        })
      }
      
      json.id && elt.setAttribute("id", json.id);
      
      if (json.attrs) {
        for(const i in json.attrs) {
          if (i === "class") continue;
          elt.setAttribute(i, json.attrs[i]);
        }
      }
      
      json.childNodes.forEach(_ => {
        if (_.nodeType === NODE_TYPE.TEXT_NODE && _.textContent?.trim().length === 0) return;
        elt.appendChild(this.#createNodeFromJson(_)!);
      });
      
      return elt;
    };
  }

  setInnerHTML(html: string) {
    const htmlParser = new HtmlParser()       ;
    const jsonDom    = htmlParser.parse(html) ;

    this.childNodes.length = 0;
    if (this.target === "Dom") {
      this.dom!.innerHTML = "";
    }

    jsonDom.childNodes.forEach(_ => {
      if (_.nodeType === NODE_TYPE.TEXT_NODE && _.textContent?.trim().length === 0) return;
      this.appendChild(this.#createNodeFromJson(_)!);
    });
  }

  setInnerText(text: string) {
    if (this.target === "Dom") {
      this.dom!.innerText = text;
    }

    const textNode = new Node({tagName: "innerText", nodeType: NODE_TYPE.TEXT_NODE, textContent: text});
    this.appendChild(this.#createNodeFromJson(textNode)!);
  }

  setAttribute(attName: string, value: string) {
    this._attributes[attName] = value;
    this.dom?.setAttribute(attName, value);
    if (attName === "style") {
      this._style  = value;
      this._styles = {};
    }
  }

  getAttribute(attName: string) {
    return this._attributes[attName];
  }

  removeAttribute(attName: string) {
    delete this._attributes[attName];
    this.dom?.removeAttribute(this.target); 
  }

  findFirst(predicate: (elt: IVDom_Element) => boolean, deepLevel: number = -1): IVDom_Element | null {
    const res = this.childNodes.filter(_ => predicate(_));
    if (res.length) {
      return res[0];
    }

    if (deepLevel > 0 || deepLevel < 0) {
      for(const elt of this.childNodes) {
        const resChild = elt.findFirst(predicate, deepLevel - 1);
        if (resChild) return resChild;
      }
    }

    return null;
  }

  findAll(predicate: (elt: IVDom_Element) => boolean, deepLevel: number = -1): IVDom_Element[] | null {
    const res = this.childNodes.filter(_ => predicate(_));

    if (deepLevel > 0 || deepLevel < 0) {
      for(const elt of this.childNodes) {
        const resChild = elt.findAll(predicate, deepLevel - 1);
        if (resChild) {
          res.push(...resChild);
        }
      }
    }

    return res.length ? res : null;
  }

  addEventListener(eventName: string, handler: (...args: any[]) => void) {
    this.dom?.addEventListener(eventName, handler);
  }

  toDom(): HTMLElement | null {
    return this.dom ?? null;
  }

  toHtml(indentLevel: number = 0): string {
    if (this.tagName === "text"      && this.textContent) return `<span>${this.textContent}</span>`;
    if (this.tagName === "innerText" && this.textContent) return `${this.textContent}`;
    if (this.tagName === "br") return "<br>";
    if (this.tagName === "hr") return "<hr>";

    let attrs = "";
    for(const i in this._attributes) {
      attrs += ` ${i}=${JSON.stringify(this._attributes[i])}`;
    }
    const classes  = this._classList.join(" ");
    const children = this.childNodes.map(_ => _.toHtml(indentLevel !== -1 ? indentLevel + 2 : -1)).join(indentLevel !== -1 ? "\n" : "");
    const tagName  = this._tagName;

    let prepareEndInlineTag = "";
    if (this.childNodes.length === 0) prepareEndInlineTag = `</${tagName}>`;
    if (["input", "img"].includes(tagName)) prepareEndInlineTag = "";

    const html = [] as string[];
    html.push(`${"".padStart(indentLevel, " ")}<${tagName}${classes.length ? ` class="${classes}"` : ""}${attrs}>${prepareEndInlineTag}`);
    this.childNodes.length && html.push(children);
    this.childNodes.length && (html.push(`${"".padStart(indentLevel, " ")}</${tagName}>`));
    
    return html.join(indentLevel !== -1 ? "\n" : "");
  }
}