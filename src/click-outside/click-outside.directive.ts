import { IScope } from "angular";

class clickOutsideDirective implements angular.IDirective {
    constructor(private $document: angular.IDocumentService) {}

    restrict: "A";
    link($scope: IScope, $element, $attrs: ng.IAttributes) {
        this.$document.on("click", function (e) {
            console.log(e.target);

            if ($element[0] !== event.target) {
                console.log("target", $element.parent.className);

                $scope.$apply(function () {
                    $scope.$eval($attrs.clickOutside);
                });

                $scope.$destroy();
            } else {
                return false;
            }
        });
    };
}

export const clickOutsideDirectiveFactory = function (): ng.IDirectiveFactory {
    const directive = ($document: angular.IDocumentService) => new clickOutsideDirective($document);
    directive.$inject = ["$document"];
    return directive;
};