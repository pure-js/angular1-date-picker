"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var layout_component_1 = require("./layout.component");
require("./layout.sass");
exports.LayoutModule = angular
    .module('layout', [])
    .component('layoutcolumn', layout_component_1.LayoutComponent)
    .name;
//# sourceMappingURL=layout.module.js.map