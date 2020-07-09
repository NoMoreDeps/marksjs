"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineQuoteRenderer = void 0;
class InlineQuoteRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 100;
    }
    render() {
        let rgx = /\`{1}(.*?)\`{1}/;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "<code>$1</code>");
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
exports.InlineQuoteRenderer = InlineQuoteRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5saW5lUXVvdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9JbmxpbmVRdW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLG1CQUFtQjtJQUFoQztRQUdVLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDN0IsWUFBTyxHQUEyQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUU7UUFDMUYsWUFBTyxHQUEyQixFQUFFLENBQXNEO1FBQzFGLFlBQU8sR0FBMkIsRUFBRSxDQUFzRDtRQUMxRixlQUFVLEdBQXdCLElBQUksQ0FBb0Q7UUFDMUYsU0FBSSxHQUE4QixFQUFFLENBQXNEO1FBQzFGLFdBQU0sR0FBNEIsR0FBRyxDQUFxRDtJQThCbkcsQ0FBQztJQTVCQyxNQUFNO1FBQ0osSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTs7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxtQ0FBSSxLQUFLLENBQUM7U0FDaEQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBSztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBRTtJQUMxQixDQUFDO0NBQ0Y7QUF2Q0Qsa0RBdUNDIn0=