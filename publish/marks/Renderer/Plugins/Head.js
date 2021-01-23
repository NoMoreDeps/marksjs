"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadRenderer = void 0;
const Helper_1 = require("./Helper");
class HeadRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["HEAD"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 0;
    }
    render() {
        var _a, _b, _c, _d;
        if (!this.document)
            this.document = this.getDocument();
        let rgx = /^\s*(?<header>#{1,6})(?<content>.*)/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            Helper_1.prepareInternals(this);
            const rgxRes = rgx.exec(this.content);
            const header = (_b = (_a = rgxRes === null || rgxRes === void 0 ? void 0 : rgxRes.groups) === null || _a === void 0 ? void 0 : _a["header"]) !== null && _b !== void 0 ? _b : "";
            const content = (_d = (_c = rgxRes === null || rgxRes === void 0 ? void 0 : rgxRes.groups) === null || _c === void 0 ? void 0 : _c["content"]) !== null && _d !== void 0 ? _d : "";
            this.content = `<h${header.length}>${content}</h${header.length}>`;
            this.domContent = this.document.createElement(`div`);
            this.domContent.setInnerHTML(this.content);
            this.domContent = this.domContent.getChildItem(0);
            Helper_1.processInternals(this, "head");
        }
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        return this.type === "HEAD";
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
}
exports.HeadRenderer = HeadRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0hlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXdGO0FBSXhGLE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBa0IsS0FBSyxDQUFnQjtRQUNsRCxZQUFPLEdBQWlDLENBQUMsTUFBTSxDQUFDLENBQUU7UUFDbEQsWUFBTyxHQUFpQyxFQUFFLENBQVE7UUFDbEQsWUFBTyxHQUFpQyxFQUFFLENBQVE7UUFDbEQsZUFBVSxHQUFnQyxJQUFJLENBQUk7UUFDbEQsU0FBSSxHQUFvQyxFQUFFLENBQVE7UUFDbEQsV0FBTSxHQUFxQyxDQUFDLENBQU07SUF3QzNELENBQUM7SUFyQ0MsTUFBTTs7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFZLEVBQUUsQ0FBQztRQUV4RCxJQUFJLEdBQUcsR0FBRyxxQ0FBcUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQix5QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixNQUFNLE1BQU0sR0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLE1BQU0sZUFBSSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsTUFBTSwwQ0FBRyxRQUFRLG9DQUFNLEVBQUUsQ0FBQztZQUNsRCxNQUFNLE9BQU8sZUFBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsTUFBTSwwQ0FBRyxTQUFTLG9DQUFLLEVBQUUsQ0FBQztZQUVsRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ25FLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkQseUJBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBakRELG9DQWlEQyJ9