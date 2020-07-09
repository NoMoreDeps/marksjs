"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        super(_RendererRepository);
        this.type = "TABLE";
        let source = value.text;
        let opts = "";
        if (value.text.includes("::- ")) {
            [source, opts] = value.text.split("::-");
        }
        this.source = source;
        if (opts.length) {
            this.parseOptions(opts);
            // console.log("TBL OPT", this.options)
        }
    }
    append(value) {
        this.source += "\n";
        this.source += value.text;
        this.parse();
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kZWxzL1RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXFFO0FBR3JFLGVBQXFCLFNBQVEscUJBQVM7SUFFcEMsWUFBWSxLQUFxQixFQUFFLG1CQUF1QztRQUN4RSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUZwQixTQUFJLEdBQVcsT0FBTyxDQUFDO1FBRzlCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsdUNBQXVDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUF1QjtRQUM1QixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBdkJELDRCQXVCQyJ9