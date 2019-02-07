"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clickOutsideDirective = (function () {
    function clickOutsideDirective($document) {
        this.$document = $document;
    }
    clickOutsideDirective.prototype.link = function ($scope, $element, $attrs) {
        this.$document.on('click', function (e) {
            console.log(e.target);
            if ($element[0] !== event.target) {
                console.log('target', $element.parent.className);
                $scope.$apply(function () {
                    $scope.$eval($attrs.clickOutside);
                });
                $scope.$destroy();
            }
            else {
                return false;
            }
        });
    };
    ;
    return clickOutsideDirective;
}());
exports.clickOutsideDirectiveFactory = function () {
    var directive = function ($document) { return new clickOutsideDirective($document); };
    directive.$inject = ['$document'];
    return directive;
};
//# sourceMappingURL=click-outside.directive.js.map