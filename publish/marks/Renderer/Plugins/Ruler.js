"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulerRenderer = void 0;
const Helper_1 = require("./Helper");
class RulerRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["RULER"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 110;
    }
    render() {
        this._succeeded = false;
        this.domContent = document.createElement("hr");
        if (this.options.variant === "dashed") {
            this.domContent.style.borderStyle = "dashed";
        }
        Helper_1.applyStyle(this, "hr");
        if (this.options.ref) {
            this.globalRefs[this.options.ref] = this.domContent;
            this.domContent = null;
        }
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
exports.RulerRenderer = RulerRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9SdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBc0U7QUFFdEUsTUFBYSxhQUFhO0lBQTFCO1FBR1UsZUFBVSxHQUEyQixLQUFLLENBQU07UUFDakQsWUFBTyxHQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQ2pELFlBQU8sR0FBK0IsRUFBRSxDQUFTO1FBQ2pELGVBQVUsR0FBNEIsSUFBSSxDQUFPO1FBQ2pELFlBQU8sR0FBK0IsRUFBRSxDQUFTO1FBQ2pELFNBQUksR0FBa0MsRUFBRSxDQUFTO1FBQ2pELFdBQU0sR0FBZ0MsR0FBRyxDQUFRO0lBZ0MxRCxDQUFDO0lBOUJDLE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztTQUM5QztRQUVELG1CQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFRLElBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBekNELHNDQXlDQyJ9