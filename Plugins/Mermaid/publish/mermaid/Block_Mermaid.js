"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMermaidRenderer = void 0;
const Helper_1 = require("@marks-js/marks/Renderer/Plugins/Helper");
let hasBeenInit = false;
class BlockMermaidRenderer {
    constructor({ skipInit, version, selector } = { skipInit: false }) {
        this._succeeded = false;
        this.applyTo = ["BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 0;
        this._version = "8.5.2";
        this._selector = "marksMermaid";
        if (skipInit) {
            hasBeenInit = true;
        }
        if (version) {
            this._version = version;
        }
        if (selector) {
            this._selector = selector;
        }
    }
    render() {
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        this.domContent = this.document.createElement("div");
        this.domContent.classList.add(this._selector);
        this.domContent.setInnerText(this.content);
        Helper_1.processRef(this);
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "mermaid") {
            return true;
        }
        return false;
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
    renderFinished(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const waitAsync = () => new Promise(r => setTimeout(() => { r(); }, 0));
            if (!hasBeenInit) {
                hasBeenInit = true;
                yield Helper_1.loadAssets([`https://unpkg.com/mermaid@${this._version}/dist/mermaid.min.js`]);
                while (!window["mermaid"]) {
                    yield waitAsync();
                }
                mermaid.initialize({
                    startOnLoad: false,
                    theme: "forest"
                });
            }
            if (targetElement === null || targetElement === void 0 ? void 0 : targetElement.dom) {
                while (!targetElement.dom.parentElement) {
                    yield waitAsync();
                }
            }
            while (!window["mermaid"]) {
                yield waitAsync();
            }
            mermaid.init(undefined, `.${this._selector}`);
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    document.querySelectorAll(`.${this._selector} > svg`).forEach(_ => _.style.width = "100%");
                }, 100 * i);
            }
        });
    }
}
exports.BlockMermaidRenderer = BlockMermaidRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfTWVybWFpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CbG9ja19NZXJtYWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLG9FQUEySTtBQUkzSSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFHeEIsTUFBYSxvQkFBb0I7SUFnQi9CLFlBQVksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsS0FBK0QsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBYmhILGVBQVUsR0FBZ0IsS0FBSyxDQUFxQjtRQUNyRCxZQUFPLEdBQStCLENBQUMsT0FBTyxDQUFDLENBQU07UUFDckQsWUFBTyxHQUErQixFQUFFLENBQWE7UUFDckQsWUFBTyxHQUErQixFQUFFLENBQWE7UUFDckQsZUFBVSxHQUE4QixJQUFJLENBQVM7UUFDckQsU0FBSSxHQUFrQyxFQUFFLENBQWE7UUFDckQsV0FBTSxHQUFnQyxDQUFDLENBQWM7UUFHcEQsYUFBUSxHQUE0QixPQUFPLENBQVM7UUFDcEQsY0FBUyxHQUEyQixjQUFjLENBQUU7UUFJMUQsSUFBSSxRQUFRLEVBQUU7WUFDWixXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztTQUN6QjtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFD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