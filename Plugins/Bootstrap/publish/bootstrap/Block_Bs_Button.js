"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockBsButtonRenderer = void 0;
const marks_1 = require("@marks-js/marks");
class BlockBsButtonRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 0;
    }
    ;
    render() {
        var _a;
        this._succeeded = false;
        const payload = JSON.parse(`{ ${this.content} }`);
        this.domContent = document.createElement("button");
        this.domContent.setAttribute("type", "button");
        this.domContent.classList.add("btn");
        this.domContent.classList.add(`btn-${payload.outlined ? "outline-" : ""}${(_a = payload.type) !== null && _a !== void 0 ? _a : "primary"}`);
        this.domContent.innerHTML = payload.label;
        if (payload.onClick) {
            const fct = new Function(payload.onClick);
            this.domContent.onclick = fct;
        }
        marks_1.Helper.applyStyle(this, "bs-button");
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
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "bs-button") {
            return true;
        }
        return false;
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
}
exports.BlockBsButtonRenderer = BlockBsButtonRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfQnNfQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jsb2NrX0JzX0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBeUM7QUFHekMsTUFBYSxxQkFBcUI7SUFBbEM7UUFHVSxlQUFVLEdBQWEsS0FBSyxDQUFpQjtRQUM5QyxZQUFPLEdBQTRCLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDOUMsWUFBTyxHQUE0QixFQUFFLENBQVM7UUFDOUMsWUFBTyxHQUE0QixFQUFFLENBQVM7UUFDOUMsZUFBVSxHQUF5QixJQUFJLENBQU87UUFDOUMsU0FBSSxHQUErQixFQUFFLENBQVM7UUFDOUMsV0FBTSxHQUE2QixDQUFDLENBQVU7SUEwQ3ZELENBQUM7SUFsRHFELENBQUM7SUFVckQsTUFBTTs7UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBQSxPQUFPLENBQUMsSUFBSSxtQ0FBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDMUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFVLENBQUM7U0FDdEM7UUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMENBQUUsV0FBVyxRQUFPLFdBQVcsRUFBRTtZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBbkRELHNEQW1EQyJ9