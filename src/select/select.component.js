"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var select_controller_1 = require("./select.controller");
exports.SelectComponent = {
    controller: select_controller_1.SelectController,
    template: require('./select.pug'),
    bindings: {
        options: '<',
        choose: '&',
        selected: '='
    }
};
//# sourceMappingURL=select.component.js.map