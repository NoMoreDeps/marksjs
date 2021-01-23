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
exports.CodeRenderer = void 0;
const Helper_1 = require("./Helper");
let hasBeenInit = false;
class CodeRenderer {
    constructor({ skipInit, version, serverPath } = { skipInit: false }) {
        this._succeeded = false;
        this.applyTo = ["CODE"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 0;
        this._version = "1.20.0";
        this._serverPath = "https://cdnjs.cloudflare.com/ajax/libs/prism";
        this._depName = "marks_prism_dep";
        this._MountScript = `function _mksPrismMountScript() {
    if (!window["Prism"]) {
      setTimeout(() => {
        _mksMermaidMountScript();
      }, 100);
      return;
    }
    Prism.highlightAll();
  };_mksPrismMountScript();`;
        if (!hasBeenInit)
            hasBeenInit = !!skipInit;
        this._version = version !== null && version !== void 0 ? version : this._version;
        this._serverPath = serverPath !== null && serverPath !== void 0 ? serverPath : this._serverPath;
    }
    render() {
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        const code = this.document.createElement("code");
        this.domContent = this.document.createElement("pre");
        code.appendText(this.content);
        this.domContent.appendChild(code);
        Helper_1.applyStyle(this, "code");
        if (this.options.language) {
            code.classList.add(`language-${this.options.language}`);
        }
        Helper_1.processRef(this);
        this.domContent.onMount(this._MountScript);
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        return this.type === "CODE";
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
    willInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasBeenInit) {
                hasBeenInit = true;
                yield Helper_1.loadAssets([
                    `${this._serverPath}/${this._version}/components/prism-core.min.js`,
                    `${this._serverPath}/${this._version}/plugins/autoloader/prism-autoloader.min.js`,
                    `${this._serverPath}/${this._version}/themes/prism-tomorrow.min.css`,
                    `${this._serverPath}/${this._version}/components/prism-bash.min.js`,
                    `${this._serverPath}/${this._version}/components/prism-clike.min.js`,
                    `${this._serverPath}/${this._version}/components/prism-javascript.min.js`,
                    `${this._serverPath}/${this._version}/components/prism-typescript.min.js`
                ]);
            }
        });
    }
}
exports.CodeRenderer = CodeRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEscUNBQStHO0FBSS9HLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUV4QixNQUFhLFlBQVk7SUEwQnZCLFlBQVksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsS0FBaUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBdkJwSCxlQUFVLEdBQTRCLEtBQUssQ0FBMkM7UUFDdkYsWUFBTyxHQUFnQyxDQUFDLE1BQU0sQ0FBQyxDQUF3QztRQUN2RixZQUFPLEdBQWdDLEVBQUUsQ0FBOEM7UUFDdkYsZUFBVSxHQUErQixJQUFJLENBQTBDO1FBQ3ZGLFlBQU8sR0FBZ0MsRUFBRSxDQUE4QztRQUN2RixTQUFJLEdBQW1DLEVBQUUsQ0FBOEM7UUFDdkYsV0FBTSxHQUFpQyxDQUFDLENBQStDO1FBQ3RGLGFBQVEsR0FBOEIsUUFBUSxDQUF3QztRQUN0RixnQkFBVyxHQUEyQiw4Q0FBOEMsQ0FBRTtRQUN0RixhQUFRLEdBQThCLGlCQUFpQixDQUFDO1FBSXhELGlCQUFZLEdBQUc7Ozs7Ozs7OzRCQVFHLENBQUE7UUFHeEIsSUFBSSxDQUFDLFdBQVc7WUFBRSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxHQUFNLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLElBQUksQ0FBQyxRQUFRLENBQVE7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFFO0lBQ3JELENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQTJCO1FBQ2xELE1BQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFFO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUc7UUFFdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsbUJBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUVELG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7SUFFSyxRQUFROztZQUNaLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLFdBQVcsR0FBSSxJQUFJLENBQUc7Z0JBRXRCLE1BQU0sbUJBQVUsQ0FBQztvQkFDZixHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsK0JBQStCO29CQUNuRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsNkNBQTZDO29CQUNqRixHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsZ0NBQWdDO29CQUNwRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsK0JBQStCO29CQUNuRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsZ0NBQWdDO29CQUNwRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEscUNBQXFDO29CQUN6RSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEscUNBQXFDO2lCQUMxRSxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtDQUNGO0FBakZELG9DQWlGQyJ9