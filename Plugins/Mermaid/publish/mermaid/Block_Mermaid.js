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
let _MountScriptIndex = 0;
class BlockMermaidRenderer {
    constructor({ skipInit, version, selector } = { skipInit: false }) {
        this._succeeded = false;
        this.applyTo = ["BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 0;
        this._version = "8.8.0";
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
    getMountedScript() {
        _MountScriptIndex++;
        return `function _MarksMermaidMountScript${_MountScriptIndex}() {
      if (!window["mermaid"]) {
        setTimeout(() => {
          _MarksMermaidMountScript${_MountScriptIndex}();
        }, 100);
        return;
      }
      mermaid.init(undefined, ".${this._selector}");

      for (let i=0; i<5; i++) {
        setTimeout(() => {
          document.querySelectorAll(".${this._selector} > svg").forEach(_ => _.style.width = "100%");
        }, 100 * i);
      }
    };_MarksMermaidMountScript${_MountScriptIndex}();`;
    }
    render() {
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        this.domContent = this.document.createElement("div");
        this.domContent.classList.add(this._selector);
        this.domContent.appendText(this.content);
        Helper_1.processRef(this);
        this.domContent.onMount(this.getMountedScript());
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
    willInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const waitAsync = () => new Promise(r => setTimeout(() => { r(true); }, 0));
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
        });
    }
}
exports.BlockMermaidRenderer = BlockMermaidRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfTWVybWFpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CbG9ja19NZXJtYWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLG9FQUE4RztBQUk5RyxJQUFJLFdBQVcsR0FBUyxLQUFLLENBQUU7QUFDL0IsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQU07QUFHL0IsTUFBYSxvQkFBb0I7SUFtQy9CLFlBQVksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsS0FBK0QsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBaENoSCxlQUFVLEdBQWtCLEtBQUssQ0FBd0I7UUFDMUQsWUFBTyxHQUFtQyxDQUFDLE9BQU8sQ0FBQyxDQUFPO1FBQzFELFlBQU8sR0FBbUMsRUFBRSxDQUFjO1FBQzFELFlBQU8sR0FBbUMsRUFBRSxDQUFjO1FBQzFELGVBQVUsR0FBZ0MsSUFBSSxDQUFZO1FBQzFELFNBQUksR0FBc0MsRUFBRSxDQUFjO1FBQzFELFdBQU0sR0FBb0MsQ0FBQyxDQUFlO1FBQ3pELGFBQVEsR0FBaUMsT0FBTyxDQUFTO1FBQ3pELGNBQVMsR0FBZ0MsY0FBYyxDQUFFO1FBeUIvRCxJQUFJLFFBQVEsRUFBRTtZQUNaLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztTQUMzQjtJQUNILENBQUM7SUE3Qk8sZ0JBQWdCO1FBQ3RCLGlCQUFpQixFQUFFLENBQUM7UUFDcEIsT0FBTyxvQ0FBb0MsaUJBQWlCOzs7b0NBRzVCLGlCQUFpQjs7OztrQ0FJbkIsSUFBSSxDQUFDLFNBQVM7Ozs7d0NBSVIsSUFBSSxDQUFDLFNBQVM7OztnQ0FHdEIsaUJBQWlCLEtBQUssQ0FBQztJQUNyRCxDQUFDO0lBY0QsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekMsbUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDBDQUFFLFdBQVcsUUFBTyxTQUFTLEVBQUU7WUFDbEQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7SUFFSyxRQUFROztZQUNaLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBRW5CLE1BQU0sbUJBQVUsQ0FBQyxDQUFDLDZCQUE2QixJQUFJLENBQUMsUUFBUSxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBRXJGLE9BQU0sQ0FBRSxNQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sU0FBUyxFQUFFLENBQUM7aUJBQ25CO2dCQUVELE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ2pCLFdBQVcsRUFBQyxLQUFLO29CQUNqQixLQUFLLEVBQUUsUUFBUTtpQkFDaEIsQ0FBQyxDQUFDO2FBQ0o7UUFFSCxDQUFDO0tBQUE7Q0FDRjtBQS9GRCxvREErRkMifQ==