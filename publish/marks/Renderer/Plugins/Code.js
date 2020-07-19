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
            console.log("hasBeenInit", hasBeenInit);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEscUNBQStHO0FBSS9HLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUd4QixNQUFhLFlBQVk7SUFnQnZCLFlBQVksRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsS0FBaUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBYnBILGVBQVUsR0FBNEIsS0FBSyxDQUEyQztRQUN2RixZQUFPLEdBQWdDLENBQUMsTUFBTSxDQUFDLENBQXdDO1FBQ3ZGLFlBQU8sR0FBZ0MsRUFBRSxDQUE4QztRQUN2RixlQUFVLEdBQStCLElBQUksQ0FBNEM7UUFDekYsWUFBTyxHQUFnQyxFQUFFLENBQThDO1FBQ3ZGLFNBQUksR0FBbUMsRUFBRSxDQUE4QztRQUN2RixXQUFNLEdBQWlDLENBQUMsQ0FBK0M7UUFDdEYsYUFBUSxHQUE4QixRQUFRLENBQXdDO1FBQ3RGLGdCQUFXLEdBQTJCLDhDQUE4QyxDQUFFO1FBQ3RGLGFBQVEsR0FBOEIsaUJBQWlCLENBQUM7UUFLOUQsSUFBSSxDQUFDLFdBQVc7WUFBRSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxHQUFNLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLElBQUksQ0FBQyxRQUFRLENBQVE7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFFO0lBQ3JELENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQTJCO1FBQ2xELE1BQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFFO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUc7UUFFdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsbUJBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUVELG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztJQUVLLGNBQWMsQ0FBQyxhQUFzQzs7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsV0FBVyxHQUFJLElBQUksQ0FBRztnQkFFdEIsTUFBTSxtQkFBVSxDQUFDO29CQUNmLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSwrQkFBK0I7b0JBQ25FLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSw2Q0FBNkM7b0JBQ2pGLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxnQ0FBZ0M7b0JBQ3BFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSwrQkFBK0I7b0JBQ25FLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxnQ0FBZ0M7b0JBQ3BFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxxQ0FBcUM7b0JBQ3pFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxxQ0FBcUM7aUJBQzFFLENBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTSxDQUFFLE1BQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDL0IsTUFBTSxrQkFBUyxFQUFFLENBQUM7YUFDbkI7WUFFRCxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkIsQ0FBQztLQUFBO0NBQ0Y7QUE5RUQsb0NBOEVDIn0=