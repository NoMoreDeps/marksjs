"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgRenderer = void 0;
class ImgRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK-Q", "HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 100;
    }
    render() {
        if (!this.document)
            this.document = this.getDocument();
        let rgx = /!\[(?<alt>.*?)\]\((?<link>.*?)\s*(?<title>\".+\")?\)/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, `<img src="$2" alt="$1" title=$3/>`)
                .replace(/[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT]/g, "")
                .replace(/[oO][nN][eE][rR][rR][oO][rR]/g, "");
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
exports.ImgRenderer = ImgRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvSW1nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLE1BQWEsV0FBVztJQUF4QjtRQUdVLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDN0IsWUFBTyxHQUEyQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFFO1FBQ3JHLFlBQU8sR0FBMkIsRUFBRSxDQUFpRTtRQUNyRyxZQUFPLEdBQTJCLEVBQUUsQ0FBaUU7UUFDckcsZUFBVSxHQUEwQixJQUFJLENBQStEO1FBQ3ZHLFNBQUksR0FBOEIsRUFBRSxDQUFpRTtRQUNyRyxXQUFNLEdBQTRCLEdBQUcsQ0FBZ0U7SUFrQzlHLENBQUM7SUEvQkMsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBRXhELElBQUksR0FBRyxHQUFHLHNEQUFzRCxDQUFDO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLG1DQUFtQyxDQUFDO2lCQUNwRSxPQUFPLENBQUMsMkNBQTJDLEVBQUUsRUFBRSxDQUFDO2lCQUN4RCxPQUFPLENBQUMsK0JBQStCLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUM7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7O1FBQ1IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN6QixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsbUNBQUksS0FBSyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztDQUNGO0FBM0NELGtDQTJDQyJ9