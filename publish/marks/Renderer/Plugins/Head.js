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
        let rgx = /^\s*(?<header>#{1,6})(?<content>.*)/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            Helper_1.prepareInternals(this);
            const rgxRes = rgx.exec(this.content);
            const header = (_b = (_a = rgxRes === null || rgxRes === void 0 ? void 0 : rgxRes.groups) === null || _a === void 0 ? void 0 : _a["header"]) !== null && _b !== void 0 ? _b : "";
            const content = (_d = (_c = rgxRes === null || rgxRes === void 0 ? void 0 : rgxRes.groups) === null || _c === void 0 ? void 0 : _c["content"]) !== null && _d !== void 0 ? _d : "";
            this.content = `<h${header.length}>${content}</h${header.length}>`;
            this.domContent = document.createElement(`div`);
            this.domContent.innerHTML = this.content;
            this.domContent = this.domContent.children.item(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0hlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXVIO0FBRXZILE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDN0IsWUFBTyxHQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFFO1FBQzVDLFlBQU8sR0FBMkIsRUFBRSxDQUFRO1FBQzVDLFlBQU8sR0FBMkIsRUFBRSxDQUFRO1FBQzVDLGVBQVUsR0FBd0IsSUFBSSxDQUFNO1FBQzVDLFNBQUksR0FBOEIsRUFBRSxDQUFRO1FBQzVDLFdBQU0sR0FBZ0MsQ0FBQyxDQUFZO0lBcUM1RCxDQUFDO0lBbkNDLE1BQU07O1FBQ0osSUFBSSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkIsTUFBTSxNQUFNLEdBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxNQUFNLGVBQUksTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sMENBQUcsUUFBUSxvQ0FBTSxFQUFFLENBQUM7WUFDbEQsTUFBTSxPQUFPLGVBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sMENBQUcsU0FBUyxvQ0FBSyxFQUFFLENBQUM7WUFFbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNuRSxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWdCLENBQUM7WUFFbkUseUJBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBOUNELG9DQThDQyJ9