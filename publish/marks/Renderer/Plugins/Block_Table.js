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
                return (_a = this.options[`align_col${i + 1}`]) !== null && _a !== void 0 ? _a : "left";
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
        ${row.split(sep).map((_, i) => {
                return `        <td align="${alignInfo[i]}">${_}</td>`;
            }).join("\n")}
        </tr>`).join("\n")}
      </tbody>
    </table>
      `;
            this.domContent = document.createElement("div");
            this.domContent.innerHTML = strTable;
        }
        if ((_b = this.domContent) === null || _b === void 0 ? void 0 : _b.querySelector("table")) {
            this.domContent = (_c = this.domContent) === null || _c === void 0 ? void 0 : _c.querySelector("table");
            Helper_1.applyStyle(this, "table");
            if (this.options.width)
                this.domContent.style.width = this.options.width;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9CbG9ja19UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBbUk7QUFPbkksTUFBYSxrQkFBa0I7SUFBL0I7UUFHVSxlQUFVLEdBQTZCLEtBQUssQ0FBTTtRQUNuRCxZQUFPLEdBQWlDLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDbkQsWUFBTyxHQUFpQyxFQUFFLENBQVM7UUFDbkQsZUFBVSxHQUE4QixJQUFJLENBQU87UUFDbkQsWUFBTyxHQUFpQyxFQUFFLENBQVM7UUFDbkQsU0FBSSxHQUFvQyxFQUFFLENBQVM7UUFDbkQsV0FBTSxHQUFrQyxHQUFHLENBQVE7SUEwSTVELENBQUM7SUF4SUMsTUFBTTs7UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4Qix5QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNiLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUJBQ2pDO2dCQUNELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBRUwsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBRUQsTUFBTSxPQUFPLEdBQUssSUFBSSxDQUFDLEtBQUssRUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBRTtZQUM1QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFFO1lBRUosSUFBSSxRQUFRLEdBQUc7Ozs7VUFLWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQixPQUFPLHNCQUFzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDZDs7O1FBR0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDOztVQUdkLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQixPQUFPLHNCQUFzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDZDtjQUNNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQjs7O09BR0MsQ0FBQztZQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7U0FDdEM7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNqQyxNQUFNLEdBQUcsU0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsbUNBQUksR0FBRyxDQUFDO1lBRTFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDbEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNQLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztZQUVMLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUVELE1BQU0sT0FBTyxHQUFLLElBQUksQ0FBQyxLQUFLLEVBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUU7WUFDNUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3BDLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQ0FBSSxNQUFNLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLFFBQVEsR0FBRzs7OztVQUtYLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xCLE9BQU8sc0JBQXNCLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNkOzs7UUFHQSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7O1VBR2QsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFCLE9BQU8sc0JBQXNCLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNkO2NBQ00sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25COzs7T0FHQyxDQUFDO1lBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztTQUN0QztRQUVELFVBQUksSUFBSSxDQUFDLFVBQVUsMENBQUUsYUFBYSxDQUFDLE9BQU8sR0FBRztZQUMzQyxJQUFJLENBQUMsVUFBVSxTQUFHLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxtQkFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFBRSxJQUFJLENBQUMsVUFBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDekU7UUFFRCx5QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMENBQUUsV0FBVyxRQUFPLE9BQU8sRUFBRTtZQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUN2QixRQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUMxQixLQUFLLFVBQVUsQ0FBQztvQkFDaEIsS0FBSyxLQUFLO3dCQUNSLE9BQU8sSUFBSSxDQUFDO29CQUNkO3dCQUNFLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUFuSkQsZ0RBbUpDIn0=