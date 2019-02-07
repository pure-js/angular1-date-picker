"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_picker_controller_1 = require("./date-picker.controller");
exports.DatePickerComponent = {
    controller: date_picker_controller_1.DatePickerController,
    template: require('./date-picker.pug'),
    bindings: {
        specifiedDate: '=',
        open: '=',
        up: '&',
        locale: '@'
    }
};
//# sourceMappingURL=date-picker.component.js.map