"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var click_outside_directive_1 = require("./click-outside.directive");
exports.ClickOutsideModule = angular
    .module('clickOutside', [])
    .directive('clickOutside', click_outside_directive_1.clickOutsideDirectiveFactory())
    .name;
//# sourceMappingURL=click-outside.module.js.map