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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEscUNBQXdGO0FBSXhGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUV4QixNQUFhLFlBQVk7SUEwQnZCLFlBQVksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsS0FBaUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBdkJwSCxlQUFVLEdBQWdDLEtBQUssQ0FBMkM7UUFDM0YsWUFBTyxHQUFvQyxDQUFDLE1BQU0sQ0FBQyxDQUF3QztRQUMzRixZQUFPLEdBQW9DLEVBQUUsQ0FBOEM7UUFDM0YsZUFBVSxHQUFtQyxJQUFJLENBQTBDO1FBQzNGLFlBQU8sR0FBb0MsRUFBRSxDQUE4QztRQUMzRixTQUFJLEdBQXVDLEVBQUUsQ0FBOEM7UUFDM0YsV0FBTSxHQUFxQyxDQUFDLENBQStDO1FBQzFGLGFBQVEsR0FBa0MsUUFBUSxDQUF3QztRQUMxRixnQkFBVyxHQUErQiw4Q0FBOEMsQ0FBRTtRQUMxRixhQUFRLEdBQWtDLGlCQUFpQixDQUErQjtRQUkxRixpQkFBWSxHQUFHOzs7Ozs7Ozs0QkFRRyxDQUFBO1FBR3hCLElBQUksQ0FBQyxXQUFXO1lBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFM0MsSUFBSSxDQUFDLFFBQVEsR0FBTSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFRO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBRTtJQUNyRCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUEyQjtRQUNsRCxNQUFNLElBQUksR0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBRTtRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFHO1FBRXZELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLG1CQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFFRCxtQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0lBRUssUUFBUTs7WUFDWixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixXQUFXLEdBQUksSUFBSSxDQUFHO2dCQUV0QixNQUFNLG1CQUFVLENBQUM7b0JBQ2YsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLCtCQUErQjtvQkFDbkUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLDZDQUE2QztvQkFDakYsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLGdDQUFnQztvQkFDcEUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLCtCQUErQjtvQkFDbkUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLGdDQUFnQztvQkFDcEUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLHFDQUFxQztvQkFDekUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLHFDQUFxQztpQkFDMUUsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWpGRCxvQ0FpRkMifQ==