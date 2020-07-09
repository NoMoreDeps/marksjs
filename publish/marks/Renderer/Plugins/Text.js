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
        //console.log(this.content, this.options, this.themeStyles)
        this._succeeded = false;
        if (this.type === "BLANK") {
            this.domContent = document.createElement("p");
            for (let i = 1; i < this.content.length; i += 2) {
                this.domContent.appendChild(document.createElement("br"));
            }
        }
        else {
            if (this.content.length > 0) {
                Helper_1.prepareInternals(this);
                this.domContent = document.createElement((_a = this.options.elt) !== null && _a !== void 0 ? _a : "span");
                this.domContent.innerHTML = this.content.replace(/\n/g, "<br />");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL1RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXlGO0FBRXpGLE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBMkIsS0FBSyxDQUFjO1FBQ3pELFlBQU8sR0FBK0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUU7UUFDekQsWUFBTyxHQUErQixFQUFFLENBQWlCO1FBQ3pELGVBQVUsR0FBNEIsSUFBSSxDQUFlO1FBQ3pELFlBQU8sR0FBK0IsRUFBRSxDQUFpQjtRQUN6RCxTQUFJLEdBQWtDLEVBQUUsQ0FBaUI7UUFDekQsV0FBTSxHQUFnQyxDQUFDLENBQWtCO0lBcUNsRSxDQUFDO0lBbkNDLE1BQU07O1FBQ0osMkRBQTJEO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQWEsS0FBSyxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV2QixJQUFJLENBQUMsVUFBVSxHQUFhLFFBQVEsQ0FBQyxhQUFhLE9BQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1DQUFJLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRWpFLHlCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNqQztTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBUSxJQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQTlDRCxvQ0E4Q0MifQ==