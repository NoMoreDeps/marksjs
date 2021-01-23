"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRenderer = void 0;
const Helper_1 = require("./Helper");
const Helper_2 = require("./Helper");
class TableRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["TABLE"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 0;
    }
    render() {
        var _a, _b;
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        Helper_1.prepareInternals(this);
        const tabs = this.content.split("\n")
            .map(_ => {
            _ = _.trim();
            if (_.endsWith("|")) {
                _ = _.substring(0, _.length - 1);
            }
            _ = _.substr(1);
            return _;
        });
        if (tabs.length < 2) {
            return this.content;
        }
        const headers = tabs.shift().split("|");
        const alignInfo = tabs.shift().split("|").map(_ => {
            let align = "left";
            _.startsWith(":") && _.endsWith(":") && (align = "center");
            !_.startsWith(":") && _.endsWith(":") && (align = "right");
            return align;
        });
        let strTable = `
  <table>
    <thead>
      <tr>
      ${headers.map((_, i) => {
            return `        <th align="${alignInfo[i]}">${_}</th>`;
        }).join("\n")}
      </tr>
    </thead>
    <tbody>
    ${tabs.map(row => `
      <tr>
      ${row.split("|").map((_, i) => {
            return `        <td align="${alignInfo[i]}">${_}</td>`;
        }).join("\n")}
      </tr>`).join("\n")}
    </tbody>
  </table>
    `;
        this.domContent = this.document.createElement("div");
        this.domContent.setInnerHTML(strTable);
        if ((_a = this.domContent) === null || _a === void 0 ? void 0 : _a.findFirst(_ => _.tagName === "table")) {
            this.domContent = (_b = this.domContent) === null || _b === void 0 ? void 0 : _b.findFirst(_ => _.tagName === "table");
            Helper_1.applyStyle(this, "table");
            if (this.options.width)
                this.domContent.setStyle("width", this.options.width);
        }
        Helper_2.processNestedRef(this);
        Helper_2.processRef(this);
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
exports.TableRenderer = TableRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxxQ0FBa0Y7QUFDbEYscUNBQWtGO0FBT2xGLE1BQWEsYUFBYTtJQUExQjtRQUdVLGVBQVUsR0FBaUMsS0FBSyxDQUFNO1FBQ3ZELFlBQU8sR0FBcUMsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUN2RCxZQUFPLEdBQXFDLEVBQUUsQ0FBUztRQUN2RCxlQUFVLEdBQW9DLElBQUksQ0FBSztRQUN2RCxZQUFPLEdBQXFDLEVBQUUsQ0FBUztRQUN2RCxTQUFJLEdBQXdDLEVBQUUsQ0FBUztRQUN2RCxXQUFNLEdBQXNDLENBQUMsQ0FBVTtJQW9GaEUsQ0FBQztJQWpGQyxNQUFNOztRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXpCLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNsQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTthQUNqQztZQUNELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7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