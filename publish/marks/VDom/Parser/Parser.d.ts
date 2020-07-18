/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
import { HtmlScanner } from "./Scanner";
/**
 * This is a simple html parser. Will read and parse html string.
 *
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */
declare class HtmlParser {
    static defaults: any;
    scanner?: HtmlScanner;
    options: any;
    endTagRe: RegExp;
    startTagRe: RegExp;
    attrRe: RegExp;
    constructor(options: any);
    parse(html: string): void;
    parseStartTag(input: string, tagName: string, match: RegExpExecArray): void;
    parseEndTag(input: string, tagName: string): void;
    parseAttributes(tagName: string, input: string): any;
}
export { HtmlParser };
