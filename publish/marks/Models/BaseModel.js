"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const Document_1 = require("../VDom/Html/Document");
class BaseModel {
    constructor(_RendererRepository) {
        this._RendererRepository = _RendererRepository;
        this.source = "";
        this.cleanSource = "";
        this.output = "";
        this.domElement = null;
        this.options = {};
        this.processed = 0;
        this.dirty = false;
        this.document = new Document_1.Document("Dom");
    }
    reset() {
        this.cleanSource = "";
        this.output = "";
        this.options = {};
        this.processed = 0;
        this.parse();
    }
    process(context) {
        var _a, _b, _c;
        this.domElement = this.document.createElement((_a = this.options.pElt) !== null && _a !== void 0 ? _a : "p");
        const renderers = this._RendererRepository.getByType(this.type, this.get()).sort((a, b) => b.weight - a.weight);
        renderers.forEach((_, idx) => {
            var _a, _b, _c;
            _.context = context;
            if (idx === 0) {
                this.output = _.render();
                if (_.domContent) {
                    (_a = this.domElement) === null || _a === void 0 ? void 0 : _a.appendChild(_.domContent);
                    _.domContent = null;
                }
                this.processed++;
            }
            else {
                _.set(this.type, this.output, this.options);
                if (_.canProcess()) {
                    this.output = _.render();
                    if (_.domContent) {
                        (_b = this.domElement) === null || _b === void 0 ? void 0 : _b.appendChild(_.domContent);
                        _.domContent = null;
                    }
                    this.processed++;
                }
            }
            do {
                _.set(this.type, this.output, this.options);
                if (_.succeeded()) {
                    this.output = _.render();
                    if (_.domContent) {
                        (_c = this.domElement) === null || _c === void 0 ? void 0 : _c.appendChild(_.domContent);
                        _.domContent = null;
                    }
                    this.processed++;
                }
            } while (_.succeeded());
        });
        if (this.domElement.childElementCount === 0) {
            this.domElement = null;
        }
        if (((_b = this.domElement) === null || _b === void 0 ? void 0 : _b.childElementCount) === 1) {
            if (this.options.noPElt) {
                this.domElement = this.domElement.getChildItem(0);
            }
            else {
                switch ((_c = this.domElement.getChildItem(0)) === null || _c === void 0 ? void 0 : _c.tagName.toLowerCase()) {
                    case "br":
                    case "p":
                    case "hr":
                    case "h1":
                    case "h2":
                    case "h3":
                    case "h4":
                    case "h5":
                    case "h6":
                        this.domElement = this.domElement.getChildItem(0);
                        break;
                }
            }
        }
        if (this.options["mk-show"]) {
            if (!context[this.options["mk-show"]]) {
                this.domElement = null;
            }
        }
    }
    append(value) { }
    parse() {
        this.cleanSource = this.source;
    }
    parseOptions(opts) {
        const _options = opts.split(" ").filter((_, i) => i === 0 || _.length > 0);
        if (!_options[0].includes(":")) {
            this.options.name = _options.shift();
        }
        _options.forEach(opt => {
            const elt = opt.split(":");
            this.options[elt[0]] = elt.length === 2 ? elt[1] : "true";
        });
    }
    get() {
        return {
            type: this.type,
            content: this.cleanSource,
            options: this.options
        };
    }
    clone() {
        const duplicated = new this.constructor();
        duplicated["_RendererRepository"] = this["_RendererRepository"];
        duplicated.options = this.options;
        duplicated.source = this.source;
        duplicated.cleanSource = this.cleanSource;
        duplicated.output = this.output;
        return duplicated;
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01vZGVscy9CYXNlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0Esb0RBQWlEO0FBSWpELE1BQWEsU0FBUztJQVVwQixZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVQ1RCxXQUFNLEdBQTZCLEVBQUUsQ0FBSTtRQUN6QyxnQkFBVyxHQUF3QixFQUFFLENBQUk7UUFDekMsV0FBTSxHQUE2QixFQUFFLENBQUk7UUFDekMsZUFBVSxHQUEyQixJQUFJLENBQUU7UUFDM0MsWUFBTyxHQUE0QixFQUFFLENBQUk7UUFDekMsY0FBUyxHQUEwQixDQUFDLENBQUs7UUFDekMsVUFBSyxHQUE4QixLQUFLLENBQUM7UUFDekMsYUFBUSxHQUEyQixJQUFJLG1CQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFUyxDQUFDO0lBRWhFLEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFRLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFPLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFLLENBQUMsQ0FBRztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQVk7O1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLE9BQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1DQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBb0IsQ0FBQyxTQUFTLENBQUUsSUFBMEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMs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