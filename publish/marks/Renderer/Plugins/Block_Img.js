"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockImgRenderer = void 0;
const Helper_1 = require("./Helper");
class BlockImgRenderer {
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
        this._succeeded = false;
        const payload = JSON.parse(`{ ${this.content} }`);
        this.domContent = document.createElement("img");
        this.domContent.setAttribute("alt", payload.alt);
        this.domContent.setAttribute("title", payload.title);
        this.domContent.setAttribute("src", payload.src);
        Helper_1.applyStyle(this, "img");
        Helper_1.processRef(this);
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "img") {
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
exports.BlockImgRenderer = BlockImgRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfSW1nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvQmxvY2tfSW1nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHFDQUE0RTtBQUU1RSxNQUFhLGdCQUFnQjtJQUE3QjtRQUdVLGVBQVUsR0FBeUIsS0FBSyxDQUFNO1FBQy9DLFlBQU8sR0FBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUMvQyxZQUFPLEdBQTZCLEVBQUUsQ0FBUztRQUMvQyxZQUFPLEdBQTZCLEVBQUUsQ0FBUztRQUMvQyxlQUFVLEdBQTBCLElBQUksQ0FBTztRQUMvQyxTQUFJLEdBQWdDLEVBQUUsQ0FBUztRQUMvQyxXQUFNLEdBQThCLENBQUMsQ0FBVTtJQWlDeEQsQ0FBQztJQS9CQyxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwRCxtQkFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixtQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDBDQUFFLFdBQVcsUUFBTyxLQUFLLEVBQUU7WUFDOUMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQTFDRCw0Q0EwQ0MifQ==