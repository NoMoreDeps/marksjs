"use strict";
/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawHtmlParser = exports.HtmlScanner = exports.HtmlParser = void 0;
const Parser_1 = require("./Parser");
const Scanner_1 = require("./Scanner");
Object.defineProperty(exports, "HtmlScanner", { enumerable: true, get: function () { return Scanner_1.HtmlScanner; } });
class HtmlParser extends Parser_1.HtmlParser {
    constructor(options) {
        options = options || {};
        if (!options.scanner) {
            options.scanner = new Scanner_1.HtmlScanner();
        }
        super(options);
    }
    parse(html) {
        super.parse(html);
        const tree = this.scanner.getRootNode();
        // always reset scanner after parse finish
        this.scanner.reset();
        return tree;
    }
}
exports.HtmlParser = HtmlParser;
const RawHtmlParser = Parser_1.HtmlParser;
exports.RawHtmlParser = RawHtmlParser;
var Node_1 = require("./Node");
Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return Node_1.Node; } });
Object.defineProperty(exports, "NODE_TYPE", { enumerable: true, get: function () { return Node_1.NODE_TYPE; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVkRvbS9QYXJzZXIvSW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFFSCxxQ0FBa0Q7QUFDbEQsdUNBQWtEO0FBcUI3Qiw0RkFyQloscUJBQVcsT0FxQlk7QUFuQmhDLE1BQU0sVUFBVyxTQUFRLG1CQUFNO0lBQzNCLFlBQVksT0FBYTtRQUNyQixPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNsQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFBO1NBQ3RDO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xCLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBWTtRQUNkLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN4QywwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFJUSxnQ0FBVTtBQUZuQixNQUFNLGFBQWEsR0FBRyxtQkFBTSxDQUFDO0FBRUssc0NBQWE7QUFDL0MsK0JBQXlDO0FBQWhDLDRGQUFBLElBQUksT0FBQTtBQUFFLGlHQUFBLFNBQVMsT0FBQSJ9