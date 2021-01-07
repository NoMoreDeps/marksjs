"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _createNodeFromJson;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDom_Element = void 0;
const Index_1 = require("../Parser/Index");
class VDom_Element {
    constructor(_doc, _tagName, target, textContent) {
        this._doc = _doc;
        this._tagName = _tagName;
        this.target = target;
        this.textContent = textContent;
        this.childNodes = [];
        this._classList = [];
        this._attributes = {};
        this._styles = {};
        this._style = "";
        this._MountScript = [];
        this.classList = {
            add: (className) => {
                var _a;
                !this._classList.includes(className) && this._classList.push(className);
                (_a = this.dom) === null || _a === void 0 ? void 0 : _a.classList.add(className);
            },
            remove: (className) => {
                var _a;
                this._classList = this._classList.filter(_ => _ !== className);
                (_a = this.dom) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
            },
            toggle: (className) => {
                var _a;
                this._classList.includes(className) ? this.classList.add(className) : this.classList.remove(className);
                (_a = this.dom) === null || _a === void 0 ? void 0 : _a.classList.toggle(className);
            }
        };
        _createNodeFromJson.set(this, (json, parentNode) => {
            if (json.nodeType === Index_1.NODE_TYPE.TEXT_NODE) {
                const elt = this._doc.createElement(json.tagName, json.textContent);
                return elt;
            }
            if (json.nodeType === Index_1.NODE_TYPE.ELEMENT_NODE) {
                const elt = this._doc.createElement(json.tagName);
                if (json.className) {
                    json.className
                        .split(" ")
                        .map(_ => _.trim())
                        .forEach(_ => {
                        elt.classList.add(_);
                    });
                }
                json.id && elt.setAttribute("id", json.id);
                if (json.attrs) {
                    for (const i in json.attrs) {
                        if (i === "class")
                            continue;
                        elt.setAttribute(i, json.attrs[i]);
                    }
                }
                json.childNodes.forEach(_ => {
                    var _a;
                    if (_.nodeType === Index_1.NODE_TYPE.TEXT_NODE && ((_a = _.textContent) === null || _a === void 0 ? void 0 : _a.trim().length) === 0)
                        return;
                    elt.appendChild(__classPrivateFieldGet(this, _createNodeFromJson).call(this, _));
                });
                return elt;
            }
            ;
        });
        this._tagName = this._tagName.toLowerCase();
        if (target === "Dom" && this._tagName === "text") {
            this.dom = document.createElement("span");
            this.dom.innerHTML = textContent;
        }
        ;
        if (target === "Dom" && this._tagName === "innertext") {
            this.dom = document.createTextNode(textContent);
        }
        ;
        target === "Dom" && this._tagName !== "text" && this._tagName !== "innertext" && (this.dom = document.createElement(_tagName));
    }
    get id() {
        return this.getAttribute("id");
    }
    get childElementCount() {
        return this.childNodes.length;
    }
    /**
     * Will add a script to execute after the dom object has been mounted.
     * If rendered to text, it will include a script tag
     * @param script
     */
    onMount(script) {
        this._MountScript.push(script);
    }
    getScripts() {
        const res = new Array();
        for (let i = 0; i < this.childElementCount; i++) {
            res.push(...this.getChildItem(i).getScripts());
        }
        res.push(...this._MountScript);
        return res;
    }
    get tagName() {
        return this._tagName;
    }
    getChildItem(index) {
        return this.childNodes[index];
    }
    prepend(element) {
        var _a;
        this.childNodes.unshift(element);
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.prepend(element.dom);
    }
    appendChild(element) {
        var _a;
        this.childNodes.push(element);
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.appendChild(element.dom);
    }
    setStyle(cssStyleName, value) {
        var _a;
        this._styles[cssStyleName] = String(value);
        let style = this._style;
        for (const i in this._styles) {
            style = `${style}${style.trim().length > 0 ? "; " : ""}${i}:${this._styles[i]}`;
        }
        this._attributes.style = style;
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.setAttribute("style", style);
    }
    setInnerHTML(html) {
        const htmlParser = new Index_1.HtmlParser();
        const jsonDom = htmlParser.parse(html);
        this.childNodes.length = 0;
        if (this.target === "Dom") {
            this.dom.innerHTML = "";
        }
        jsonDom.childNodes.forEach(_ => {
            var _a;
            if (_.nodeType === Index_1.NODE_TYPE.TEXT_NODE && ((_a = _.textContent) === null || _a === void 0 ? void 0 : _a.trim().length) === 0)
                return;
            this.appendChild(__classPrivateFieldGet(this, _createNodeFromJson).call(this, _));
        });
    }
    setInnerText(text) {
        this.childNodes.length = 0;
        if (this.target === "Dom") {
            this.dom.innerText = text;
        }
        this.textContent = text;
    }
    prependText(text) {
        const elt = this._doc.createElement("innerText", text);
        this.prepend(elt);
    }
    appendText(text) {
        const elt = this._doc.createElement("innerText", text);
        this.appendChild(elt);
    }
    setAttribute(attName, value) {
        var _a;
        try {
            this._attributes[attName] = value;
            (_a = this.dom) === null || _a === void 0 ? void 0 : _a.setAttribute(attName, value);
            if (attName === "style") {
                this._style = value;
                this._styles = {};
            }
        }
        catch (ex) {
            console.error("VDOM", "setAttribute", ex, "for object", this);
        }
    }
    getAttribute(attName) {
        return this._attributes[attName];
    }
    removeAttribute(attName) {
        var _a;
        delete this._attributes[attName];
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.removeAttribute(this.target);
    }
    findFirst(predicate, deepLevel = -1) {
        const res = this.childNodes.filter(_ => predicate(_));
        if (res.length) {
            return res[0];
        }
        if (deepLevel > 0 || deepLevel < 0) {
            for (const elt of this.childNodes) {
                const resChild = elt.findFirst(predicate, deepLevel - 1);
                if (resChild)
                    return resChild;
            }
        }
        return null;
    }
    findAll(predicate, deepLevel = -1) {
        const res = this.childNodes.filter(_ => predicate(_));
        if (deepLevel > 0 || deepLevel < 0) {
            for (const elt of this.childNodes) {
                const resChild = elt.findAll(predicate, deepLevel - 1);
                if (resChild) {
                    res.push(...resChild);
                }
            }
        }
        return res.length ? res : null;
    }
    addEventListener(eventName, handler) {
        var _a;
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, handler);
    }
    toDom() {
        var _a;
        return (_a = this.dom) !== null && _a !== void 0 ? _a : null;
    }
    toHtml(indentLevel = 0) {
        var _a;
        if (this.tagName === "text" && this.textContent)
            return `<span>${this.textContent}</span>`;
        if (this.tagName === "br")
            return "<br>";
        if (this.tagName === "hr")
            return "<hr>";
        if (this.tagName === "innertext")
            return (_a = this.textContent) !== null && _a !== void 0 ? _a : "";
        let attrs = "";
        for (const i in this._attributes) {
            attrs += ` ${i}=${JSON.stringify(this._attributes[i])}`;
        }
        const classes = this._classList.join(" ");
        const children = this.childNodes.map(_ => _.toHtml(indentLevel !== -1 ? indentLevel + 2 : -1)).join(indentLevel !== -1 ? "\n" : "");
        const tagName = this._tagName;
        let prepareEndInlineTag = "";
        if (this.childNodes.length === 0)
            prepareEndInlineTag = `</${tagName}>`;
        if (["input", "img"].includes(tagName))
            prepareEndInlineTag = "";
        const html = [];
        html.push(`${"".padStart(indentLevel, " ")}<${tagName}${classes.length ? ` class="${classes}"` : ""}${attrs}>${prepareEndInlineTag}`);
        this.textContent && html.push(this.textContent);
        this.childNodes.length && html.push(children);
        this.childNodes.length && (html.push(`${"".padStart(indentLevel, " ")}</${tagName}>`));
        return html.join(indentLevel !== -1 ? "\n" : "");
    }
}
exports.VDom_Element = VDom_Element;
_createNodeFromJson = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRvbV9FbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1ZEb20vSHRtbC9WRG9tX0VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUE4RTtBQUk5RSxNQUFhLFlBQVk7SUFpQnZCLFlBQW9CLElBQWMsRUFBVSxRQUFnQixFQUFVLE1BQXNCLEVBQVUsV0FBb0I7UUFBdEcsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBZmxILGVBQVUsR0FBaUMsRUFBRSxDQUFFO1FBQy9DLGVBQVUsR0FBaUMsRUFBRSxDQUFFO1FBQy9DLGdCQUFXLEdBQWdDLEVBQUUsQ0FBRTtRQUMvQyxZQUFPLEdBQW9DLEVBQUUsQ0FBRTtRQUMvQyxXQUFNLEdBQXFDLEVBQUUsQ0FBRTtRQUMvQyxpQkFBWSxHQUErQixFQUFFLENBQUU7UUFvRXZELGNBQVMsR0FBRztZQUNWLEdBQUcsRUFBTSxDQUFDLFNBQWlCLEVBQUUsRUFBRTs7Z0JBQzdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hFLE1BQUEsSUFBSSxDQUFDLEdBQUcsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDckMsQ0FBQztZQUNELE1BQU0sRUFBRyxDQUFDLFNBQWlCLEVBQUUsRUFBRTs7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUM7Z0JBQy9ELE1BQUEsSUFBSSxDQUFDLEdBQUcsMENBQUUsU0FBUyxDQUFDLE1B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