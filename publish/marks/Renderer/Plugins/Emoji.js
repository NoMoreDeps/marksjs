"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiRenderer = void 0;
const Helper_1 = require("./Helper");
let hasBeenInit = false;
class EmojiRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 100;
        this._serverPath = "https://cdn.jsdelivr.net/gh/NoMoreDeps/marksjs/statics/emoji.css";
    }
    render() {
        let rgx = /\:([aA-zZ0-9+-]+)\:/;
        let rgxSkipBegin = /\:(-+)\:/;
        let rgxSkipEnd = /##(-+)##/;
        let content = this.content;
        content = content.replace(rgxSkipBegin, `##$1##`);
        this._succeeded = rgx.test(content);
        if (this._succeeded) {
            content = content.replace(rgx, `<i class="em em-$1" aria-role="presentation"></i>`);
        }
        content = content.replace(rgxSkipEnd, `:$1:`);
        if (this._succeeded) {
            return content;
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
    renderFinished(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasBeenInit) {
                hasBeenInit = true;
                yield Helper_1.loadAssets([
                    `${this._serverPath}`,
                ]);
            }
        });
    }
}
exports.EmojiRenderer = EmojiRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1vamkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUmVuZGVyZXIvUGx1Z2lucy9FbW9qaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSxxQ0FBc0U7QUFFdEUsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBRXhCLE1BQWEsYUFBYTtJQUExQjtRQUdVLGVBQVUsR0FBWSxLQUFLLENBQThFO1FBQzFHLFlBQU8sR0FBMkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBUztRQUMxRyxZQUFPLEdBQTJCLEVBQUUsQ0FBc0U7UUFDMUcsWUFBTyxHQUEyQixFQUFFLENBQXNFO1FBQzFHLGVBQVUsR0FBMEIsSUFBSSxDQUFrRTtRQUMxRyxTQUFJLEdBQThCLEVBQUUsQ0FBc0U7UUFDMUcsV0FBTSxHQUE0QixHQUFHLENBQXFFO1FBQ3pHLGdCQUFXLEdBQXNCLGtFQUFrRSxDQUFNO0lBa0RuSCxDQUFDO0lBaERDLE1BQU07UUFDSixJQUFJLEdBQUcsR0FBSSxxQkFBcUIsQ0FBRTtRQUNsQyxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFM0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLG1EQUFtRCxDQUFDLENBQUM7U0FDckY7UUFFRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLG1DQUFJLEtBQUssQ0FBQztTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7SUFFSyxjQUFjLENBQUMsYUFBc0M7O1lBQ3pELElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLFdBQVcsR0FBSSxJQUFJLENBQUM7Z0JBRXBCLE1BQU0sbUJBQVUsQ0FBQztvQkFDZixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7aUJBQ3RCLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUE1REQsc0NBNERDIn0=