import * as angular from "angular";

export const DataBarsAutoFocus = ($timeout: angular.ITimeoutService) => (<angular.IDirective> {
    restrict: "A",
    link($scope, $element, $attrs) {
        $scope.$watch($attrs.dataBarsAutoFocus, (newValue, oldValue) => {
            if (!newValue) {
                return;
            }
            $timeout(() => $element[0].focus());
        });
    }
});

DataBarsAutoFocus.$inject = ["$timeout"];