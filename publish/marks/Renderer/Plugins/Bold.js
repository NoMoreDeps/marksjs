"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoldRenderer = void 0;
class BoldRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 101;
    }
    render() {
        let rgxReplace = /\_{2}(.*?)\_{2}/;
        let rgx = /\s+\_{2}(.*?)\_{2}/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgxReplace, "<b>$1</b>");
        }
        rgx = /\*{2}(.*?)\*{2}/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "<b>$1</b>");
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
exports.BoldRenderer = BoldRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0JvbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBYSxZQUFZO0lBQXpCO1FBR1UsZUFBVSxHQUF1QixLQUFLLENBQTREO1FBQ25HLFlBQU8sR0FBMkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBRTtRQUNuRyxZQUFPLEdBQTJCLEVBQUUsQ0FBK0Q7UUFDbkcsWUFBTyxHQUEyQixFQUFFLENBQStEO1FBQ25HLGVBQVUsR0FBMEIsSUFBSSxDQUE2RDtRQUNyRyxTQUFJLEdBQThCLEVBQUUsQ0FBK0Q7UUFDbkcsV0FBTSxHQUE0QixHQUFHLENBQThEO0lBcUM1RyxDQUFDO0lBbENDLE1BQU07UUFDSixJQUFJLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUN0RDtRQUVELEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMvQztRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxtQ0FBSSxLQUFLLENBQUM7U0FDaEQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUE5Q0Qsb0NBOENDIn0=