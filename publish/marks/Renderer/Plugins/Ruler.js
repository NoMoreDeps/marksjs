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
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        this.domContent = this.document.createElement("hr");
        if (this.options.variant === "dashed") {
            this.domContent.setStyle("border-style", "dashed");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9SdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBc0U7QUFJdEUsTUFBYSxhQUFhO0lBQTFCO1FBR1UsZUFBVSxHQUFnQyxLQUFLLENBQU07UUFDdEQsWUFBTyxHQUFvQyxDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQ3RELFlBQU8sR0FBb0MsRUFBRSxDQUFTO1FBQ3RELGVBQVUsR0FBbUMsSUFBSSxDQUFLO1FBQ3RELFlBQU8sR0FBb0MsRUFBRSxDQUFTO1FBQ3RELFNBQUksR0FBdUMsRUFBRSxDQUFTO1FBQ3RELFdBQU0sR0FBcUMsR0FBRyxDQUFRO0lBbUMvRCxDQUFDO0lBaENDLE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFZLEVBQUUsQ0FBQztRQUV4RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBQyxRQUFRLENBQUMsQ0FBQztTQUNuRDtRQUVELG1CQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFRLElBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBNUNELHNDQTRDQyJ9