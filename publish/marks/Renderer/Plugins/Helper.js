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
exports.applyStyle = exports.processInternals = exports.processRef = exports.prepareInternals = exports.processNestedRef = exports.prepareNestedRef = exports.formatMinSpace = exports.loadAssets = exports.loadScript = exports.waitAsync = void 0;
exports.waitAsync = (delay = 0) => new Promise(r => setTimeout(() => { r(); }, delay));
function loadScript(url) {
    return new Promise(function (resolve) {
        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', function () {
            resolve(true);
        });
        document.head.appendChild(script);
    });
}
exports.loadScript = loadScript;
;
function loadAssets(urls) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < urls.length; i++) {
            if (urls[i].endsWith(".js")) {
                yield loadScript(urls[i]);
            }
            if (urls[i].endsWith(".css")) {
                const tagElement = document.createElement("link");
                tagElement.setAttribute("rel", "stylesheet");
                tagElement.setAttribute("href", urls[i]);
                document.head.appendChild(tagElement);
            }
        }
    });
}
exports.loadAssets = loadAssets;
function formatMinSpace(text) {
    let space = text.length;
    const txt = text.split("\n");
    txt.forEach(_ => {
        const nbSpace = _.search(/\S/);
        if (nbSpace < space)
            space = nbSpace;
    });
    if (space < 0)
        space = 0;
    return txt.map(_ => _.substring(space)).join("\n");
}
exports.formatMinSpace = formatMinSpace;
function prepareNestedRef(r) {
    var _a, _b, _c;
    const refRgx = /@@([\w\.]+)@@/g;
    let itm = null;
    //console.log("context", r.context)
    let ct = r.content;
    while ((itm = refRgx.exec(r.content)) !== null) {
        const id = itm[0].substr(2).replace("@@", "");
        //console.log(id)
        if ((_a = r === null || r === void 0 ? void 0 : r.context) === null || _a === void 0 ? void 0 : _a[id]) {
            ct = ct.replace(`@@${id}@@`, r.context[id]);
            continue;
        }
        ct = ct.replace(`@@${id}@@`, `<${(_b = r.options.refElt) !== null && _b !== void 0 ? _b : "div"} data-mk-ref="true" id='${id}'></${(_c = r.options.refElt) !== null && _c !== void 0 ? _c : "div"}>`);
    }
    r.content = ct;
}
exports.prepareNestedRef = prepareNestedRef;
function processNestedRef(r) {
    const refs = r.domContent.querySelectorAll(`[data-mk-ref="true"]`);
    refs.forEach(d => {
        if (d.id in r.globalRefs) {
            d.appendChild(r.globalRefs[d.id]);
            delete r.globalRefs[d.id];
            return;
        }
    });
}
exports.processNestedRef = processNestedRef;
function prepareInternals(r) {
    prepareNestedRef(r);
}
exports.prepareInternals = prepareInternals;
function processRef(r) {
    if (r.options.ref) {
        r.globalRefs[r.options.ref] = r.domContent;
        r.domContent = null;
    }
}
exports.processRef = processRef;
function processInternals(r, blocktype) {
    processNestedRef(r);
    applyStyle(r, blocktype);
    processRef(r);
}
exports.processInternals = processInternals;
function applyStyle(r, type) {
    var _a, _b;
    if (r.options.theme) {
        if (r.themeStyles[type].theme[r.options.theme]) {
            r.domContent.classList.add(r.themeStyles[type].theme[r.options.theme]);
        }
        else if (r.themeStyles.all.theme[r.options.theme]) {
            r.domContent.classList.add(r.themeStyles.all.theme[r.options.theme]);
        }
    }
    if (r.options.variant) {
        const variants = r.options.variant.split(",");
        variants.forEach(v => {
            var _a, _b;
            if ((_a = r.themeStyles[type]) === null || _a === void 0 ? void 0 : _a.variant[v]) {
                r.domContent.classList.add(r.themeStyles[type].variant[v]);
                return;
            }
            if ((_b = r.themeStyles.all) === null || _b === void 0 ? void 0 : _b.variant[v]) {
                r.domContent.classList.add(r.themeStyles.all.variant[v]);
                return;
            }
        });
    }
    if ((_b = (_a = r.themeStyles) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.classes) {
        const classes = r.themeStyles[type].classes.split(",");
        classes.forEach(c => r.domContent.classList.add(c));
    }
    if (r.options.classes) {
        const classes = r.options.classes.split(",");
        classes.forEach(c => r.domContent.classList.add(c));
    }
}
exports.applyStyle = applyStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVhLFFBQUEsU0FBUyxHQUFHLENBQUMsUUFBZ0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBR3BHLFNBQWdCLFVBQVUsQ0FBQyxHQUFXO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPO1FBQy9CLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFURCxnQ0FTQztBQUFBLENBQUM7QUFFRixTQUFzQixVQUFVLENBQUMsSUFBYzs7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQjtZQUVELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQztDQUFBO0FBYkQsZ0NBYUM7QUFFRCxTQUFnQixjQUFjLENBQUMsSUFBWTtJQUN6QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFN0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNkLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPLEdBQUcsS0FBSztZQUFFLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLEtBQUssR0FBRyxDQUFDO1FBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQTtJQUV4QixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFYRCx3Q0FXQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLENBQWtCOztJQUNqRCxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztJQUVoQyxJQUFJLEdBQUcsR0FBMkIsSUFBSSxDQUFDO0lBQ3ZDLG1DQUFtQztJQUNuQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUc7UUFDL0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLGlCQUFpQjtRQUNqQixVQUFJLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLDBDQUFHLEVBQUUsR0FBRztZQUNwQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QyxTQUFTO1NBQ1Y7UUFDRCxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksTUFBQSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sbUNBQUksS0FBSywyQkFBMkIsRUFBRSxPQUFPLE1BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDN0g7SUFDRCxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBaEJELDRDQWdCQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLENBQWtCO0lBQ2pELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7WUFDeEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsT0FBTztTQUNSO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBVEQsNENBU0M7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxDQUFrQjtJQUNqRCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsQ0FBa0I7SUFDM0MsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNqQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUMzQyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztLQUNyQjtBQUNILENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLENBQWtCLEVBQUUsU0FBaUI7SUFDcEUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsVUFBVSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6QixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEIsQ0FBQztBQUpELDRDQUlDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLENBQWtCLEVBQUUsSUFBWTs7SUFDekQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNuQixJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUMsQ0FBQyxDQUFDLFVBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN6RTthQUFNLElBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEQsQ0FBQyxDQUFDLFVBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdkU7S0FDRjtJQUVELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDckIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ25CLFVBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMENBQUUsT0FBTyxDQUFDLENBQUMsR0FBRztnQkFDbkMsQ0FBQyxDQUFDLFVBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELE9BQU87YUFDUjtZQUNELFVBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUc7Z0JBQ2pDLENBQUMsQ0FBQyxVQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsT0FBTzthQUNSO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELGdCQUFJLENBQUMsQ0FBQyxXQUFXLDBDQUFHLElBQUksMkNBQUcsT0FBTyxFQUFFO1FBQ2xDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQWEsQ0FBQztRQUNuRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFFRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3JCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7QUFDSCxDQUFDO0FBaENELGdDQWdDQyJ9