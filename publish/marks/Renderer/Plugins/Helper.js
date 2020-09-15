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
exports.applyStyle = exports.processInternals = exports.processRef = exports.prepareInternals = exports.processNestedRef = exports.prepareNestedRef = exports.formatMinSpace = exports.loadAssets = exports.loadScript = exports.sanitize = exports.waitAsync = void 0;
exports.waitAsync = (delay = 0) => new Promise(r => setTimeout(() => { r(); }, delay));
function sanitize(text) {
    return text.replace(/\</g, "&lt;");
}
exports.sanitize = sanitize;
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
            ct = ct.replace(`@@${id}@@`, sanitize(r.context[id]));
            continue;
        }
        ct = ct.replace(`@@${id}@@`, `<${(_b = r.options.refElt) !== null && _b !== void 0 ? _b : "div"} data-mk-ref="true" id='${id}'></${(_c = r.options.refElt) !== null && _c !== void 0 ? _c : "div"}>`);
    }
    r.content = ct;
}
exports.prepareNestedRef = prepareNestedRef;
function processNestedRef(r) {
    const refs = r.domContent.findAll(_ => _.getAttribute("data-mk-ref") === "true");
    refs && refs.forEach(d => {
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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (r.options.theme) {
        if ((_c = (_b = (_a = r.themeStyles) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c[r.options.theme]) {
            r.domContent.classList.add(r.themeStyles[type].theme[r.options.theme]);
        }
        else if ((_f = (_e = (_d = r.themeStyles) === null || _d === void 0 ? void 0 : _d.all) === null || _e === void 0 ? void 0 : _e.theme) === null || _f === void 0 ? void 0 : _f[r.options.theme]) {
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
    if ((_h = (_g = r.themeStyles) === null || _g === void 0 ? void 0 : _g[type]) === null || _h === void 0 ? void 0 : _h.classes) {
        const classes = r.themeStyles[type].classes.split(",");
        classes.forEach(c => r.domContent.classList.add(c));
    }
    if (r.options.classes) {
        const classes = r.options.classes.split(",");
        classes.forEach(c => r.domContent.classList.add(c));
    }
}
exports.applyStyle = applyStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlbmRlcmVyL1BsdWdpbnMvSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVhLFFBQUEsU0FBUyxHQUFHLENBQUMsUUFBZ0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBRXBHLFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ25DLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUE7QUFDbkMsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7SUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFTLE9BQU87UUFDL0IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNqQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVRELGdDQVNDO0FBQUEsQ0FBQztBQUVGLFNBQXNCLFVBQVUsQ0FBQyxJQUFjOztRQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENB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