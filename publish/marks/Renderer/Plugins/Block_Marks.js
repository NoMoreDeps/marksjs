"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMarksRenderer = void 0;
const Helper_1 = require("./Helper");
class BlockMarksRenderer {
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
        var _a, _b;
        this._succeeded = false;
        const renderer = (_a = this.cloneRenderer) === null || _a === void 0 ? void 0 : _a.call(this);
        this.options.noPelt = "true";
        if (renderer) {
            this.content = Helper_1.formatMinSpace(this.content);
            this.domContent = renderer.internalRender(this.content);
            const refBackup = this.domContent;
            if (this.options.fetch) {
                fetch(this.options.fetch).then(_ => _.text()).then(_ => {
                    const ct = renderer.internalRender(_);
                    if (this.options.before) {
                        refBackup.prepend(ct);
                    }
                    else {
                        refBackup.appendChild(ct);
                    }
                });
            }
        }
        else {
            this.domContent = document.createElement((_b = this.options.elt) !== null && _b !== void 0 ? _b : "div");
            this.domContent.appendChild(document.createTextNode(this.content));
        }
        Helper_1.applyStyle(this, "marks");
        Helper_1.processRef(this);
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "marks") {
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
exports.BlockMarksRenderer = BlockMarksRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfTWFya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9CbG9ja19NYXJrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxxQ0FJa0I7QUFFbEIsTUFBYSxrQkFBa0I7SUFBL0I7UUFJVSxlQUFVLEdBQWEsS0FBSyxDQUFpQjtRQUM5QyxZQUFPLEdBQTRCLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDOUMsWUFBTyxHQUE0QixFQUFFLENBQVM7UUFDOUMsWUFBTyxHQUE0QixFQUFFLENBQVM7UUFDOUMsZUFBVSxHQUF5QixJQUFJLENBQU87UUFDOUMsU0FBSSxHQUErQixFQUFFLENBQVM7UUFDOUMsV0FBTSxHQUE0QixDQUFDLENBQVc7SUFtRHZELENBQUM7SUEvQ0MsTUFBTTs7UUFDSixJQUFJLENBQUMsVUFBVSxHQUFPLEtBQUssQ0FBbUI7UUFDOUMsTUFBTSxRQUFRLFNBQVEsSUFBSSxDQUFDLGFBQWEsK0NBQWxCLElBQUksQ0FBa0IsQ0FBRTtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQWtCO1FBRTlDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLE9BQU8sR0FBTSx1QkFBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBVztZQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFFO1lBRXpELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDdEIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNyRCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO3dCQUN2QixTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUN2Qjt5QkFBTTt3QkFDTCxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUMzQjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsT0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsbUNBQUksS0FBSyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNwRTtRQUVELG1CQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMENBQUUsV0FBVyxRQUFPLE9BQU8sRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBN0RELGdEQTZEQyJ9