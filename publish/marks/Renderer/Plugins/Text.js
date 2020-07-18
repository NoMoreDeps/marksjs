"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRenderer = void 0;
const Helper_1 = require("./Helper");
class TextRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["TEXT", "BLANK"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 0;
    }
    render() {
        var _a;
        if (!this.document)
            this.document = this.getDocument();
        //console.log(this.content, this.options, this.themeStyles)
        this._succeeded = false;
        if (this.type === "BLANK") {
            this.domContent = this.document.createElement("p");
            for (let i = 1; i < this.content.length; i += 2) {
                this.domContent.appendChild(this.document.createElement("br"));
            }
        }
        else {
            if (this.content.length > 0) {
                Helper_1.prepareInternals(this);
                this.domContent = this.document.createElement((_a = this.options.elt) !== null && _a !== void 0 ? _a : "span");
                this.domContent.setInnerHTML(this.content.replace(/\n/g, "<br />"));
                Helper_1.processInternals(this, "text");
            }
        }
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        return this.applyTo.includes(this.type);
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
}
exports.TextRenderer = TextRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL1RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXlGO0FBSXpGLE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBZ0MsS0FBSyxDQUFjO1FBQzlELFlBQU8sR0FBb0MsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUU7UUFDOUQsWUFBTyxHQUFvQyxFQUFFLENBQWlCO1FBQzlELGVBQVUsR0FBbUMsSUFBSSxDQUFhO1FBQzlELFlBQU8sR0FBb0MsRUFBRSxDQUFpQjtRQUM5RCxTQUFJLEdBQXVDLEVBQUUsQ0FBaUI7UUFDOUQsV0FBTSxHQUFxQyxDQUFDLENBQWtCO0lBd0N2RSxDQUFDO0lBcENDLE1BQU07O1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFDeEQsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQWEsS0FBSyxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNoRTtTQUNGO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXZCLElBQUksQ0FBQyxVQUFVLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLE9BQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1DQUFJLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFbkUseUJBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFRLElBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBakRELG9DQWlEQyJ9