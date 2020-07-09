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
        this._succeeded = false;
        this.domContent = document.createElement("div");
        this.domContent.classList.add(this._selector);
        this.domContent.innerHTML = this.content;
        if (this.options.ref) {
            this.globalRefs[this.options.ref] = this.domContent;
            this.domContent = null;
        }
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
            if (targetElement) {
                while (!targetElement.parentElement) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfTWVybWFpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CbG9ja19NZXJtYWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLG9FQUE2RztBQUU3RyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFHeEIsTUFBYSxvQkFBb0I7SUFjL0IsWUFBWSxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxLQUErRCxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFYaEgsZUFBVSxHQUFnQixLQUFLLENBQXFCO1FBQ3JELFlBQU8sR0FBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBTTtRQUNyRCxZQUFPLEdBQStCLEVBQUUsQ0FBYTtRQUNyRCxZQUFPLEdBQStCLEVBQUUsQ0FBYTtRQUNyRCxlQUFVLEdBQTRCLElBQUksQ0FBVztRQUNyRCxTQUFJLEdBQWtDLEVBQUUsQ0FBYTtRQUNyRCxXQUFNLEdBQWdDLENBQUMsQ0FBYztRQUVwRCxhQUFRLEdBQTRCLE9BQU8sQ0FBUztRQUNwRCxjQUFTLEdBQTJCLGNBQWMsQ0FBRTtRQUcxRCxJQUFJLFFBQVEsRUFBRTtZQUNaLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FB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