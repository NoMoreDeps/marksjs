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
        return this.internalRender(template, false, typeof target === "string" ? document.querySelector(target) : target);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya3NSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NYXJrc1JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHNFQUFvRTtBQUNwRSx5REFBb0U7QUFDcEUseURBQW9FO0FBQ3BFLDJEQUFvRTtBQUNwRSwyREFBb0U7QUFDcEUsMkRBQW9FO0FBQ3BFLDJEQUFvRTtBQUNwRSx5REFBb0U7QUFDcEUsMkRBQW9FO0FBQ3BFLDJEQUFvRTtBQUVwRSw2REFBb0U7QUFFcEUsc0RBQW9FO0FBRXBFLE1BQWEsYUFBYTtJQVF4Qjs7O09BR0c7SUFDSCxZQUFZLElBQTBCO1FBUC9CLGtCQUFhLEdBQWlCLEtBQUssQ0FBSztRQUN4QyxZQUFPLEdBQW1CLEVBQUUsQ0FBWTtRQU83QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzFELEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFO1FBQ3pDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFHO1FBQ3pDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFPO1FBQ3pDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFD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