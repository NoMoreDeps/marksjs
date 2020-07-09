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
        this._succeeded = false;
        const code = document.createElement("code");
        this.domContent = document.createElement("pre");
        code.appendChild(document.createTextNode(this.content));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEscUNBQXFIO0FBRXJILElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUd4QixNQUFhLFlBQVk7SUFjdkIsWUFBWSxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxLQUFpRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFYcEgsZUFBVSxHQUE0QixLQUFLLENBQTJDO1FBQ3ZGLFlBQU8sR0FBZ0MsQ0FBQyxNQUFNLENBQUMsQ0FBd0M7UUFDdkYsWUFBTyxHQUFnQyxFQUFFLENBQThDO1FBQ3ZGLGVBQVUsR0FBNkIsSUFBSSxDQUE0QztRQUN2RixZQUFPLEdBQWdDLEVBQUUsQ0FBOEM7UUFDdkYsU0FBSSxHQUFtQyxFQUFFLENBQThDO1FBQ3ZGLFdBQU0sR0FBaUMsQ0FBQyxDQUErQztRQUN0RixhQUFRLEdBQThCLFFBQVEsQ0FBd0M7UUFDdEYsZ0JBQVcsR0FBMkIsOENBQThDLENBQUU7UUFDdEYsYUFBUSxHQUE4QixpQkFBaUIsQ0FBQztRQUc5RCxXQUFXLEdBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBc0I7UUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBTSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFRO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBRTtJQUNyRCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUEyQjtRQUNsRCxNQUFNLElBQUksR0FBUSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFFO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBRztRQUVsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsbUJBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUVELG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztJQUVLLGNBQWMsQ0FBQyxhQUFzQzs7WUFDekQsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsV0FBVyxHQUFJLElBQUksQ0FBRztnQkFFdEIsTUFBTSxtQkFBVSxDQUFDO29CQUNmLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSwrQkFBK0I7b0JBQ25FLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSw2Q0FBNkM7b0JBQ2pGLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxnQ0FBZ0M7b0JBQ3BFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSwrQkFBK0I7b0JBQ25FLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxnQ0FBZ0M7b0JBQ3BFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxxQ0FBcUM7b0JBQ3pFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxxQ0FBcUM7aUJBQzFFLENBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTSxDQUFFLE1BQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDL0IsTUFBTSxrQkFBUyxFQUFFLENBQUM7YUFDbkI7WUFFRCxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkIsQ0FBQztLQUFBO0NBQ0Y7QUF6RUQsb0NBeUVDIn0=