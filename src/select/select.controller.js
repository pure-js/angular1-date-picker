"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectController = (function () {
    function SelectController($scope) {
        this.$scope = $scope;
    }
    SelectController.prototype.$onInit = function () {
        this.open = false;
        console.log(this.selected);
    };
    SelectController.prototype.pick = function (value) {
        this.open = false;
        this.selected = value;
        this.choose({ value: this.selected });
    };
    SelectController.prototype.close = function () {
        this.open = false;
    };
    return SelectController;
}());
SelectController.$inject = ['$scope'];
exports.SelectController = SelectController;
//# sourceMappingURL=select.controller.js.map