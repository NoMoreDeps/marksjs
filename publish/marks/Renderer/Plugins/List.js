"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRenderer = void 0;
const Helper_1 = require("./Helper");
class ListRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["LIST-U", "LIST-O"];
        this.options = {};
        this.domContent = null;
        this.content = "";
        this.type = "";
        this.weight = 0;
    }
    render() {
        //console.log(this.content, this.options, this.themeStyles)
        this._succeeded = false;
        // Transform content;
        Helper_1.prepareInternals(this);
        const tab = this.content.split("\n");
        let lastIndex = -1;
        let curIndent = 0;
        const nbIndent = (text) => {
            let size = 0;
            for (let i = 0; i < text.length; i++) {
                if (text.charAt(i) !== " ") {
                    break;
                }
                size++;
            }
            return size;
        };
        let list = [];
        tab.forEach((_, idx, all) => {
            const s = nbIndent(_);
            const row = { s, text: _.trimLeft().substr(2).trimLeft(), parent: lastIndex, i: idx, c: [] };
            if (s > curIndent) {
                lastIndex = idx - 1;
                row.parent = lastIndex;
                curIndent = s;
            }
            if (s < curIndent) {
                // Have to find the correct parent
                let goodParentIdx = -1;
                let goodParent = null;
                list.forEach((p) => {
                    if (p.i < row.i && p.s < row.s) {
                        goodParentIdx = p.i;
                        goodParent = p;
                    }
                });
                lastIndex = goodParentIdx;
                row.parent = goodParentIdx;
                curIndent = s;
            }
            list.push(row);
        });
        //console.log(this.type, list);
        list = list.map(_ => {
            if (_.parent !== -1) {
                list.filter(__ => __.i === _.parent)[0].c.push(_);
            }
            return _;
        }).filter(_ => _.parent == -1);
        //console.log(this.type, list);
        const createNode = (ll, list) => {
            list.forEach(_ => {
                const l = document.createElement("li");
                l.innerHTML = _.text;
                ll.appendChild(l);
                if (_.c.length) {
                    const newLL = document.createElement(this.type === "LIST-U" ? "ul" : "ol");
                    l.appendChild(newLL);
                    createNode(newLL, _.c);
                }
            });
            return ll;
        };
        const rootLL = document.createElement(this.type === "LIST-U" ? "ul" : "ol");
        createNode(rootLL, list);
        this.domContent = rootLL;
        Helper_1.processInternals(this, "list");
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        return this.applyTo.includes(this.type);
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
}
exports.ListRenderer = ListRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXVIO0FBRXZILE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBMkIsS0FBSyxDQUFpQjtRQUM1RCxZQUFPLEdBQStCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFFO1FBQzVELFlBQU8sR0FBK0IsRUFBRSxDQUFvQjtRQUM1RCxlQUFVLEdBQTRCLElBQUksQ0FBa0I7UUFDNUQsWUFBTyxHQUErQixFQUFFLENBQW9CO1FBQzVELFNBQUksR0FBa0MsRUFBRSxDQUFvQjtRQUM1RCxXQUFNLEdBQWdDLENBQUMsQ0FBcUI7SUFxR3JFLENBQUM7SUFuR0MsTUFBTTtRQUNKLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFhLEtBQUssQ0FBQztRQUVsQyxxQkFBcUI7UUFFckIseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzFCLE1BQU07aUJBQ1A7Z0JBQ0QsSUFBSSxFQUFFLENBQUM7YUFDUjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFBO1FBRUQsSUFBSSxJQUFJLEdBQUcsRUFBVyxDQUFDO1FBRXZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLEdBQUcsR0FBRyxFQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxHQUFHLFNBQVMsRUFBRTtnQkFDakIsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUU7Z0JBQ2pCLGtDQUFrQztnQkFDbEMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzlCLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixVQUFVLEdBQUcsQ0FBQyxDQUFDO3FCQUNoQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFRCxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUMxQixHQUFHLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztnQkFDM0IsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUVqQjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFSCwrQkFBK0I7UUFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRDtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLCtCQUErQjtRQUcvQixNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQXVDLEVBQUUsSUFBVyxFQUFFLEVBQUU7WUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0UsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN6Qix5QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBUSxJQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQXlCO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFLO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFFO0lBQzFCLENBQUM7Q0FDRjtBQTlHRCxvQ0E4R0MifQ==