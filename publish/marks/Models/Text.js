"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        super(_RendererRepository);
        this.type = "TEXT";
        this.reset();
        this.source = value.text;
        if (this.source.includes("::- ")) {
            const sourceTab = this.source.split("::-");
            this.source = sourceTab[0];
            this.parseOptions(sourceTab[1]);
        }
        if (this.source.endsWith("  ")) {
            this.source += "\n";
        }
        this.parse();
    }
    append(value) {
        this.source += value.text;
        if (value.text.endsWith("  ")) {
            this.source += "\n";
        }
        this.parse();
    }
    parse() {
        this.cleanSource = this.source;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbHMvVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFxRTtBQUlyRSxlQUFxQixTQUFRLHFCQUFTO0lBR3BDLFlBQVksS0FBcUIsRUFBRSxtQkFBdUM7UUFDeEUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFIN0IsU0FBSSxHQUFZLE1BQU0sQ0FBQztRQUlyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBRTtZQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBdUI7UUFDNUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUE5QkQsNEJBOEJDIn0=