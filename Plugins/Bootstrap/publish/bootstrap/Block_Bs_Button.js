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
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        const payload = JSON.parse(`{ ${this.content} }`);
        this.domContent = this.document.createElement("button");
        this.domContent.setAttribute("type", "button");
        this.domContent.classList.add("btn");
        this.domContent.classList.add(`btn-${payload.outlined ? "outline-" : ""}${(_a = payload.type) !== null && _a !== void 0 ? _a : "primary"}`);
        this.domContent.setInnerText(payload.label);
        if (payload.onClick) {
            this.domContent.setAttribute("onClick", payload.onClick);
        }
        marks_1.Helper.applyStyle(this, "bs-button");
        marks_1.Helper.processRef(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfQnNfQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jsb2NrX0JzX0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBeUM7QUFLekMsTUFBYSxxQkFBcUI7SUFBbEM7UUFHVSxlQUFVLEdBQWtCLEtBQUssQ0FBaUI7UUFDbkQsWUFBTyxHQUFpQyxDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQ25ELFlBQU8sR0FBaUMsRUFBRSxDQUFTO1FBQ25ELFlBQU8sR0FBaUMsRUFBRSxDQUFTO1FBQ25ELGVBQVUsR0FBZ0MsSUFBSSxDQUFLO1FBQ25ELFNBQUksR0FBb0MsRUFBRSxDQUFTO1FBQ25ELFdBQU0sR0FBa0MsQ0FBQyxDQUFVO0lBMEM1RCxDQUFDO0lBbEQwRCxDQUFDO0lBYTFELE1BQU07O1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFFeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFBLE9BQU8sQ0FBQyxJQUFJLG1DQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFEO1FBRUQsY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7O1FBQ1IsSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwwQ0FBRSxXQUFXLFFBQU8sV0FBVyxFQUFFO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUFuREQsc0RBbURDIn0=