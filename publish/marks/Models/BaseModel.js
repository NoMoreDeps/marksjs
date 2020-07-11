"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
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
        this.domElement = document.createElement((_a = this.options.pElt) !== null && _a !== void 0 ? _a : "p");
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
                this.domElement = this.domElement.children.item(0);
            }
            else {
                switch ((_c = this.domElement.children.item(0)) === null || _c === void 0 ? void 0 : _c.tagName.toLowerCase()) {
                    case "br":
                    case "p":
                    case "hr":
                    case "h1":
                    case "h2":
                    case "h3":
                    case "h4":
                    case "h5":
                    case "h6":
                        this.domElement = this.domElement.children.item(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01vZGVscy9CYXNlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsTUFBYSxTQUFTO0lBU3BCLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUjVELFdBQU0sR0FBNkIsRUFBRSxDQUFJO1FBQ3pDLGdCQUFXLEdBQXdCLEVBQUUsQ0FBSTtRQUN6QyxXQUFNLEdBQTZCLEVBQUUsQ0FBSTtRQUN6QyxlQUFVLEdBQXlCLElBQUksQ0FBRTtRQUN6QyxZQUFPLEdBQTRCLEVBQUUsQ0FBSTtRQUN6QyxjQUFTLEdBQTBCLENBQUMsQ0FBSztRQUN6QyxVQUFLLEdBQThCLEtBQUssQ0FBQztJQUVzQixDQUFDO0lBRWhFLEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFRLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFPLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFLLENBQUMsQ0FBRztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQVk7O1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsT0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksbUNBQUksR0FBRyxDQUFDLENBQUM7UUFDbkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFvQixDQUFDLFNBQVMsQ0FBRSxJQUEwQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4SSxTQUFT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