"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var select_component_1 = require("./select.component");
require("./select.sass");
exports.SelectModule = angular
    .module('select', [])
    .component('customSelect', select_component_1.SelectComponent)
    .name;
//# sourceMappingURL=select.module.js.map