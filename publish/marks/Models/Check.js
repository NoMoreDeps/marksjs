"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        super(_RendererRepository);
        this.type = "CHECK";
        this.reset();
        this.source = value.text;
        if (this.source.includes("::- ")) {
            const sourceTab = this.source.split("::-");
            this.source = sourceTab[0];
            this.parseOptions(sourceTab[1]);
        }
        this.parse();
    }
    append(value) {
        this.source += "\n";
        this.source += value.text;
        this.parse();
    }
    parse() {
        this.cleanSource = this.source;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kZWxzL0NoZWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXFFO0FBS3JFLGVBQXFCLFNBQVEscUJBQVM7SUFHcEMsWUFBWSxLQUFxQixFQUFFLG1CQUF1QztRQUN4RSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUhwQixTQUFJLEdBQVksT0FBTyxDQUFDO1FBSS9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sU0FBUyxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFFO1lBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQXVCO1FBQzVCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUF6QkQsNEJBeUJDIn0=