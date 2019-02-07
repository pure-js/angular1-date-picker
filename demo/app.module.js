"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var layout_module_1 = require("../src/layout/layout.module");
var date_picker_module_1 = require("../src/date-picker/date-picker.module");
var select_module_1 = require("../src/select/select.module");
var click_outside_module_1 = require("../src/click-outside/click-outside.module");
exports.AppModule = angular
    .module('app.components', [
    date_picker_module_1.DataPickerModule,
    layout_module_1.LayoutModule,
    select_module_1.SelectModule,
    click_outside_module_1.ClickOutsideModule
])
    .name;
//# sourceMappingURL=app.module.js.map