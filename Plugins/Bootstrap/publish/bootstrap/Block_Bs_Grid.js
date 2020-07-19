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
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        this.options.nested = "true";
        this.domContent = this.document.createElement("div");
        marks_1.Helper.prepareInternals(this);
        this.domContent.classList.add("container");
        const gridDef = this.content.split("\n").map(_ => _.trim());
        let row = this.document.createElement("div");
        row.classList.add("row");
        gridDef.forEach(cell => {
            var _a;
            if (cell === "") {
                if (row.childElementCount > 0) {
                    (_a = this.domContent) === null || _a === void 0 ? void 0 : _a.appendChild(row);
                }
                row = this.document.createElement("div");
                row.classList.add("row");
                return;
            }
            const [styles, placeholder] = cell.split("|");
            const cellDom = this.document.createElement("div");
            styles.split(",").forEach(s => {
                cellDom.classList.add(s);
            });
            cellDom.setInnerHTML(placeholder);
            row.appendChild(cellDom);
        });
        if (row.childElementCount > 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfQnNfR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CbG9ja19Cc19HcmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUt5QjtBQUl6QixNQUFhLG1CQUFtQjtJQUFoQztRQUdVLGVBQVUsR0FBZ0IsS0FBSyxDQUFpQjtRQUNqRCxZQUFPLEdBQStCLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDakQsWUFBTyxHQUErQixFQUFFLENBQVM7UUFDakQsWUFBTyxHQUErQixFQUFFLENBQVM7UUFDakQsZUFBVSxHQUE4QixJQUFJLENBQU87UUFDbkQsU0FBSSxHQUFrQyxFQUFFLENBQVM7UUFDakQsV0FBTSxHQUFnQyxDQUFDLENBQVU7SUE4RDFELENBQUM7SUF6REMsTUFBTTs7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFZLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRCxjQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTVELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O1lBQ3JCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtnQkFDZixJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7b0JBQzdCLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRTtpQkFDbkM7Z0JBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsT0FBTzthQUNSO1lBQ0QsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtZQUM3QixNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUU7U0FDbkM7UUFFRCxjQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDBDQUFFLFdBQVcsUUFBTyxTQUFTLEVBQUU7WUFDbEQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQXZFRCxrREF1RUMifQ==