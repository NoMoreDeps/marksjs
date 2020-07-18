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
        if (!this.document)
            this.document = this.getDocument();
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
                const l = this.document.createElement("li");
                l.setInnerHTML(_.text);
                ll.appendChild(l);
                if (_.c.length) {
                    const newLL = this.document.createElement(this.type === "LIST-U" ? "ul" : "ol");
                    l.appendChild(newLL);
                    createNode(newLL, _.c);
                }
            });
            return ll;
        };
        const rootLL = this.document.createElement(this.type === "LIST-U" ? "ul" : "ol");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZW5kZXJlci9QbHVnaW5zL0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQXVIO0FBS3ZILE1BQWEsWUFBWTtJQUF6QjtRQUdVLGVBQVUsR0FBMkIsS0FBSyxDQUFpQjtRQUM1RCxZQUFPLEdBQStCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFFO1FBQzVELFlBQU8sR0FBK0IsRUFBRSxDQUFvQjtRQUM1RCxlQUFVLEdBQThCLElBQUksQ0FBa0I7UUFDOUQsWUFBTyxHQUErQixFQUFFLENBQW9CO1FBQzVELFNBQUksR0FBa0MsRUFBRSxDQUFvQjtRQUM1RCxXQUFNLEdBQWdDLENBQUMsQ0FBcUI7SUF3R3JFLENBQUM7SUFyR0MsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVksRUFBRSxDQUFDO1FBRXhELDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFhLEtBQUssQ0FBQztRQUVsQyxxQkFBcUI7UUFFckIseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FB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