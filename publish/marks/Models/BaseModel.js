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
    process() {
        var _a, _b, _c;
        this.domElement = document.createElement((_a = this.options.pElt) !== null && _a !== void 0 ? _a : "p");
        const renderers = this._RendererRepository.getByType(this.type, this.get()).sort((a, b) => b.weight - a.weight);
        renderers.forEach((_, idx) => {
            var _a, _b, _c;
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
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01vZGVscy9CYXNlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsTUFBYSxTQUFTO0lBU3BCLFlBQW9CLG1CQUF1QztRQUF2Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBUjNELFdBQU0sR0FBNkIsRUFBRSxDQUFJO1FBQ3pDLGdCQUFXLEdBQXdCLEVBQUUsQ0FBSTtRQUN6QyxXQUFNLEdBQTZCLEVBQUUsQ0FBSTtRQUN6QyxlQUFVLEdBQXlCLElBQUksQ0FBRTtRQUN6QyxZQUFPLEdBQTRCLEVBQUUsQ0FBSTtRQUN6QyxjQUFTLEdBQTBCLENBQUMsQ0FBSztRQUN6QyxVQUFLLEdBQThCLEtBQUssQ0FBQztJQUVxQixDQUFDO0lBRS9ELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFRLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFPLEVBQUUsQ0FBRTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFLLENBQUMsQ0FBRztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsT0FBTzs7UUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLE9BQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1DQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUUsSUFBMEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkksU0FBUyxDQUFDLE9BQU8s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