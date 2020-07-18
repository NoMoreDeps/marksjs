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
        this._tagName = this._tagName.toLocaleLowerCase();
        if (target === "Dom" && _tagName === "text") {
            this.dom = document.createElement("span");
            this.dom.innerHTML = textContent;
        }
        ;
        target === "Dom" && _tagName !== "text" && (this.dom = document.createElement(_tagName));
    }
    get id() {
        return this.getAttribute("id");
    }
    get childElementCount() {
        return this.childNodes.length;
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
    setAttribute(attName, value) {
        var _a;
        this._attributes[attName] = value;
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.setAttribute(attName, value);
        if (attName === "style") {
            this._style = value;
            this._styles = {};
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
        if (this.textContent)
            return `<span>${this.textContent}</span>`;
        if (this.tagName === "br")
            return "<br>";
        if (this.tagName === "hr")
            return "<hr>";
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
        this.childNodes.length && html.push(children);
        this.childNodes.length && (html.push(`${"".padStart(indentLevel, " ")}</${tagName}>`));
        return html.join(indentLevel !== -1 ? "\n" : "");
    }
}
exports.VDom_Element = VDom_Element;
_createNodeFromJson = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRvbV9FbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1ZEb20vSHRtbC9WRG9tX0VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUErRDtBQUkvRCxNQUFhLFlBQVk7SUFnQnZCLFlBQW9CLElBQWMsRUFBVSxRQUFnQixFQUFVLE1BQXNCLEVBQVUsV0FBb0I7UUFBdEcsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBZGxILGVBQVUsR0FBdUIsRUFBRSxDQUFZO1FBQy9DLGVBQVUsR0FBZ0IsRUFBRSxDQUFtQjtRQUMvQyxnQkFBVyxHQUE2QixFQUFFLENBQUs7UUFDL0MsWUFBTyxHQUFvQyxFQUFFLENBQUU7UUFDL0MsV0FBTSxHQUFrQixFQUFFLENBQXFCO1FBK0N2RCxjQUFTLEdBQUc7WUFDVixHQUFHLEVBQU0sQ0FBQyxTQUFpQixFQUFFLEVBQUU7O2dCQUM3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RSxNQUFBLElBQUksQ0FBQyxHQUFHLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ3JDLENBQUM7WUFDRCxNQUFNLEVBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQUU7O2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO2dCQUMvRCxNQUFBLElBQUksQ0FBQyxHQUFHLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3hDLENB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