"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendererRepository = void 0;
class RendererRepository {
    constructor() {
        this.refs = [];
        this.hash = {};
    }
    clear() {
        this.hash = {};
    }
    register(engine) {
        this.refs.push(engine);
        engine.applyTo.forEach(_ => {
            if (!(_ in this.hash)) {
                this.hash[_] = [];
            }
            this.hash[_].push(engine);
        });
    }
    getByType(type, source) {
        var _a, _b;
        return (_b = (_a = this.hash[type]) === null || _a === void 0 ? void 0 : _a.filter(_ => {
            _.set(type, source.content, source.options);
            return _.canProcess();
        })) !== null && _b !== void 0 ? _b : [];
    }
    clone() {
        const copy = new RendererRepository();
        this.refs.forEach(_ => copy.register(new _.constructor()));
        return copy;
    }
}
exports.RendererRepository = RendererRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXJSZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1JlbmRlcmVyL1JlbmRlcmVyUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLGtCQUFrQjtJQUEvQjtRQUNZLFNBQUksR0FBMkIsRUFBRSxDQUFDO1FBQ2xDLFNBQUksR0FBNkMsRUFBRSxDQUFBO0lBOEIvRCxDQUFDO0lBNUJDLEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQXVCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVksRUFBRSxNQUFxRDs7UUFDM0UsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMENBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLENBQUMsb0NBQUssRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELEtBQUs7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQU0sQ0FBWSxDQUFDLFdBQTZCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFoQ0QsZ0RBZ0NDIn0=