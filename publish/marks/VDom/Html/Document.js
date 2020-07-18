"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const HTMLElement_1 = require("./HTMLElement");
class Document {
    constructor(target) {
        this.target = target;
        this._root = new HTMLElement_1.V_HTMLElement(this, "div", target);
    }
    get root() {
        return this._root;
    }
    findFirst(predicate, deepLevel = -1) {
        return this.root.findFirst(predicate, deepLevel);
    }
    findAll(predicate, deepLevel = -1) {
        return this.root.findAll(predicate, deepLevel);
    }
    createElement(tagName, textContent) {
        return new HTMLElement_1.V_HTMLElement(this, tagName, this.target, textContent);
    }
}
exports.Document = Document;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVkRvbS9IdG1sL0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUE0QztBQUU1QyxNQUFhLFFBQVE7SUFHbkIsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDJCQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBMEMsRUFBRSxZQUFvQixDQUFDLENBQUM7UUFDMUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE9BQU8sQ0FBQyxTQUEwQyxFQUFFLFlBQW9CLENBQUMsQ0FBQztRQUN4RSxPQUFRLElBQUksQ0FBQyxJQUFzQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlLEVBQUUsV0FBb0I7UUFDakQsT0FBTyxJQUFJLDJCQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDRjtBQXRCRCw0QkFzQkMifQ==