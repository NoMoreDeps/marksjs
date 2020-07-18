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
        if (!this.document)
            this.document = this.getDocument();
        Helper_1.prepareInternals(this);
        this.domContent = this.document.createElement(((_a = this.options) === null || _a === void 0 ? void 0 : _a.ordered) ? "ol" : "ul");
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
            const li = this.document.createElement("li");
            const domType = this.document.createElement("input");
            domType.setAttribute("type", "checkbox");
            ((_a = _.check) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "[x]" && (domType.setAttribute("checked", "checked"));
            domType.setAttribute("onclick", `() => false`);
            domType.setStyle("margin-right", "5px");
            li.appendChild(domType);
            const text = this.document.createElement("span");
            text.setInnerHTML(_.text);
            li.appendChild(text);
            !!!((_b = this.options) === null || _b === void 0 ? void 0 : _b.bullet) && (li.setStyle("list-style-type", "none"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9DaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBdUg7QUFJdkgsTUFBYSxhQUFhO0lBQTFCO1FBR1UsZUFBVSxHQUEyQixLQUFLLENBQU07UUFDakQsWUFBTyxHQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQ2pELFlBQU8sR0FBK0IsRUFBRSxDQUFTO1FBQ2pELGVBQVUsR0FBOEIsSUFBSSxDQUFPO1FBQ25ELFlBQU8sR0FBK0IsRUFBRSxDQUFTO1FBQ2pELFNBQUksR0FBa0MsRUFBRSxDQUFTO1FBQ2pELFdBQU0sR0FBZ0MsQ0FBQyxDQUFVO0lBMkQxRCxDQUFDO0lBeERDLE1BQU07O1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFFeEQseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRixNQUFNLFFBQVEsR0FBRyw4REFBOEQsQ0FBQztRQUNoRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTzthQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1gsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7WUFDUCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU87Z0JBQ0wsSUFBSSxRQUFJLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxNQUFNLDBDQUFHLE1BQU0sQ0FBQztnQkFDNUIsS0FBSyxRQUFHLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxNQUFNLDBDQUFHLE9BQU8sQ0FBQztnQkFDN0IsSUFBSSxFQUFJLE1BQUEsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE1BQU0sMENBQUcsTUFBTSxDQUFXO2FBQ3ZDLENBQUE7UUFDSCxDQUFDLENBQUM7YUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ1gsTUFBTSxFQUFFLEdBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUs7WUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUU7WUFFdEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsT0FBQSxDQUFDLENBQUMsS0FBSywwQ0FBRSxXQUFXLFFBQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVqRixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMvQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV4QyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhCLE1BQU0sSUFBSSxHQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFFO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFCLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLFFBQUMsSUFBSSxDQUFDLE9BQU8sMENBQUUsTUFBTSxDQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxXQUFXLENBQUMsRUFBRSxFQUFFO1FBQ25DLENBQUMsQ0FBQyxDQUFBO1FBRUwseUJBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQVEsSUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUFwRUQsc0NBb0VDIn0=