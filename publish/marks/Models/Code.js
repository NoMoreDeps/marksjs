"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        super(_RendererRepository);
        this.type = "CODE";
        this.parseOptions(`language:${value.text.trim().substr(3)}`);
        super.source = "";
    }
    append(value) {
        this.source.length > 0 && (this.source += "\n");
        this.source += value.text;
        this.parse();
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbHMvQ29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUFxRTtBQUdyRSxlQUFxQixTQUFRLHFCQUFTO0lBR3BDLFlBQVksS0FBcUIsRUFBRSxtQkFBdUM7UUFDeEUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFIcEIsU0FBSSxHQUFZLE1BQU0sQ0FBQztRQUk5QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdELEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBdUI7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBZEQsNEJBY0MifQ==