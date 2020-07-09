"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class default_1 extends BaseModel_1.BaseModel {
    constructor(value, _RendererRepository) {
        super(_RendererRepository);
        this.type = "BLOCK-Q";
        this.source = value.text.replace(">", "");
        if (this.source.includes("::- ")) {
            const sourceTab = this.source.split("::-");
            this.source = sourceTab[0];
            this.parseOptions(sourceTab[1]);
        }
        this.parse();
    }
    append(value) {
        this.source += "\n";
        this.source += value.text.replace(">", "");
        this.parse();
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tRLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01vZGVscy9CbG9ja1EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBcUU7QUFHckUsZUFBcUIsU0FBUSxxQkFBUztJQUdwQyxZQUFZLEtBQXFCLEVBQUUsbUJBQXVDO1FBQ3hFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBSHBCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFJaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFMUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBRTtZQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUF1QjtRQUM1QixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUFyQkQsNEJBcUJDIn0=