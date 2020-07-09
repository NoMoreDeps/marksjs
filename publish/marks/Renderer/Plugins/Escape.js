"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeRenderer = void 0;
class EscapeRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["HEAD", "TEXT", "TABLE", "LIST-O", "LIST-U", "CHECK", "BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 150;
    }
    render() {
        let rgx = /\\\\/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#92;");
        }
        rgx = /\\&/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#38;");
        }
        rgx = /\\\-/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#45;");
        }
        rgx = /\\`/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#96;");
        }
        rgx = /\\\*/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#42;");
        }
        rgx = /\\_/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#95;");
        }
        rgx = /\\~/g;
        this._succeeded = rgx.test(this.content);
        if (this._succeeded) {
            return this.content.replace(rgx, "&#126;");
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
}
exports.EscapeRenderer = EscapeRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXNjYXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvRXNjYXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQWEsY0FBYztJQUEzQjtRQUdVLGVBQVUsR0FBdUIsS0FBSyxDQUE0RDtRQUNuRyxZQUFPLEdBQTJCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUU7UUFDbkcsWUFBTyxHQUEyQixFQUFFLENBQStEO1FBQ25HLFlBQU8sR0FBMkIsRUFBRSxDQUErRDtRQUNuRyxlQUFVLEdBQXdCLElBQUksQ0FBNkQ7UUFDbkcsU0FBSSxHQUE4QixFQUFFLENBQStEO1FBQ25HLFdBQU0sR0FBNEIsR0FBRyxDQUE4RDtJQXFFNUcsQ0FBQztJQWxFQyxNQUFNO1FBRUosSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO1FBSUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLG1DQUFJLEtBQUssQ0FBQztTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQTlFRCx3Q0E4RUMifQ==