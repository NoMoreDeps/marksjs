"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkRenderer = void 0;
class LinkRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK-Q", "HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 90;
    }
    ;
    render() {
        let rgx = /\[(?<alt>.*?)\]\((?<link>.*?)\s*(?<to>\".+\")?\)/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            let link = this.content
                .replace(rgx, `<a href="$2" target=$3>$1</a>`)
                .replace(/[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT]/g, "")
                .replace(/[oO][nN][eE][rR][rR][oO][rR]/g, "");
            if (link.includes("target=>")) {
                link = link.replace("target=>", ">");
            }
            return link;
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
exports.LinkRenderer = LinkRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsTUFBYSxZQUFZO0lBQXpCO1FBR1UsZUFBVSxHQUFZLEtBQUssQ0FBeUU7UUFDckcsWUFBTyxHQUEyQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFFO1FBQ3JHLFlBQU8sR0FBMkIsRUFBRSxDQUFpRTtRQUNyRyxZQUFPLEdBQTJCLEVBQUUsQ0FBaUU7UUFDckcsZUFBVSxHQUEwQixJQUFJLENBQStEO1FBQ3ZHLFNBQUksR0FBOEIsRUFBRSxDQUFpRTtRQUNyRyxXQUFNLEdBQTRCLEVBQUUsQ0FBaUU7SUFvQzlHLENBQUM7SUE1Q29HLENBQUM7SUFVcEcsTUFBTTtRQUNKLElBQUksR0FBRyxHQUFHLGtEQUFrRCxDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUNwQixPQUFPLENBQUMsR0FBRyxFQUFFLCtCQUErQixDQUFDO2lCQUM3QyxPQUFPLENBQUMsMkNBQTJDLEVBQUUsRUFBRSxDQUFDO2lCQUN4RCxPQUFPLENBQUMsK0JBQStCLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLG1DQUFJLEtBQUssQ0FBQztTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQTdDRCxvQ0E2Q0MifQ==