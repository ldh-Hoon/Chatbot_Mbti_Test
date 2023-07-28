"use strict";
exports.id = 722;
exports.ids = [722];
exports.modules = {

/***/ 182:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ 
__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "l", ({
    enumerable: true,
    get: function() {
        return hoist;
    }
}));
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ("then" in module && typeof module.then === "function") {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === "function" && name === "default") {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
}

//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 185:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PagesRouteModule: function() {
        return PagesRouteModule;
    },
    default: function() {
        return _default;
    }
});
const _routemodule = __webpack_require__(76);
const _render = __webpack_require__(100);
class PagesRouteModule extends _routemodule.RouteModule {
    constructor(options){
        super(options);
        this.components = options.components;
    }
    handle() {
        throw new Error("Method not implemented.");
    }
    render(req, res, context) {
        return (0, _render.renderToHTMLImpl)(req, res, context.page, context.query, context.renderOpts, {
            App: this.components.App,
            Document: this.components.Document
        });
    }
}
const _default = PagesRouteModule;

//# sourceMappingURL=module.js.map

/***/ })

};
;