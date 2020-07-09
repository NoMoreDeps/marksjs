"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockBsGridRenderer = void 0;
const marks_1 = require("@marks-js/marks");
class BlockBsGridRenderer {
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
        this.options.nested = "true";
        this.domContent = document.createElement("div");
        marks_1.Helper.prepareInternals(this);
        this.domContent.classList.add("container");
        const gridDef = this.content.split("\n").map(_ => _.trim());
        let row = document.createElement("div");
        row.classList.add("row");
        gridDef.forEach(cell => {
            var _a;
            if (cell === "") {
                if (row.childNodes.length > 0) {
                    (_a = this.domContent) === null || _a === void 0 ? void 0 : _a.appendChild(row);
                }
                row = document.createElement("div");
                row.classList.add("row");
                return;
            }
            const [styles, placeholder] = cell.split("|");
            const cellDom = document.createElement("div");
            styles.split(",").forEach(s => {
                cellDom.classList.add(s);
            });
            cellDom.innerHTML = placeholder;
            row.appendChild(cellDom);
        });
        if (row.childNodes.length > 0) {
            (_a = this.domContent) === null || _a === void 0 ? void 0 : _a.appendChild(row);
        }
        marks_1.Helper.processInternals(this, "bs-grid");
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "bs-grid") {
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
exports.BlockBsGridRenderer = BlockBsGridRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfQnNfR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CbG9ja19Cc19HcmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUt5QjtBQUV6QixNQUFhLG1CQUFtQjtJQUFoQztRQUdVLGVBQVUsR0FBZ0IsS0FBSyxDQUFpQjtRQUNqRCxZQUFPLEdBQStCLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDakQsWUFBTyxHQUErQixFQUFFLENBQVM7UUFDakQsWUFBTyxHQUErQixFQUFFLENBQVM7UUFDakQsZUFBVSxHQUE0QixJQUFJLENBQU87UUFDakQsU0FBSSxHQUFrQyxFQUFFLENBQVM7UUFDakQsV0FBTSxHQUFnQyxDQUFDLENBQVU7SUEyRDFELENBQUM7SUF4REMsTUFBTTs7UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFNUQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNyQixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzdCLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRTtpQkFDbkM7Z0JBQ0QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixPQUFPO2FBQ1I7WUFDRCxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUNoQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxXQUFXLENBQUMsR0FBRyxFQUFFO1NBQ25DO1FBRUQsY0FBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7O1FBQ1IsSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwwQ0FBRSxXQUFXLFFBQU8sU0FBUyxFQUFFO1lBQ2xELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUFwRUQsa0RBb0VDIn0=