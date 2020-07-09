"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRenderer = void 0;
const Helper_1 = require("./Helper");
class CheckRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["CHECK"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 0;
    }
    render() {
        var _a;
        Helper_1.prepareInternals(this);
        this.domContent = document.createElement(((_a = this.options) === null || _a === void 0 ? void 0 : _a.ordered) ? "ol" : "ul");
        const checkRgx = /\s*(?<type>[\-0-9]\.?)\s*(?<check>\[[ x]\])\s*(?<text>.*)\s*/;
        const list = this.content
            .split("\n")
            .map(_ => _.trim())
            .map(_ => {
            var _a, _b, _c;
            const rg = checkRgx.exec(_);
            return {
                type: (_a = rg === null || rg === void 0 ? void 0 : rg.groups) === null || _a === void 0 ? void 0 : _a["type"],
                check: (_b = rg === null || rg === void 0 ? void 0 : rg.groups) === null || _b === void 0 ? void 0 : _b["check"],
                text: (_c = rg === null || rg === void 0 ? void 0 : rg.groups) === null || _c === void 0 ? void 0 : _c["text"],
            };
        })
            .forEach(_ => {
            var _a, _b, _c;
            const li = document.createElement("li");
            const domType = document.createElement("input");
            domType.setAttribute("type", "checkbox");
            ((_a = _.check) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "[x]" && (domType.setAttribute("checked", "checked"));
            domType.onclick = () => false;
            domType.style.marginRight = "5px";
            li.appendChild(domType);
            const text = document.createElement("span");
            text.innerHTML = _.text;
            li.appendChild(text);
            !!!((_b = this.options) === null || _b === void 0 ? void 0 : _b.bullet) && (li.style.listStyleType = "none");
            (_c = this.domContent) === null || _c === void 0 ? void 0 : _c.appendChild(li);
        });
        Helper_1.processInternals(this, "task");
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
exports.CheckRenderer = CheckRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9DaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBdUg7QUFFdkgsTUFBYSxhQUFhO0lBQTFCO1FBR1UsZUFBVSxHQUEyQixLQUFLLENBQU07UUFDakQsWUFBTyxHQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQ2pELFlBQU8sR0FBK0IsRUFBRSxDQUFTO1FBQ2pELGVBQVUsR0FBNEIsSUFBSSxDQUFPO1FBQ2pELFlBQU8sR0FBK0IsRUFBRSxDQUFTO1FBQ2pELFNBQUksR0FBa0MsRUFBRSxDQUFTO1FBQ2pELFdBQU0sR0FBZ0MsQ0FBQyxDQUFVO0lBd0QxRCxDQUFDO0lBdERDLE1BQU07O1FBQ0oseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlFLE1BQU0sUUFBUSxHQUFHLDhEQUE4RCxDQUFDO1FBQ2hGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPO2FBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUNQLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTztnQkFDTCxJQUFJLFFBQUksRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE1BQU0sMENBQUcsTUFBTSxDQUFDO2dCQUM1QixLQUFLLFFBQUcsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE1BQU0sMENBQUcsT0FBTyxDQUFDO2dCQUM3QixJQUFJLEVBQUksTUFBQSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsTUFBTSwwQ0FBRyxNQUFNLENBQVc7YUFDdkMsQ0FBQTtRQUNILENBQUMsQ0FBQzthQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7WUFDWCxNQUFNLEVBQUUsR0FBUSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFLO1lBQ2pELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUU7WUFFakQsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsT0FBQSxDQUFDLENBQUMsS0FBSywwQ0FBRSxXQUFXLFFBQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVqRixPQUFPLENBQUMsT0FBTyxHQUFhLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBRTtZQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQVE7WUFFekMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV4QixNQUFNLElBQUksR0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFFO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBMEI7WUFFakQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsUUFBQyxJQUFJLENBQUMsT0FBTywwQ0FBRSxNQUFNLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtRQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUVMLHlCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFRLElBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBakVELHNDQWlFQyJ9