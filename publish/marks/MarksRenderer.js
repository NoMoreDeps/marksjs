"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarksRenderer = void 0;
const RendererRepository_1 = require("./Renderer/RendererRepository");
const Text_1 = __importDefault(require("./Models/Text"));
const Head_1 = __importDefault(require("./Models/Head"));
const ListU_1 = __importDefault(require("./Models/ListU"));
const ListO_1 = __importDefault(require("./Models/ListO"));
const Table_1 = __importDefault(require("./Models/Table"));
const Block_1 = __importDefault(require("./Models/Block"));
const Code_1 = __importDefault(require("./Models/Code"));
const Check_1 = __importDefault(require("./Models/Check"));
const Blank_1 = __importDefault(require("./Models/Blank"));
const BlockQ_1 = __importDefault(require("./Models/BlockQ"));
const Helper_1 = require("./Renderer/Plugins/Helper");
const Document_1 = require("./VDom/Html/Document");
class MarksRenderer {
    /**
     * Creates a new renderer instance
     * @param repo The Renderer repository
     */
    constructor(repo) {
        this.manualTrigger = false;
        this.context = {};
        this.targetRender = "Dom";
        this._rendererRepo = repo !== null && repo !== void 0 ? repo : new RendererRepository_1.RendererRepository();
        this._globalRefs = {};
    }
    /**
     * Clones the current renderer but keeps all configuration
     */
    clone() {
        const res = new MarksRenderer(this._rendererRepo.clone());
        res["_themeStyles"] = this._themeStyles;
        res["_globalRefs"] = this._globalRefs;
        res["context"] = this.context;
        res["_rendererRepo"]["refs"].forEach(_ => {
            _.cloneRenderer = this.clone.bind(this);
            _.getDocument = () => new Document_1.Document(this.targetRender);
        });
        return res;
    }
    /**
     * Set the theme and styles
     * @param themeStyles
     */
    setThemeStyle(themeStyles) {
        this._themeStyles = themeStyles;
    }
    /**
     * Add more styles to the current renderer
     * @param themeStyles
     */
    addThemeStyle(themeStyles) {
        this._themeStyles = Object.assign(Object.assign({}, this._themeStyles), themeStyles);
    }
    /**
     * Used for internal render / nested renderer block
     * @param source Template to render
     * @param noEmit If true will not trigger the end rendering event
     * @param target The Dom target node
     */
    internalRender(source, noEmit = true, target) {
        var _a;
        const doc = Helper_1.formatMinSpace(source).replace(/\r\n/g, "\n");
        this._rendererRepo["refs"].forEach(_ => {
            _.globalRefs = this._globalRefs;
            _.themeStyles = this._themeStyles;
        });
        // Prepare document parsing
        let lines = (_a = doc.replace(/\\r\\n/g, "\n").split("\n")) !== null && _a !== void 0 ? _a : [];
        const an = [
            { type: "LIST-O", rgx: /^\s*([0-9]+|#{1})\.\s(.*)/, apply: ["-"] },
            { type: "HEAD", rgx: /^\s*#{1,6}(.*)/, apply: ["-"] },
            { type: "HEAD-B", rgx: /^\s*=+\s*/, apply: ["-"] },
            { type: "CHECK", rgx: /^\s*\-\s*\[[ x]\](.*)/, apply: ["-"] },
            { type: "LIST-U", rgx: /^\s*[\*-]\s+(.*)/, apply: ["-"] },
            { type: "TABLE", rgx: /^\s*\|(.*)\|\s*/, apply: ["-"] },
            { type: "BLOCK-Q", rgx: /^\s*\>(.*)/, apply: ["-"] },
            { type: "BLOCK-B", rgx: /^\s*\[.*?\]\s*\{\{\s*/, apply: ["-"], state: "BLOCK" },
            { type: "BLOCK-E", rgx: /^\s*\}\}\s*$/, apply: ["BLOCK"], state: "-" },
            { type: "CODE-B", rgx: /^[`]{3}\w*\s*/, apply: ["-"], state: "CODE" },
            { type: "CODE-E", rgx: /^[`]{3}\s*$/, apply: ["CODE"], state: "-" }
        ];
        const res = [];
        let state = "-";
        const BlockB = an.filter(_ => _.type === "BLOCK-B")[0];
        let blockLevel = 0;
        let codeLevel = 0;
        const startTime = performance.now();
        lines.forEach(_ => {
            let check = false;
            an.filter(__ => __.apply.includes(state)).forEach(__ => {
                if (!check && __.rgx.test(_)) {
                    if (__.type === "BLOCK-E") {
                        blockLevel--;
                        //console.log("END-LEVEL", blockLevel);
                        if (blockLevel > 0) {
                            return;
                        }
                    }
                    if (__.type === "BLOCK-B") {
                        blockLevel++;
                        // console.log("BEG-LEVEL", blockLevel);
                    }
                    res.push({ type: __.type, text: _ });
                    check = true;
                    if ("state" in __) {
                        state = __["state"];
                    }
                }
            });
            if (!check) {
                switch (state) {
                    case "BLOCK":
                        if (BlockB.rgx.test(_)) {
                            blockLevel++;
                            //console.log("BEG-LEVEL", blockLevel);
                        }
                        res.push({ type: "T-TEXT", text: _ });
                        break;
                    case "CODE":
                        res.push({ type: "C-TEXT", text: _ });
                        break;
                    default:
                        if (_.length === 0) {
                            res.push({ type: "BLANK", text: "" });
                        }
                        else {
                            res.push({ type: "TEXT", text: _ });
                        }
                        break;
                }
            }
        });
        res.filter(_ => _.type === "LIST-U").forEach(_ => {
            if (_.text.trim().startsWith("*") && _.text.trim().endsWith("*")) {
                _.type = "TEXT";
            }
        });
        //console.table(res);
        let currentElt = null;
        let filteredElts = [];
        const inlineModels = {
            "TEXT": Text_1.default,
            "HEAD": Head_1.default,
        };
        const multilineModels = {
            "LIST-O": ListO_1.default,
            "LIST-U": ListU_1.default,
            "BLOCK-Q": BlockQ_1.default,
            "TABLE": Table_1.default,
            "CHECK": Check_1.default,
            "BLANK": Blank_1.default,
        };
        const openCloseElts = {
            "CODE-B": Code_1.default,
            "BLOCK-B": Block_1.default,
        };
        res
            .forEach(_ => {
            switch (_.type) {
                case "TEXT":
                case "HEAD":
                    if (currentElt) {
                        filteredElts.push(currentElt);
                        currentElt = null;
                    }
                    filteredElts.push(new inlineModels[_.type](_, this._rendererRepo));
                    break;
                case "LIST-O":
                case "LIST-U":
                case "CHECK":
                case "BLOCK-Q":
                case "TABLE":
                case "BLANK":
                    if (currentElt && (currentElt === null || currentElt === void 0 ? void 0 : currentElt.type) !== _.type) {
                        filteredElts.push(currentElt);
                        currentElt = null;
                    }
                    if (currentElt) {
                        currentElt.append(_);
                        break;
                    }
                    currentElt = new multilineModels[_.type](_, this._rendererRepo);
                    break;
                case "CODE-B":
                case "BLOCK-B":
                    if (currentElt) {
                        filteredElts.push(currentElt);
                        currentElt = null;
                    }
                    currentElt = new openCloseElts[_.type](_, this._rendererRepo);
                    break;
                case "C-TEXT":
                case "T-TEXT":
                    currentElt === null || currentElt === void 0 ? void 0 : currentElt.append(_);
                    break;
                case "CODE-E":
                case "BLOCK-E":
                    currentElt && filteredElts.push(currentElt);
                    currentElt = null;
                    break;
                case "HEAD-B":
                    if (currentElt) {
                        filteredElts.push(currentElt);
                        currentElt = null;
                    }
                    if (filteredElts[filteredElts.length - 1].type === "TEXT") {
                        const elt = filteredElts.pop();
                        const headerInfo = _.text.replace(/=/g, "#");
                        filteredElts.push(new Head_1.default({
                            type: "HEAD",
                            text: `${headerInfo} ${elt === null || elt === void 0 ? void 0 : elt.source}`
                        }, this._rendererRepo));
                    }
                    else {
                        filteredElts.push(new Text_1.default(_, this._rendererRepo));
                    }
                    break;
            }
        });
        if (currentElt !== null) {
            filteredElts.push(currentElt);
        }
        currentElt = null;
        filteredElts.forEach(_ => {
            if (_.type === "TEXT") {
                const ct = _.source.trim();
                switch (ct[0]) {
                    case "_":
                        if (ct.length > 2) {
                            let applyRuler = true;
                            for (let i = 0; i < ct.length; i++) {
                                ct[i] !== ct[0] && (applyRuler = false);
                            }
                            if (applyRuler) {
                                _.type = "RULER";
                            }
                        }
                        break;
                }
            }
            if (_.type === "TEXT" && currentElt === null) {
                currentElt = _;
                return;
            }
            if (_.type === "TEXT" && currentElt) {
                currentElt.append({ text: _.source });
                _.dirty = true;
                return;
            }
            if (_.type !== "TEXT") {
                currentElt = null;
            }
        });
        filteredElts = filteredElts.filter(_ => _.dirty === false);
        /*console.table(filteredElts.map(_ => ({
          type: _.type,
          source: _.source
        })));*/
        const processedElts = [];
        filteredElts.forEach(_ => {
            if (_.options["mk-repeat"]) {
                //console.log("Trying to repeat");
                const repeatSource = this.context[_.options["mk-repeat"]];
                if (Array.isArray(repeatSource) && repeatSource.length > 0) {
                    repeatSource.forEach(rs => {
                        const childElt = _.clone();
                        childElt.process(rs);
                        processedElts.push(childElt);
                    });
                }
                return;
            }
            _.process(this.context);
            processedElts.push(_);
            //console.log(_.output);
        });
        const document = new Document_1.Document(this.targetRender);
        const endTime = performance.now();
        const targetRenderer = target || document.createElement("div");
        processedElts.forEach(_ => _.domElement && targetRenderer.appendChild(_.domElement));
        //console.log(`Processed in ${endTime - startTime} ms`);
        //console.log(noEmit, this.manualTrigger)
        if (!noEmit && !this.manualTrigger && this.targetRender === "Dom") {
            this.triggerRenderFinished(targetRenderer.dom);
        }
        return targetRenderer;
    }
    triggerRenderFinished(targetRenderer) {
        var _a;
        this._rendererRepo["refs"].forEach(_ => { var _a; return (_a = _.renderFinished) === null || _a === void 0 ? void 0 : _a.call(_, targetRenderer); });
        (_a = this.renderFinished) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /**
     * Render the markdown template
     * @param templateId Template Id
     * @param targetSelector Target dom element selector, if not specified, document.body will be used
     */
    renderFromHtmlNode(templateId, targetSelector) {
        var _a, _b, _c, _d;
        const _document = new Document_1.Document(this.targetRender);
        let doc = (_b = (_a = document.querySelector(templateId)) === null || _a === void 0 ? void 0 : _a.innerHTML) !== null && _b !== void 0 ? _b : "";
        var textDecoder = document.createElement("textarea");
        textDecoder.innerHTML = doc;
        doc = (_c = textDecoder.value) !== null && _c !== void 0 ? _c : "";
        const renderedDom = this.internalRender(doc, false);
        const targetRenderer = (_d = document.querySelector(targetSelector !== null && targetSelector !== void 0 ? targetSelector : "body")) !== null && _d !== void 0 ? _d : document.body;
        targetRenderer.appendChild(renderedDom.toDom());
    }
    renderToText(template, indentLevel = 2) {
        return this.internalRender(template, false).toHtml(indentLevel);
    }
    /**
     * Render a Marks document to teh target or to a new Dom node
     * @param template The template to parse
     * @param target The target Dom node
     */
    render(template, target) {
        const res = this.internalRender(template, false);
        if (target) {
            (typeof target === "string" ? document.querySelector(target) : target).appendChild(res.toDom());
        }
        return res.toDom();
    }
    /**
     * Register a new rendering plugin
     * @param plugin A rendering plugin to add
     */
    registerRenderers(...plugins) {
        // Used if the plugin needs to render Marks recur
        plugins.forEach(plugin => {
            var _a;
            plugin.cloneRenderer = this.clone.bind(this);
            plugin.getDocument = () => new Document_1.Document(this.targetRender);
            (_a = plugin.willInit) === null || _a === void 0 ? void 0 : _a.call(plugin);
            this._rendererRepo.register(plugin);
        });
    }
}
exports.MarksRenderer = MarksRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya3NSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NYXJrc1JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHNFQUFvRTtBQUNwRSx5REFBb0U7QUFDcEUseURBQW9FO0FBQ3BFLDJEQUFvRTtBQUNwRSwyREFBb0U7QUFDcEUsMkRBQW9FO0FBQ3BFLDJEQUFvRTtBQUNwRSx5REFBb0U7QUFDcEUsMkRBQW9FO0FBQ3BFLDJEQUFvRTtBQUVwRSw2REFBb0U7QUFFcEUsc0RBQW9FO0FBQ3BFLG1EQUFvRTtBQUlwRSxNQUFhLGFBQWE7SUFTeEI7OztPQUdHO0lBQ0gsWUFBWSxJQUEwQjtRQVIvQixrQkFBYSxHQUFpQixLQUFLLENBQVM7UUFDNUMsWUFBTyxHQUFtQixFQUFFLENBQWdCO1FBQzVDLGlCQUFZLEdBQXlCLEtBQUssQ0FBRTtRQU9qRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzFELEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFO1FBQ3pDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFHO1FBQ3pDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFPO1FBQ3pDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMs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