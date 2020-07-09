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
        this._succeeded = false;
        Helper_1.prepareInternals(this);
        this.domContent = document.createElement((_a = this.options.elt) !== null && _a !== void 0 ? _a : "div");
        this.domContent.innerHTML = this.content;
        Helper_1.processInternals(this, "html");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfSHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0Jsb2NrX0h0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EscUNBQXdGO0FBRXhGLE1BQWEsaUJBQWlCO0lBQTlCO1FBR1UsZUFBVSxHQUFnQixLQUFLLENBQWlCO1FBQ2pELFlBQU8sR0FBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUNqRCxZQUFPLEdBQStCLEVBQUUsQ0FBUztRQUNqRCxZQUFPLEdBQStCLEVBQUUsQ0FBUztRQUNqRCxlQUFVLEdBQTRCLElBQUksQ0FBTztRQUNqRCxTQUFJLEdBQWtDLEVBQUUsQ0FBUztRQUNqRCxXQUFNLEdBQWdDLENBQUMsQ0FBVTtJQStCMUQsQ0FBQztJQTVCQyxNQUFNOztRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsT0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsbUNBQUksS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUV4Qyx5QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMENBQUUsV0FBVyxRQUFPLE1BQU0sRUFBRTtZQUMvQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBeENELDhDQXdDQyJ9