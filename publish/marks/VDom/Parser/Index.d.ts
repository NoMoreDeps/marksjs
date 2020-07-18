/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
import { HtmlParser as Parser } from "./Parser";
import { HtmlScanner } from "./Scanner";
declare class HtmlParser extends Parser {
    constructor(options?: any);
    parse(html: string): import("./Node").DocumentNode;
}
declare const RawHtmlParser: typeof Parser;
export { HtmlParser, HtmlScanner, RawHtmlParser };
export { Node, NODE_TYPE } from "./Node";
