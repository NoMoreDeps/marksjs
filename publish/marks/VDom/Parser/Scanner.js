"use strict";
/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlScanner = void 0;
const Node = __importStar(require("./Node"));
const { ELEMENT_NODE, TEXT_NODE, COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, } = Node.NODE_TYPE;
const { DoctypeNode, DocumentNode } = Node;
/**
 * html5 self close tags <http://xahlee.info/js/html5_non-closing_tag.html>
 *
 * The space before the slash is optional.
 * <area />
 * <base />
 * <br />
 * <col />
 * <command />
 * <embed />
 * <hr />
 * <img />
 * <input />
 * <keygen />
 * <link />
 * <meta />
 * <param />
 * <source />
 * <track />
 * <wbr />
 *
 * Is the Ending Slash Optional?
 * - HTML5: the slash is optional.
 * - HTML4: the slash is technically invalid. However, it's accepted by W3C's HTML validator.
 * - XHTML: The slash is REQUIRED.
 */
const doctypeRe = /^\s*<!doctype\s+(html)(\s+public(\s+('[^']+'|"[^"]+"))?(\s+('[^']+'|"[^"]+"))?)?\s*/i;
const elementProcessor = {
    doctype(ctx, tagName, attrs, isSelfColse, input) {
        const parentNode = ctx.path[ctx.path.length - 1];
        const parts = doctypeRe.exec(input) || [];
        const node = new DoctypeNode({
            tagName: 'doctype',
            nodeType: DOCUMENT_TYPE_NODE,
            parentNode: parentNode,
            name: parts[1],
            publicId: parts[4] && parts[4].substring(1, parts[4].length - 1),
            systemId: parts[6] && parts[6].substring(1, parts[6].length - 1),
        });
        parentNode.appendChild(node);
    },
    _default(ctx, tagName, attrs, isSelfColse, input) {
        const parentNode = ctx.path[ctx.path.length - 1];
        const node = new Node.Node({
            tagName,
            nodeType: ELEMENT_NODE,
            attrs,
            parentNode
        });
        parentNode.appendChild(node);
        if (!isSelfColse) {
            // deepin
            ctx.path.push(node);
        }
    },
    _selfCloseTag(ctx, tagName, attrs, isSelfColse, input) {
        elementProcessor._default(ctx, tagName, attrs, true, input);
    }
};
// doctype
elementProcessor['!doctype'] = elementProcessor['doctype'];
// self close tag
// semicolon to prevent error js parse
['area', 'base', 'link', 'br', 'hr', 'col', 'command', 'embed', 'img', 'input', 'keygen', 'meta', 'param', 'source', 'track', 'wbr']
    .forEach(tag => {
    elementProcessor[tag] = elementProcessor._selfCloseTag;
});
class HtmlScanner {
    constructor() {
        this.reset();
    }
    reset() {
        this.rootNode = new DocumentNode({
            tagName: "document",
            nodeType: DOCUMENT_NODE,
        });
        this.path = [this.rootNode];
    }
    getRootNode() {
        return this.rootNode;
    }
    startElement(tagName, attrs, isSelfColse, input) {
        tagName = tagName.toLowerCase();
        if (elementProcessor[tagName]) {
            return elementProcessor[tagName](this, tagName, attrs, isSelfColse, input);
        }
        return elementProcessor._default(this, tagName, attrs, isSelfColse, input);
    }
    endElement(tagName) {
        this.path.pop();
    }
    characters(text) {
        // drop empty text node
        if (/^\s*$/.test(text))
            return;
        const currentNode = this.path[this.path.length - 1];
        const node = new Node.Node({
            tagName: 'text',
            nodeType: TEXT_NODE,
            textContent: text,
            parentNode: currentNode,
        });
        currentNode.appendChild(node);
    }
    comment(text) {
        const currentNode = this.path[this.path.length - 1];
        const node = new Node.Node({
            tagName: 'comment',
            nodeType: COMMENT_NODE,
            textContent: text,
            parentNode: currentNode,
        });
        currentNode.appendChild(node);
    }
}
exports.HtmlScanner = HtmlScanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WRG9tL1BhcnNlci9TY2FubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILDZDQUErQjtBQUUvQixNQUFNLEVBQ0osWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osYUFBYSxFQUNiLGtCQUFrQixHQUNuQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFFbkIsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLFNBQVMsR0FBRyxzRkFBc0YsQ0FBQTtBQUN4RyxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFRLEVBQUUsT0FBZSxFQUFFLEtBQVUsRUFBRSxXQUFvQixFQUFFLEtBQWE7UUFDaEYsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRTtRQUNsRCxNQUFNLEtBQUssR0FBUSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBSTtRQUVsRCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMzQixPQUFPLEVBQU0sU0FBUztZQUN0QixRQUFRLEVBQUssa0JBQWtCO1lBQy9CLFVBQVUsRUFBRyxVQUFVO1lBQ3ZCLElBQUksRUFBUyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFFBQVEsRUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkUsUUFBUSxFQUFL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