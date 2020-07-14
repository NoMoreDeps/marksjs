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
class MarksRenderer {
    /**
     * Creates a new renderer instance
     * @param repo The Renderer repository
     */
    constructor(repo) {
        this.manualTrigger = false;
        this.context = {};
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
        res["_rendererRepo"]["refs"].forEach(_ => _.cloneRenderer = this.clone.bind(this));
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
        const endTime = performance.now();
        const targetRenderer = target || document.createElement("div");
        processedElts.forEach(_ => _.domElement && targetRenderer.appendChild(_.domElement));
        //console.log(`Processed in ${endTime - startTime} ms`);
        //console.log(noEmit, this.manualTrigger)
        if (!noEmit && !this.manualTrigger) {
            this.triggerRenderFinished(targetRenderer);
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
        let doc = (_b = (_a = document.querySelector(templateId)) === null || _a === void 0 ? void 0 : _a.innerHTML) !== null && _b !== void 0 ? _b : "";
        var textDecoder = document.createElement("textarea");
        textDecoder.innerHTML = doc;
        doc = (_c = textDecoder.value) !== null && _c !== void 0 ? _c : "";
        const renderedDom = this.internalRender(doc, false);
        const targetRenderer = (_d = document.querySelector(targetSelector !== null && targetSelector !== void 0 ? targetSelector : "body")) !== null && _d !== void 0 ? _d : document.body;
        targetRenderer.appendChild(renderedDom);
    }
    /**
     * Render a Marks document to teh target or to a new Dom node
     * @param template The template to parse
     * @param target The target Dom node
     */
    render(template, target) {
        return this.internalRender(template, false, target);
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
            (_a = plugin.willInit) === null || _a === void 0 ? void 0 : _a.call(plugin);
            this._rendererRepo.register(plugin);
        });
    }
}
exports.MarksRenderer = MarksRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya3NSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NYXJrc1JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHNFQUFvRTtBQUNwRSx5REFBb0U7QUFDcEUseURBQW9FO0FBQ3BFLDJEQUFvRTtBQUNwRSwyREFBb0U7QUFDcEUsMkRBQW9FO0FBQ3BFLDJEQUFvRTtBQUNwRSx5REFBb0U7QUFDcEUsMkRBQW9FO0FBQ3BFLDJEQUFvRTtBQUVwRSw2REFBb0U7QUFFcEUsc0RBQW9FO0FBRXBFLE1BQWEsYUFBYTtJQVF4Qjs7O09BR0c7SUFDSCxZQUFZLElBQTBCO1FBUC9CLGtCQUFhLEdBQWlCLEtBQUssQ0FBSztRQUN4QyxZQUFPLEdBQW1CLEVBQUUsQ0FBWTtRQU83QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzFELEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFD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