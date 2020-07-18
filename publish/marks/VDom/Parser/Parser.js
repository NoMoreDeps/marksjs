"use strict";
/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlParser = void 0;
// 4. 2 and 3 are optional
const attrRe = /([^=\s]+)(\s*=\s*(("([^"]*)")|('([^']*)')|[^>\s]+))?/gm;
const endTagRe = /^<\/([^>\s]+)[^>]*>/m;
// start tag, like <a href="link"> <img/>
// 1. must start with <tagName
// 2. optional attrbutes
// 3. /> or >
const startTagRe = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*(("[^"]*")|('[^']*')|[^>\s]+))?)*)\s*\/?\s*>/m;
const selfCloseTagRe = /\s*\/\s*>\s*$/m;
const mustImplementMethod = (name) => {
    throw new Error(`Must implement the method ${name || ''}`);
};
/**
 * This is a simple html parser. Will read and parse html string.
 *
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */
class HtmlParser {
    constructor(options) {
        options = options || {};
        if (options.scanner) {
            this.scanner = options.scanner;
            options.scanner = null;
        }
        this.options = Object.assign({}, HtmlParser.defaults, options);
    }
    parse(html) {
        let treatAsChars = false;
        let index, match, characters;
        while (html.length) {
            // comment
            if (html.substring(0, 4) === '<!--') {
                index = html.indexOf('-->');
                if (index !== -1) {
                    this.scanner.comment(html.substring(4, index));
                    html = html.substring(index + 3);
                    treatAsChars = false;
                }
                else {
                    treatAsChars = true;
                }
            }
            // end tag
            else if (html.substring(0, 2) === '</') {
                match = this.endTagRe.exec(html);
                if (match) {
                    html = RegExp.rightContext;
                    treatAsChars = false;
                    this.parseEndTag(RegExp.lastMatch, match[1]);
                }
                else {
                    treatAsChars = true;
                }
            }
            // start tag
            else if (html.charAt(0) === '<') {
                match = this.startTagRe.exec(html);
                if (match) {
                    html = RegExp.rightContext;
                    treatAsChars = false;
                    this.parseStartTag(RegExp.lastMatch, match[1], match);
                }
                else {
                    treatAsChars = true;
                }
            }
            if (treatAsChars) {
                index = html.indexOf('<');
                if (index === 0) { // First char is a < so find the next one
                    index = html.substring(1).indexOf('<');
                }
                if (index === -1) {
                    characters = html;
                    html = '';
                }
                else {
                    characters = html.substring(0, index);
                    html = html.substring(index);
                }
                if (!this.options.ignoreWhitespaceText || !/^\s*$/.test(characters)) {
                    this.scanner.characters(characters);
                }
            }
            treatAsChars = true;
            match = null;
        }
    }
    parseStartTag(input, tagName, match) {
        const isSelfColse = selfCloseTagRe.test(input);
        let attrInput = match[2];
        if (isSelfColse) {
            attrInput = attrInput.replace(/\s*\/\s*$/, '');
        }
        const attrs = this.parseAttributes(tagName, attrInput);
        this.scanner.startElement(tagName, attrs, isSelfColse, match[0]);
    }
    parseEndTag(input, tagName) {
        this.scanner.endElement(tagName);
    }
    parseAttributes(tagName, input) {
        const attrs = {};
        input.replace(this.attrRe, (attr, name, c2, value, c4, valueInQuote, c6, valueInSingleQuote) => {
            attrs[name] = valueInSingleQuote || valueInQuote || value || true;
            return "";
        });
        return attrs;
    }
}
exports.HtmlParser = HtmlParser;
HtmlParser.defaults = {
    ignoreWhitespaceText: false
};
HtmlParser.prototype.attrRe = attrRe;
HtmlParser.prototype.endTagRe = endTagRe;
HtmlParser.prototype.startTagRe = startTagRe;
HtmlParser.prototype.scanner = {
    startElement() {
        mustImplementMethod('startElement');
    },
    endElement() {
        mustImplementMethod('endElement');
    },
    characters() {
        mustImplementMethod('characters');
    },
    comment() {
        mustImplementMethod('comment');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1ZEb20vUGFyc2VyL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQVNILDBCQUEwQjtBQUMxQixNQUFNLE1BQU0sR0FBSyx3REFBd0QsQ0FBRTtBQUMzRSxNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBb0M7QUFDM0UseUNBQXlDO0FBQ3pDLDhCQUE4QjtBQUM5Qix3QkFBd0I7QUFDeEIsYUFBYTtBQUNiLE1BQU0sVUFBVSxHQUFPLGlGQUFpRixDQUFFO0FBQzFHLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFtRTtBQUUxRyxNQUFNLG1CQUFtQixHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDNUQsQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVU7SUFRZCxZQUFZLE9BQVk7UUFDdEIsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDdkIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtZQUM5QixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtTQUN2QjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBQ0QsS0FBSyxDQUFDLElBQVk7UUFDaEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xCLFVBQVU7WUFDVixJQUFJLElBQUks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