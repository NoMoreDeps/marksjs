"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockQRenderer = void 0;
const Helper_1 = require("./Helper");
class BlockQRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK-Q"];
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
        this._succeeded = false;
        Helper_1.prepareInternals(this);
        this.domContent = this.document.createElement("blockquote");
        const renderer = (_a = this.cloneRenderer) === null || _a === void 0 ? void 0 : _a.call(this);
        if (renderer) {
            const contentTab = this.content.split("\n");
            this.content = contentTab.map(_ => _.trimLeft())
                .join("\n");
            const child = renderer.internalRender(this.content);
            if (child) {
                this.domContent.appendChild(child);
            }
        }
        else {
            console.log("No renderer");
        }
        Helper_1.processInternals(this, "blockquote");
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
exports.BlockQRenderer = BlockQRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tRdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0Jsb2NrUXVvdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXVIO0FBS3ZILE1BQWEsY0FBYztJQUEzQjtRQUdVLGVBQVUsR0FBOEIsS0FBSyxDQUFRO1FBQ3RELFlBQU8sR0FBa0MsQ0FBQyxTQUFTLENBQUMsQ0FBRTtRQUN0RCxZQUFPLEdBQWtDLEVBQUUsQ0FBVztRQUN0RCxlQUFVLEdBQWlDLElBQUksQ0FBUztRQUN4RCxZQUFPLEdBQWtDLEVBQUUsQ0FBVztRQUN0RCxTQUFJLEdBQXFDLEVBQUUsQ0FBVztRQUN0RCxXQUFNLEdBQW1DLENBQUMsQ0FBWTtJQTRDL0QsQ0FBQztJQXhDQyxNQUFNOztRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBRXhELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFNUQsTUFBTSxRQUFRLFNBQUcsSUFBSSxDQUFDLGFBQWEsK0NBQWxCLElBQUksQ0FBa0IsQ0FBQztRQUN4QyxJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEM7U0FDRjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUMzQjtRQUVELHlCQUFnQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFRLElBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBckRELHdDQXFEQyJ9