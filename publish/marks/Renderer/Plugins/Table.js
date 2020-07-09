"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRenderer = void 0;
const Helper_1 = require("./Helper");
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
        this.domContent = document.createElement("div");
        this.domContent.innerHTML = strTable;
        if ((_a = this.domContent) === null || _a === void 0 ? void 0 : _a.querySelector("table")) {
            this.domContent = (_b = this.domContent) === null || _b === void 0 ? void 0 : _b.querySelector("table");
            Helper_1.applyStyle(this, "table");
            if (this.options.width)
                this.domContent.style.width = this.options.width;
        }
        Helper_1.processNestedRef(this);
        Helper_1.processRef(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBbUk7QUFPbkksTUFBYSxhQUFhO0lBQTFCO1FBR1UsZUFBVSxHQUE0QixLQUFLLENBQU07UUFDbEQsWUFBTyxHQUFnQyxDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQ2xELFlBQU8sR0FBZ0MsRUFBRSxDQUFTO1FBQ2xELGVBQVUsR0FBNkIsSUFBSSxDQUFPO1FBQ2xELFlBQU8sR0FBZ0MsRUFBRSxDQUFTO1FBQ2xELFNBQUksR0FBbUMsRUFBRSxDQUFTO1FBQ2xELFdBQU0sR0FBaUMsQ0FBQyxDQUFVO0lBaUYzRCxDQUFDO0lBL0VDLE1BQU07O1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFekIseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ25CLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ2pDO1lBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxPQUFPLEdB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