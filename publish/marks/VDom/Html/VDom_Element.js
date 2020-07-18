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
            return this.textContent;
        let attrs = "";
        for (const i in this._attributes) {
            attrs += ` ${i}=${JSON.stringify(this._attributes[i])}`;
        }
        const classes = this._classList.join(" ");
        const children = this.childNodes.map(_ => _.toHtml(indentLevel !== -1 ? indentLevel + 2 : -1)).join(indentLevel !== -1 ? "\n" : "");
        const tagName = this._tagName;
        const html = [];
        html.push(`${"".padStart(indentLevel, " ")}<${tagName}${classes.length ? ` class="${classes}"` : ""}${attrs}>${this.childNodes.length === 0 ? `</${tagName}>` : ""}`);
        this.childNodes.length && html.push(children);
        this.childNodes.length && (html.push(`${"".padStart(indentLevel, " ")}</${tagName}>`));
        return html.join(indentLevel !== -1 ? "\n" : "");
    }
}
exports.VDom_Element = VDom_Element;
_createNodeFromJson = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRvbV9FbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1ZEb20vSHRtbC9WRG9tX0VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUErRDtBQUkvRCxNQUFhLFlBQVk7SUFnQnZCLFlBQW9CLElBQWMsRUFBVSxRQUFnQixFQUFVLE1BQXNCLEVBQVUsV0FBb0I7UUFBdEcsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBZGxILGVBQVUsR0FBdUIsRUFBRSxDQUFZO1FBQy9DLGVBQVUsR0FBZ0IsRUFBRSxDQUFtQjtRQUMvQyxnQkFBVyxHQUE2QixFQUFFLENBQUs7UUFDL0MsWUFBTyxHQUFvQyxFQUFFLENBQUU7UUFDL0MsV0FBTSxHQUFrQixFQUFFLENBQXFCO1FBK0N2RCxjQUFTLEdBQUc7WUFDVixHQUFHLEVBQU0sQ0FBQyxTQUFpQixFQUFFLEVBQUU7O2dCQUM3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RSxNQUFBLElBQUksQ0FBQyxHQUFHLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ3JDLENBQUM7WUFDRCxNQUFNLEVBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQUU7O2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO2dCQUMvRCxNQUFBLElBQUksQ0FBQyxHQUFHLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3hDLENB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