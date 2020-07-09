"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Text_1 = __importDefault(require("./Text"));
class default_1 extends Text_1.default {
    constructor(value, _RendererRepository) {
        super(value, _RendererRepository);
        this.type = "HEAD";
        this.reset();
        this.source = value.text;
        if (this.source.includes("::- ")) {
            const sourceTab = this.source.split("::-");
            this.source = sourceTab[0];
            this.parseOptions(sourceTab[1]);
        }
        this.parse();
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbHMvSGVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLGtEQUFxRTtBQUdyRSxlQUFxQixTQUFRLGNBQUk7SUFHL0IsWUFBWSxLQUFxQixFQUFFLG1CQUF1QztRQUN4RSxLQUFLLENBQUMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFIM0IsU0FBSSxHQUFZLE1BQU0sQ0FBQztRQUk5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBRTtZQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBZkQsNEJBZUMifQ==