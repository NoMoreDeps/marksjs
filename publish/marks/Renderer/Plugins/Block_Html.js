"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHtmlRenderer = void 0;
const Helper_1 = require("./Helper");
class BlockHtmlRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 0;
    }
    render() {
        var _a;
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        Helper_1.prepareInternals(this);
        this.domContent = this.document.createElement((_a = this.options.elt) !== null && _a !== void 0 ? _a : "div");
        this.domContent.setInnerHTML(this.content);
        Helper_1.processInternals(this, "html");
        this.domContent.onMount(`alert("Mounted")`);
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "html") {
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
exports.BlockHtmlRenderer = BlockHtmlRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfSHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0Jsb2NrX0h0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EscUNBQXdGO0FBS3hGLE1BQWEsaUJBQWlCO0lBQTlCO1FBR1UsZUFBVSxHQUFpQixLQUFLLENBQWlCO1FBQ2xELFlBQU8sR0FBZ0MsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUNsRCxZQUFPLEdBQWdDLEVBQUUsQ0FBUztRQUNsRCxZQUFPLEdBQWdDLEVBQUUsQ0FBUztRQUNsRCxlQUFVLEdBQStCLElBQUksQ0FBSztRQUNsRCxTQUFJLEdBQW1DLEVBQUUsQ0FBUztRQUNsRCxXQUFNLEdBQWlDLENBQUMsQ0FBVTtJQXNDM0QsQ0FBQztJQWpDQyxNQUFNOztRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBSXhCLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLE9BQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1DQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQyx5QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7O1FBQ1IsSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwwQ0FBRSxXQUFXLFFBQU8sTUFBTSxFQUFFO1lBQy9DLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUEvQ0QsOENBK0NDIn0=