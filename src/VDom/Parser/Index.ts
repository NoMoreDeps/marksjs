/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */

import { HtmlParser as Parser } from "./Parser"  ;
import { HtmlScanner }          from "./Scanner" ;

class HtmlParser extends Parser {
    constructor(options?: any) {
        options = options || {}
        if (!options.scanner) {
            options.scanner = new HtmlScanner()
        }
        super(options)
    }
    parse(html: string) {
        super.parse(html)
        const tree = this.scanner!.getRootNode()
        // always reset scanner after parse finish
        this.scanner!.reset()
        return tree;
    }
}

const RawHtmlParser = Parser;

export { HtmlParser, HtmlScanner, RawHtmlParser };
export { Node, NODE_TYPE } from "./Node";