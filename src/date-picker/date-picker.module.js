"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var date_picker_component_1 = require("./date-picker.component");
require("./date-picker.sass");
exports.DataPickerModule = angular
    .module('datePicker', [])
    .component('datePicker', date_picker_component_1.DatePickerComponent)
    .name;
//# sourceMappingURL=date-picker.module.js.map