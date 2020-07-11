"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        var _a, _b, _c;
        super(_RendererRepository);
        this.type = "BLOCK";
        if (!value)
            return;
        this.reset();
        this.parseOptions((_c = (_b = (_a = /^\s*\[(?<options>.*?)\]\s*\{\{/.exec(value.text)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b["options"]) !== null && _c !== void 0 ? _c : "");
    }
    append(value) {
        this.source.length > 0 && (this.source += "\n");
        this.source += value.text;
        this.parse();
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kZWxzL0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXFFO0FBR3JFLGVBQXFCLFNBQVEscUJBQVM7SUFHcEMsWUFBWSxLQUFzQixFQUFFLG1CQUF3Qzs7UUFDMUUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFIcEIsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQUk5QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFFbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFlBQVksbUJBQ2QsZ0NBQXdDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsMENBQUUsTUFBTSwwQ0FBRyxTQUFTLG9DQUFLLEVBQUUsQ0FDdEYsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBdUI7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBbEJELDRCQWtCQyJ9