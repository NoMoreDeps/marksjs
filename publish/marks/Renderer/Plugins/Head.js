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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0hlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXVIO0FBSXZILE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDN0IsWUFBTyxHQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFFO1FBQzVDLFlBQU8sR0FBMkIsRUFBRSxDQUFRO1FBQzVDLFlBQU8sR0FBMkIsRUFBRSxDQUFRO1FBQzVDLGVBQVUsR0FBMEIsSUFBSSxDQUFNO1FBQzlDLFNBQUksR0FBOEIsRUFBRSxDQUFRO1FBQzVDLFdBQU0sR0FBZ0MsQ0FBQyxDQUFZO0lBd0M1RCxDQUFDO0lBckNDLE1BQU07O1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFFeEQsSUFBSSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkIsTUFBTSxNQUFNLEdBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxNQUFNLGVBQUksTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sMENBQUcsUUFBUSxvQ0FBTSxFQUFFLENBQUM7WUFDbEQsTUFBTSxPQUFPLGVBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sMENBQUcsU0FBUyxvQ0FBSyxFQUFFLENBQUM7WUFFbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNuRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5ELHlCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQWpERCxvQ0FpREMifQ==