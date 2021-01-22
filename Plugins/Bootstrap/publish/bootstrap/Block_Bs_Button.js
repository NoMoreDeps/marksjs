"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockBsButtonRenderer = void 0;
const marks_1 = require("@marks-js/marks");
const Helper_1 = require("@marks-js/marks/Renderer/Plugins/Helper");
const _wnd = window;
class BlockBsButtonRenderer {
    constructor() {
        this._succeeded = false;
        this.applyTo = ["BLOCK"];
        this.options = {};
        this.content = "";
        this.domContent = null;
        this.type = "";
        this.weight = 0;
        this._version = "5.0.0-beta1";
        this._serverPath = "https://cdn.jsdelivr.net/npm/bootstrap";
    }
    ;
    getMountedScript() {
        return `function _MarksMermaidMountScript${0}() {
      if (!window["bootstrap"]) {
        setTimeout(() => {
          _MarksMermaidMountScript${0}();
        }, 100);
        return;
      }
      new bootstrap.Carousel(document.querySelector('#carouselExampleControls'));
    };_MarksMermaidMountScript${0}();`;
    }
    render() {
        if (!this.document)
            this.document = this.getDocument();
        this._succeeded = false;
        const payload = JSON.parse(`{ ${this.content} }`);
        this.domContent = this.document.createElement("div");
        this.domContent.setInnerHTML(`<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div style="width:100vw;height:300px;background-color:red"></div>
      </div>
      <div class="carousel-item">
      <div style="width:100vw;height:300px;background-color:blue"></div>

      </div>
      <div class="carousel-item">
      <div style="width:100vw;height:300px;background-color:green"></div>

      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>`);
        //this.domContent.setInnerHTML(`<button type="button" class="btn btn${payload.outline ? "-outline" : ""}-${payload.type}${payload.noWrap ? " text-nowrap" : ""}">${payload.text}</button>`);
        //this.domContent = this.domContent.getChildItem(0);
        marks_1.Helper.applyStyle(this, "bs-button");
        marks_1.Helper.processRef(this);
        this.domContent.onMount(this.getMountedScript());
        return this.content;
    }
    succeeded() {
        return this._succeeded;
    }
    canProcess() {
        var _a;
        if (((_a = this.options.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "bs-button") {
            return true;
        }
        return false;
    }
    set(type, content, options) {
        this.type = type;
        this.content = content;
        this.options = options;
    }
    willInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_wnd["_MarksBS5Init"]) {
                _wnd["_MarksBS5Init"] = true;
                yield Helper_1.loadAssets([
                    `${this._serverPath}@${this._version}/dist/css/bootstrap.min.css`,
                    `${this._serverPath}@${this._version}/dist/js/bootstrap.bundle.min.js`
                ]);
            }
        });
    }
}
exports.BlockBsButtonRenderer = BlockBsButtonRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tfQnNfQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jsb2NrX0JzX0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBeUM7QUFHekMsb0VBQXFFO0FBRXJFLE1BQU0sSUFBSSxHQUFHLE1BQWEsQ0FBQztBQUUzQixNQUFhLHFCQUFxQjtJQUFsQztRQUdVLGVBQVUsR0FBc0IsS0FBSyxDQUFrRDtRQUN4RixZQUFPLEdBQXVDLENBQUMsT0FBTyxDQUFDLENBQWlDO1FBQ3hGLFlBQU8sR0FBdUMsRUFBRSxDQUF3QztRQUN4RixZQUFPLEdBQXVDLEVBQUUsQ0FBd0M7UUFDeEYsZUFBVSxHQUFvQyxJQUFJLENBQXNDO1FBQ3hGLFNBQUksR0FBMEMsRUFBRSxDQUF3QztRQUN4RixXQUFNLEdBQXdDLENBQUMsQ0FBeUM7UUFDdkYsYUFBUSxHQUFxQyxhQUFhLENBQTZCO1FBQ3ZGLGdCQUFXLEdBQWtDLHdDQUF3QyxDQUFFO0lBb0ZqRyxDQUFDO0lBOUYrRixDQUFDO0lBY3ZGLGdCQUFnQjtRQUN0QixPQUFPLG9DQUFvQyxDQUFDOzs7b0NBR1osQ0FBQzs7Ozs7Z0NBS0wsQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFZLEVBQUUsQ0FBQztRQUV4RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXNCeEIsQ0FBQyxDQUFBO1FBQ04sNExBQTRMO1FBQzVMLG9EQUFvRDtRQUVwRCxjQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNyQyxjQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVOztRQUNSLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMENBQUUsV0FBVyxRQUFPLFdBQVcsRUFBRTtZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBeUI7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUU7SUFDMUIsQ0FBQztJQUVLLFFBQVE7O1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFJLElBQUksQ0FBRztnQkFFaEMsTUFBTSxtQkFBVSxDQUFDO29CQUNmLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSw2QkFBNkI7b0JBQ2pFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxrQ0FBa0M7aUJBQ3ZFLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUEvRkQsc0RBK0ZDIn0=