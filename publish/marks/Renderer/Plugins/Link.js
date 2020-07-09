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
            let link = this.content.replace(rgx, `<a href="$2" target=$3>$1</a>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBYSxZQUFZO0lBQXpCO1FBR1UsZUFBVSxHQUFZLEtBQUssQ0FBeUU7UUFDckcsWUFBTyxHQUEyQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFFO1FBQ3JHLFlBQU8sR0FBMkIsRUFBRSxDQUFpRTtRQUNyRyxZQUFPLEdBQTJCLEVBQUUsQ0FBaUU7UUFDckcsZUFBVSxHQUF3QixJQUFJLENBQStEO1FBQ3JHLFNBQUksR0FBOEIsRUFBRSxDQUFpRTtRQUNyRyxXQUFNLEdBQTRCLEVBQUUsQ0FBaUU7SUFpQzlHLENBQUM7SUF6Q29HLENBQUM7SUFVcEcsTUFBTTtRQUNKLElBQUksR0FBRyxHQUFHLGtEQUFrRCxDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1lBQ3RFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxtQ0FBSSxLQUFLLENBQUM7U0FDaEQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUExQ0Qsb0NBMENDIn0=