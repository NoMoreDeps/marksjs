"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItalicRenderer = void 0;
class ItalicRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 100;
    }
    render() {
        let rgx = /\_{1}(.*?)\_{1}/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "<em>$1</em>");
        }
        rgx = /\*{1}(.*?)\*{1}/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "<em>$1</em>");
        }
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (this.type === "BLOCK") {
            return (_a = this.options.emp !== undefined) !== null && _a !== void 0 ? _a : false;
        }
        return true;
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
}
exports.ItalicRenderer = ItalicRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRhbGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvSXRhbGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLE1BQWEsY0FBYztJQUEzQjtRQUdVLGVBQVUsR0FBWSxLQUFLLENBQXVFO1FBQ25HLFlBQU8sR0FBMkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBRTtRQUNuRyxZQUFPLEdBQTJCLEVBQUUsQ0FBK0Q7UUFDbkcsWUFBTyxHQUEyQixFQUFFLENBQStEO1FBQ25HLGVBQVUsR0FBMEIsSUFBSSxDQUE2RDtRQUNyRyxTQUFJLEdBQThCLEVBQUUsQ0FBK0Q7UUFDbkcsV0FBTSxHQUE0QixHQUFHLENBQThEO0lBbUM1RyxDQUFDO0lBakNDLE1BQU07UUFDSixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUVELEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxtQ0FBSSxLQUFLLENBQUM7U0FDaEQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUE1Q0Qsd0NBNENDIn0=