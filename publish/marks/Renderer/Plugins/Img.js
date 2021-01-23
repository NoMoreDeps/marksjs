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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvSW1nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLE1BQWEsV0FBVztJQUF4QjtRQUdVLGVBQVUsR0FBa0IsS0FBSyxDQUF5RTtRQUMzRyxZQUFPLEdBQWlDLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUU7UUFDM0csWUFBTyxHQUFpQyxFQUFFLENBQWlFO1FBQzNHLFlBQU8sR0FBaUMsRUFBRSxDQUFpRTtRQUMzRyxlQUFVLEdBQWdDLElBQUksQ0FBNkQ7UUFDM0csU0FBSSxHQUFvQyxFQUFFLENBQWlFO1FBQzNHLFdBQU0sR0FBaUMsR0FBRyxDQUFpRTtJQWtDcEgsQ0FBQztJQS9CQyxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBWSxFQUFFLENBQUM7UUFFeEQsSUFBSSxHQUFHLEdBQUcsc0RBQXNELENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUM7aUJBQ3BFLE9BQU8sQ0FBQywyQ0FBMkMsRUFBRSxFQUFFLENBQUM7aUJBQ3hELE9BQU8sQ0FBQywrQkFBK0IsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUM5QztRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxtQ0FBSSxLQUFLLENBQUM7U0FDaEQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUEzQ0Qsa0NBMkNDIn0=