"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockTableRenderer = void 0;
const Helper_1 = require("./Helper");
class BlockTableRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 100;
    }
    render() {
        var _a, _b, _c;
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        Helper_1.prepareInternals(this);
        if (this.options.format === "markdown") {
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
        }
        if (this.options.format === "csv") {
            const sep = (_a = this.options.separator) !== null && _a !== void 0 ? _a : ",";
            const tabs = this.content.split("\n")
                .map(_ => {
                _ = _.trim();
                return _;
            });
            if (tabs.length < 2) {
                return this.content;
            }
            const headers = tabs.shift().split(sep);
            const alignInfo = headers.map((_, i) => {
                var _a;
                return (_a = this.options[`colAlign${i + 1}`]) !== null && _a !== void 0 ? _a : "left";
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
        ${row.split(sep).map((_, i) => {
                return `        <td align="${alignInfo[i]}">${_}</td>`;
            }).join("\n")}
        </tr>`).join("\n")}
      </tbody>
    </table>
      `;
            this.domContent = this.document.createElement("div");
            this.domContent.setInnerHTML(strTable);
        }
        if ((_b = this.domContent) === null || _b === void 0 ? void 0 : _b.findFirst(_ => _.tagName === "table")) {
            this.domContent = (_c = this.domContent) === null || _c === void 0 ? void 0 : _c.findFirst(_ => _.tagName === "table");
            Helper_1.applyStyle(this, "table");
            if (this.options.width)
                this.domContent.setStyle("width", this.options.width);
        }
        Helper_1.processInternals(this, "table");
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "table") {
            if (this.options.format) {
                switch (this.options.format) {
                    case "markdown":
                    case "csv":
                        return true;
                    default:
                        return false;
                }
            }
        }
        return false;
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
}
exports.BlockTableRenderer = BlockTableRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9CbG9ja19UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBbUk7QUFTbkksTUFBYSxrQkFBa0I7SUFBL0I7UUFHVSxlQUFVLEdBQTZCLEtBQUssQ0FBTTtRQUNuRCxZQUFPLEdBQWlDLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDbkQsWUFBTyxHQUFpQyxFQUFFLENBQVM7UUFDbkQsZUFBVSxHQUFnQyxJQUFJLENBQU87UUFDckQsWUFBTyxHQUFpQyxFQUFFLENBQVM7UUFDbkQsU0FBSSxHQUFvQyxFQUFFLENBQVM7UUFDbkQsV0FBTSxHQUFrQyxHQUFHLENBQVE7SUFnSjVELENBQUM7SUE1SUMsTUFBTTs7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFZLEVBQUUsQ0FBQztRQUV4RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4Qix5QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUJBQ2pDO2dCQUNELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBRUwsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBRUQsTUFBTSxPQUFPLEdBQUssSUFBSSxDQUFDLEtBQUssRUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBRTtZQUM1QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFFO1lBRUosSUFBSSxRQUFRLEdBQUc7Ozs7VUFLWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQixPQUFPLHNCQUFzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDZDs7OztRQUlBLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzs7VUFHZCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxzQkFBc0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2Q7Y0FDTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDbkI7OztPQUdDLENBQUM7WUFFRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDakMsTUFBTSxHQUFHLFNBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLG1DQUFJLEdBQUcsQ0FBQztZQUUxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFFRCxNQUFNLE9BQU8sR0FBSyxJQUFJLENBQUMsS0FBSyxFQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFFO1lBQzVDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUU7O2dCQUNwQyxhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUNBQUksTUFBTSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxRQUFRLEdBQUc7Ozs7VUFLWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQixPQUFPLHNCQUFzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDZDs7OztRQUlBLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzs7VUFHZCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxzQkFBc0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2Q7Y0FDTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDbkI7OztPQUdDLENBQUM7WUFFRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsVUFBSSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sR0FBRztZQUMxRCxJQUFJLENBQUMsVUFBVSxTQUFHLElBQUksQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDekUsbUJBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLFVBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEY7UUFFRCx5QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMENBQUUsV0FBVyxRQUFPLE9BQU8sRUFBRTtZQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUN2QixRQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUMxQixLQUFLLFVBQVUsQ0FBQztvQkFDaEIsS0FBSyxLQUFLO3dCQUNSLE9BQU8sSUFBSSxDQUFDO29CQUNkO3dCQUNFLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUF6SkQsZ0RBeUpDIn0=