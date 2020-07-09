"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        var _a, _b, _c;
        super(_RendererRepository);
        this.type = "BLOCK";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kZWxzL0Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXFFO0FBR3JFLGVBQXFCLFNBQVEscUJBQVM7SUFHcEMsWUFBWSxLQUFxQixFQUFFLG1CQUF1Qzs7UUFDeEUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFIcEIsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQUk5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsWUFBWSxtQkFDZCxnQ0FBd0MsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQ0FBRSxNQUFNLDBDQUFHLFNBQVMsb0NBQUssRUFBRSxDQUN0RixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUF1QjtRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUFoQkQsNEJBZ0JDIn0=