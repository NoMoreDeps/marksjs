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
        this._succeeded = false;
        Helper_1.prepareInternals(this);
        this.domContent = document.createElement("blockquote");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tRdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0Jsb2NrUXVvdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXVIO0FBR3ZILE1BQWEsY0FBYztJQUEzQjtRQUdVLGVBQVUsR0FBOEIsS0FBSyxDQUFRO1FBQ3RELFlBQU8sR0FBa0MsQ0FBQyxTQUFTLENBQUMsQ0FBRTtRQUN0RCxZQUFPLEdBQWtDLEVBQUUsQ0FBVztRQUN0RCxlQUFVLEdBQStCLElBQUksQ0FBUztRQUN0RCxZQUFPLEdBQWtDLEVBQUUsQ0FBVztRQUN0RCxTQUFJLEdBQXFDLEVBQUUsQ0FBVztRQUN0RCxXQUFNLEdBQW1DLENBQUMsQ0FBWTtJQXlDL0QsQ0FBQztJQXRDQyxNQUFNOztRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV2RCxNQUFNLFFBQVEsU0FBRyxJQUFJLENBQUMsYUFBYSwrQ0FBbEIsSUFBSSxDQUFrQixDQUFDO1FBQ3hDLElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFZCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztTQUNGO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQzNCO1FBRUQseUJBQWdCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQVEsSUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUFsREQsd0NBa0RDIn0=