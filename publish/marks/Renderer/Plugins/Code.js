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
        code.appendChild(this.document.createElement("text", this.content));
        this.domContent.appendChild(code);
        Helper_1.applyStyle(this, "code");
        if (this.options.language) {
            code.classList.add(`language-${this.options.language}`);
        }
        Helper_1.processRef(this);
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
    renderFinished(targetElement) {
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
            while (!window["Prism"]) {
                yield Helper_1.waitAsync();
            }
            Prism.highlightAll();
        });
    }
}
exports.CodeRenderer = CodeRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEscUNBQStHO0FBSS9HLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUd4QixNQUFhLFlBQVk7SUFnQnZCLFlBQVksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsS0FBaUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBYnBILGVBQVUsR0FBNEIsS0FBSyxDQUEyQztRQUN2RixZQUFPLEdBQWdDLENBQUMsTUFBTSxDQUFDLENBQXdDO1FBQ3ZGLFlBQU8sR0FBZ0MsRUFBRSxDQUE4QztRQUN2RixlQUFVLEdBQStCLElBQUksQ0FBNEM7UUFDekYsWUFBTyxHQUFnQyxFQUFFLENBQThDO1FBQ3ZGLFNBQUksR0FBbUMsRUFBRSxDQUE4QztRQUN2RixXQUFNLEdBQWlDLENBQUMsQ0FBK0M7UUFDdEYsYUFBUSxHQUE4QixRQUFRLENBQXdDO1FBQ3RGLGdCQUFXLEdBQTJCLDhDQUE4QyxDQUFFO1FBQ3RGLGFBQVEsR0FBOEIsaUJBQWlCLENBQUM7UUFLOUQsV0FBVyxHQUFRLENBQUMsQ0FBQyxRQUFRLENBQXNCO1FBQ25ELElBQUksQ0FBQyxRQUFRLEdBQU0sT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBUTtRQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLElBQUksQ0FBQyxXQUFXLENBQUU7SUFDckQsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFZLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBMkI7UUFDbEQsTUFBTSxJQUFJLEdBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUU7UUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBRztRQUV2RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxtQkFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsbUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0lBRUssY0FBYyxDQUFDLGFBQXdDOztZQUMzRCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixXQUFXLEdBQUksSUFBSSxDQUFHO2dCQUV0QixNQUFNLG1CQUFVLENBQUM7b0JBQ2YsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLCtCQUErQjtvQkFDbkUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLDZDQUE2QztvQkFDakYsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLGdDQUFnQztvQkFDcEUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLCtCQUErQjtvQkFDbkUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLGdDQUFnQztvQkFDcEUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLHFDQUFxQztvQkFDekUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLHFDQUFxQztpQkFDMUUsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxPQUFNLENBQUUsTUFBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvQixNQUFNLGtCQUFTLEVBQUUsQ0FBQzthQUNuQjtZQUVELEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQUE7Q0FDRjtBQTVFRCxvQ0E0RUMifQ==