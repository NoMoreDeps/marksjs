"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        super(_RendererRepository);
        this.type = "BLANK";
        this.reset();
        this.source = "@";
        this.parse();
    }
    append(value) {
        this.source += "@";
        this.parse();
    }
    parse() {
        this.cleanSource = this.source;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxhbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kZWxzL0JsYW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXFFO0FBSXJFLGVBQXFCLFNBQVEscUJBQVM7SUFHcEMsWUFBWSxLQUFxQixFQUFFLG1CQUF1QztRQUN4RSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUhwQixTQUFJLEdBQVksT0FBTyxDQUFDO1FBSS9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBcUI7UUFDMUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBbEJELDRCQWtCQyJ9