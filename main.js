webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_select_select_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_select_select_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_select_select_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_click_outside_click_outside_module__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_click_outside_click_outside_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__src_click_outside_click_outside_module__);






const AppModule = __WEBPACK_IMPORTED_MODULE_0_angular__["module"]("app.components", [
        __WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module__["DataPickerModule"],
        __WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module__["LayoutModule"],
        __WEBPACK_IMPORTED_MODULE_3__src_select_select_module__["SelectModule"],
        __WEBPACK_IMPORTED_MODULE_4__src_click_outside_click_outside_module__["ClickOutsideModule"]
    ])
    .name;
/* harmony export (immutable) */ __webpack_exports__["a"] = AppModule;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clickOutsideDirective = (function () {
    function clickOutsideDirective($document) {
        this.$document = $document;
    }
    clickOutsideDirective.prototype.link = function ($scope, $element, $attrs) {
        this.$document.on("click", function (e) {
            console.log(e.target);
            if ($element[0] !== event.target) {
                console.log("target", $element.parent.className);
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
    directive.$inject = ["$document"];
    return directive;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var click_outside_directive_1 = __webpack_require__(3);
exports.ClickOutsideModule = angular
    .module("clickOutside", [])
    .directive("clickOutside", click_outside_directive_1.clickOutsideDirectiveFactory())
    .name;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var date_picker_controller_1 = __webpack_require__(6);
exports.DatePickerComponent = {
    controller: date_picker_controller_1.DatePickerController,
    template: __webpack_require__(17),
    bindings: {
        specifiedDate: "=",
        open: "=",
        up: "&",
        locale: "@"
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DatePickerController = (function () {
    function DatePickerController($scope, timeout) {
        this.$scope = $scope;
        this.timeout = timeout;
    }
    DatePickerController.prototype.$onInit = function () {
        this.locale = 'en-us';
        this.weekDays = this.getWeekDays();
        this.months = this.getMonths();
        this.setPickedDate(this.specifiedDate ? this.specifiedDate : new Date());
    };
    DatePickerController.prototype.getWeekDays = function () {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    };
    DatePickerController.prototype.getMonths = function () {
        var date = new Date();
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    };
    DatePickerController.prototype.setPickedDate = function (date) {
        this.pickedDate = new Date(date);
        this.selectedDay = this.pickedDate.getDate();
        this.selectedMonth = this.getCurrentMonth(this.pickedDate);
        console.log('here month', this.selectedMonth);
        this.selectedYear = this.pickedDate.getFullYear().toString();
        this.days = this.getDaysInMonth(this.pickedDate);
        this.years = this.yearsList();
        this.cellsBefore = this.getCellsBefore(this.pickedDate);
        this.cellsAfter = this.getCellsAfter(this.pickedDate);
    };
    DatePickerController.prototype.getCurrentMonth = function (date) {
        return date.toLocaleString(this.locale, { month: 'short' });
    };
    DatePickerController.prototype.getCellsBefore = function (date) {
        var cells = [];
        var firstDay = new Date(date);
        firstDay.setDate(1);
        var weekDay = firstDay.getDay();
        for (var i = 0; i < weekDay; i++) {
            cells.push(i);
        }
        return cells;
    };
    DatePickerController.prototype.getCellsAfter = function (date) {
        var cells = [];
        var added = this.getCellsBefore(this.pickedDate).length;
        var month = date.getMonth();
        var year = date.getFullYear();
        var newDate = new Date(year, month + 1, 0);
        var d = newDate.getDate();
        var common = added + d;
        var emptyCells = 7 - (common % 7);
        if (emptyCells < 7) {
            for (var i = 0; i < emptyCells; i++) {
                cells.push(i);
            }
        }
        return cells;
    };
    DatePickerController.prototype.getDaysInMonth = function (date) {
        var month = date.getMonth(), year = date.getFullYear();
        var newDate = new Date(year, month, 1);
        var days = [];
        while (newDate.getMonth() === month) {
            days.push(newDate.getDate());
            newDate.setDate(newDate.getDate() + 1);
        }
        return days;
    };
    DatePickerController.prototype.upDays = function () {
        var _this = this;
        this.timeout(function () {
            _this.days = _this.getDaysInMonth(_this.pickedDate);
            _this.cellsBefore = _this.getCellsBefore(_this.pickedDate);
            _this.cellsAfter = _this.getCellsAfter(_this.pickedDate);
        }, 50);
    };
    DatePickerController.prototype.yearsList = function () {
        var years = [];
        var currentYear = new Date().getFullYear();
        var endCalculationYear = currentYear + 100;
        for (var year = currentYear; year <= endCalculationYear; year++) {
            years.push(year.toString());
        }
        return years;
    };
    DatePickerController.prototype.setMonth = function (month) {
        this.pickedDate.setMonth(month);
        this.selectedMonth = this.getCurrentMonth(this.pickedDate);
        this.upDays();
    };
    DatePickerController.prototype.prevMonth = function () {
        var month = this.pickedDate.getMonth() - 1;
        this.setMonth(month);
    };
    DatePickerController.prototype.nextMonth = function () {
        var month = this.pickedDate.getMonth() + 1;
        this.setMonth(month);
    };
    DatePickerController.prototype.pick = function (day) {
        this.open = false;
        this.pickedDate.setDate(day);
        this.selectedDay = this.pickedDate.getDate();
        this.specifiedDate.setFullYear(this.pickedDate.getFullYear());
        this.specifiedDate.setMonth(this.pickedDate.getMonth());
        this.specifiedDate.setDate(this.pickedDate.getDate());
        this.up({ pickedDate: this.specifiedDate });
    };
    DatePickerController.prototype.close = function () {
        this.open = false;
    };
    DatePickerController.prototype.isCurrentDay = function (day) {
        var currentDate = new Date();
        return (day === currentDate.getDate() &&
            this.pickedDate.getMonth() === currentDate.getMonth() &&
            this.pickedDate.getFullYear() === currentDate.getFullYear());
    };
    DatePickerController.prototype.isSelectedDay = function (day) {
        return (day === this.selectedDay &&
            this.pickedDate.getMonth() === this.specifiedDate.getMonth() &&
            this.pickedDate.getFullYear() === this.specifiedDate.getFullYear());
    };
    DatePickerController.prototype.selectYear = function (value) {
        this.pickedDate.setFullYear(parseInt(value));
        this.upDays();
    };
    DatePickerController.prototype.selectMonth = function (value) {
        var month = this.months.indexOf(value);
        this.setMonth(month);
    };
    return DatePickerController;
}());
DatePickerController.$inject = ['$scope', '$timeout'];
exports.DatePickerController = DatePickerController;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var date_picker_component_1 = __webpack_require__(5);
__webpack_require__(14);
exports.DataPickerModule = angular
    .module("datePicker", [])
    .component("datePicker", date_picker_component_1.DatePickerComponent)
    .name;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var layout_controller_1 = __webpack_require__(9);
exports.LayoutComponent = {
    transclude: true,
    controller: layout_controller_1.LayoutController,
    template: __webpack_require__(18)
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LayoutController = (function () {
    function LayoutController() {
    }
    return LayoutController;
}());
exports.LayoutController = LayoutController;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var layout_component_1 = __webpack_require__(8);
__webpack_require__(15);
exports.LayoutModule = angular
    .module("layout", [])
    .component("layoutcolumn", layout_component_1.LayoutComponent)
    .name;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var select_controller_1 = __webpack_require__(12);
exports.SelectComponent = {
    controller: select_controller_1.SelectController,
    template: __webpack_require__(19),
    bindings: {
        options: "<",
        choose: "&",
        selected: "="
    }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
SelectController.$inject = ["$scope"];
exports.SelectController = SelectController;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var select_component_1 = __webpack_require__(11);
__webpack_require__(16);
exports.SelectModule = angular
    .module("select", [])
    .component("customSelect", select_component_1.SelectComponent)
    .name;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=\"date-picker\" ng-if=\"$ctrl.open\"><div class=\"layout-container\"><div class=\"layout-column\" style=\"flex-basis: 37px;\"><button class=\"date-picker__prev\" type=\"button\" title=\"Previous month\"><icon icon=\"left\" ng-click=\"$ctrl.prevMonth()\"></icon></button></div><div class=\"layout-column\" style=\"flex-basis: 72px;\"><custom-select class=\"date-picker-select-container\" options=\"$ctrl.months\" selected=\"$ctrl.selectedMonth\" choose=\"$ctrl.selectMonth(value)\"></custom-select></div><div class=\"layout-column\" style=\"flex-basis: 72px;\"><custom-select class=\"date-picker-select-container\" options=\"$ctrl.years\" selected=\"$ctrl.selectedYear\" choose=\"$ctrl.selectYear(value)\"></custom-select></div><div class=\"layout-column\" style=\"flex-basis: 37px;\"><button class=\"date-picker__next\" type=\"button\" title=\"Next month\"><icon icon=\"right\" ng-click=\"$ctrl.nextMonth()\"></icon></button></div></div><div class=\"layout-container\"><div class=\"calendar\"><div class=\"calendar__weekday\" ng-repeat=\"$day in $ctrl.weekDays\">{{$day}}</div><div class=\"calendar__cell calendar__cell_empty\" ng-repeat=\"$cell in $ctrl.cellsBefore\"></div><button class=\"calendar__cell calendar__day\" type=\"button\" ng-repeat=\"$day in $ctrl.days\" ng-click=\"$ctrl.pick($day)\" ng-class=\"{'calendar__day_active': $ctrl.isSelectedDay($day), 'calendar__day_marked': $ctrl.isCurrentDay($day)}\">{{$day}}</button><div class=\"calendar__cell calendar__cell_empty\" ng-repeat=\"$cell in $ctrl.cellsAfter\"></div></div></div></div><div class=\"date-picker-overlay\" ng-if=\"$ctrl.open\" ng-click=\"$ctrl.close()\"></div>"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-column\" ng-transclude=\"ng-transclude\"></div>"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<div class=\"custom-select\"><button class=\"custom-select__option custom-select__option_present\" type=\"button\" ng-click=\"$ctrl.open = true\">{{$ctrl.selected}}</button><coral-icon class=\"custom-select__icon\" icon=\"down\" ng-click=\"$ctrl.open = true\"></coral-icon><div class=\"custom-select-options-list\" ng-if=\"$ctrl.open\"><button class=\"custom-select__option\" type=\"button\" ng-repeat=\"$option in $ctrl.options\" ng-class=\"{'custom-select__option_current': $option == $ctrl.selected}\" ng-click=\"$ctrl.pick($option)\" value=\"{{$option}}\">{{$option}}</button></div><div class=\"custom-select-overlay\" ng-if=\"$ctrl.open\" ng-click=\"$ctrl.open = false\"></div></div>"

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_sass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__styles_sass__);




__WEBPACK_IMPORTED_MODULE_0_angular__["module"]('datePickerDemo', [
    __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]
]);


/***/ })
],[20]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZW1vL3N0eWxlcy5zYXNzIiwid2VicGFjazovLy8uL2RlbW8vYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9sYXlvdXQuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvbGF5b3V0LmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9sYXlvdXQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0L3NlbGVjdC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuc2FzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L2xheW91dC5zYXNzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Qvc2VsZWN0LnNhc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnB1ZyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L2xheW91dC5wdWciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC9zZWxlY3QucHVnIiwid2VicGFjazov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QUMsY0FBYyxFQUFFLGtDQUFlLENBQUM7S0FDMUMsSUFBSSxDQUFDOzs7Ozs7O0FDUFIseUM7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSx5Qzs7Ozs7O0FDQUEsd0pBQXdKLCtNQUErTSxtT0FBbU8sZ09BQWdPLDRSQUE0UixNQUFNLGtQQUFrUCxvR0FBb0csS0FBSyxNQUFNLHNOOzs7Ozs7QUNBNzZDLHNGOzs7Ozs7QUNBQSxzS0FBc0ssZ0JBQWdCLHVSQUF1UiwyREFBMkQsOENBQThDLFNBQVMsS0FBSyxTQUFTLHNIOzs7Ozs7Ozs7Ozs7O0FDQTdrQjtBQUNvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kZW1vL3N0eWxlcy5zYXNzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IExheW91dE1vZHVsZSB9IGZyb20gXCIuLi9zcmMvbGF5b3V0L2xheW91dC5tb2R1bGVcIjtcbmltcG9ydCB7IERhdGFQaWNrZXJNb2R1bGUgfSBmcm9tIFwiLi4vc3JjL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLm1vZHVsZVwiO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSBcIi4uL3NyYy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ2xpY2tPdXRzaWRlTW9kdWxlIH0gZnJvbSBcIi4uL3NyYy9jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUubW9kdWxlXCI7XG5cbmV4cG9ydCBjb25zdCBBcHBNb2R1bGUgPSBhbmd1bGFyXG4gICAgLm1vZHVsZShcImFwcC5jb21wb25lbnRzXCIsIFtcbiAgICAgICAgRGF0YVBpY2tlck1vZHVsZSxcbiAgICAgICAgTGF5b3V0TW9kdWxlLFxuICAgICAgICBTZWxlY3RNb2R1bGUsXG4gICAgICAgIENsaWNrT3V0c2lkZU1vZHVsZVxuICAgIF0pXG4gICAgLm5hbWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlbW8vYXBwLm1vZHVsZS50c1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBJU2NvcGUgfSBmcm9tIFwiYW5ndWxhclwiO1xuXG5jbGFzcyBjbGlja091dHNpZGVEaXJlY3RpdmUgaW1wbGVtZW50cyBhbmd1bGFyLklEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGRvY3VtZW50OiBhbmd1bGFyLklEb2N1bWVudFNlcnZpY2UpIHt9XG5cbiAgICByZXN0cmljdDogXCJBXCI7XG4gICAgbGluaygkc2NvcGU6IElTY29wZSwgJGVsZW1lbnQsICRhdHRyczogbmcuSUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdGhpcy4kZG9jdW1lbnQub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuXG4gICAgICAgICAgICBpZiAoJGVsZW1lbnRbMF0gIT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFyZ2V0XCIsICRlbGVtZW50LnBhcmVudC5jbGFzc05hbWUpO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kZXZhbCgkYXR0cnMuY2xpY2tPdXRzaWRlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGlja091dHNpZGVEaXJlY3RpdmVGYWN0b3J5ID0gZnVuY3Rpb24gKCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcbiAgICBjb25zdCBkaXJlY3RpdmUgPSAoJGRvY3VtZW50OiBhbmd1bGFyLklEb2N1bWVudFNlcnZpY2UpID0+IG5ldyBjbGlja091dHNpZGVEaXJlY3RpdmUoJGRvY3VtZW50KTtcbiAgICBkaXJlY3RpdmUuJGluamVjdCA9IFtcIiRkb2N1bWVudFwiXTtcbiAgICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL2NsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUudHMiLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBjbGlja091dHNpZGVEaXJlY3RpdmVGYWN0b3J5IH0gZnJvbSBcIi4vY2xpY2stb3V0c2lkZS5kaXJlY3RpdmVcIjtcblxuZXhwb3J0IGNvbnN0IENsaWNrT3V0c2lkZU1vZHVsZSA9IGFuZ3VsYXJcbiAgLm1vZHVsZShcImNsaWNrT3V0c2lkZVwiLCBbXSlcbiAgLmRpcmVjdGl2ZShcImNsaWNrT3V0c2lkZVwiLCBjbGlja091dHNpZGVEaXJlY3RpdmVGYWN0b3J5KCkpXG4gIC5uYW1lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUubW9kdWxlLnRzIiwiaW1wb3J0IHsgRGF0ZVBpY2tlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9kYXRlLXBpY2tlci5jb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRGF0ZVBpY2tlckNvbXBvbmVudDogYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgIGNvbnRyb2xsZXI6IERhdGVQaWNrZXJDb250cm9sbGVyLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2RhdGUtcGlja2VyLnB1Z1wiKSxcclxuICAgIGJpbmRpbmdzOiB7XHJcbiAgICAgICAgc3BlY2lmaWVkRGF0ZTogXCI9XCIsXHJcbiAgICAgICAgb3BlbjogXCI9XCIsXHJcbiAgICAgICAgdXA6IFwiJlwiLFxyXG4gICAgICAgIGxvY2FsZTogXCJAXCJcclxuICAgIH1cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQudHMiLCJcclxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnXTtcclxuICAgIC8vIElucHV0XHJcbiAgICBwdWJsaWMgc3BlY2lmaWVkRGF0ZTogRGF0ZTtcclxuICAgIHB1YmxpYyBvcGVuOiBib29sZWFuO1xyXG4gICAgcHVibGljIHVwOiBhbnk7XHJcbiAgICBwdWJsaWMgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gICAgLy8gRGF5IHNlbGVjdGVkIGJ5IHVzZXJcclxuICAgIHB1YmxpYyBzZWxlY3RlZERheTogbnVtYmVyO1xyXG4gICAgLy8gTW9udGggc2VsZWN0ZWQgYnkgdXNlclxyXG4gICAgcHVibGljIHNlbGVjdGVkTW9udGg6IHN0cmluZztcclxuICAgIC8vIFllYXIgc2VsZWN0ZWQgYnkgdXNlclxyXG4gICAgcHVibGljIHNlbGVjdGVkWWVhcjogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBwaWNrZWREYXRlOiBEYXRlO1xyXG4gICAgcHVibGljIGRheXM6IERhdGVbXTtcclxuICAgIHB1YmxpYyB5ZWFyczogc3RyaW5nW107XHJcbiAgICBwdWJsaWMgY2VsbHNCZWZvcmU6IG51bWJlcltdO1xyXG4gICAgcHVibGljIGNlbGxzQWZ0ZXI6IG51bWJlcltdO1xyXG4gICAgcHVibGljIHdlZWtEYXlzOiBzdHJpbmdbXTtcclxuICAgIHB1YmxpYyBtb250aHM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgcHJpdmF0ZSB0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmxvY2FsZSA9ICdlbi11cyc7XHJcbiAgICAgICAgdGhpcy53ZWVrRGF5cyA9IHRoaXMuZ2V0V2Vla0RheXMoKTtcclxuICAgICAgICB0aGlzLm1vbnRocyA9IHRoaXMuZ2V0TW9udGhzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQaWNrZWREYXRlKHRoaXMuc3BlY2lmaWVkRGF0ZSA/IHRoaXMuc3BlY2lmaWVkRGF0ZSA6IG5ldyBEYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0V2Vla0RheXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1vbnRocygpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9ICBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQaWNrZWREYXRlKGRhdGU6IERhdGUpIHtcclxuICAgICAgICB0aGlzLnBpY2tlZERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF5ID0gdGhpcy5waWNrZWREYXRlLmdldERhdGUoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLmdldEN1cnJlbnRNb250aCh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlIG1vbnRoJywgdGhpcy5zZWxlY3RlZE1vbnRoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkWWVhciA9IHRoaXMucGlja2VkRGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5kYXlzID0gdGhpcy5nZXREYXlzSW5Nb250aCh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgIHRoaXMueWVhcnMgPSB0aGlzLnllYXJzTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuY2VsbHNCZWZvcmUgPSB0aGlzLmdldENlbGxzQmVmb3JlKHRoaXMucGlja2VkRGF0ZSk7XHJcbiAgICAgICAgdGhpcy5jZWxsc0FmdGVyID0gdGhpcy5nZXRDZWxsc0FmdGVyKHRoaXMucGlja2VkRGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRNb250aChkYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVTdHJpbmcodGhpcy5sb2NhbGUsIHsgbW9udGg6ICdzaG9ydCcgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDZWxsc0JlZm9yZShkYXRlKSB7XHJcbiAgICAgICAgbGV0IGNlbGxzID0gW107XHJcbiAgICAgICAgbGV0IGZpcnN0RGF5ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgZmlyc3REYXkuc2V0RGF0ZSgxKTtcclxuICAgICAgICBsZXQgd2Vla0RheSA9IGZpcnN0RGF5LmdldERheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3ZWVrRGF5OyBpKyspIHtcclxuICAgICAgICAgICAgY2VsbHMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2VsbHNBZnRlcihkYXRlKSB7XHJcbiAgICAgICAgbGV0IGNlbGxzID0gW107XHJcbiAgICAgICAgbGV0IGFkZGVkOiBhbnkgPSB0aGlzLmdldENlbGxzQmVmb3JlKHRoaXMucGlja2VkRGF0ZSkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBsZXQgbmV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCk7XHJcbiAgICAgICAgbGV0IGQ6IGFueSA9IG5ld0RhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGxldCBjb21tb24gPSBhZGRlZCArIGQ7XHJcbiAgICAgICAgbGV0IGVtcHR5Q2VsbHMgPSA3IC0gKGNvbW1vbiAlIDcpO1xyXG4gICAgICAgIGlmIChlbXB0eUNlbGxzIDwgNykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVtcHR5Q2VsbHM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2VsbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXlzSW5Nb250aChkYXRlKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBuZXdEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xyXG4gICAgICAgIGxldCBkYXlzID0gW107XHJcbiAgICAgICAgd2hpbGUgKG5ld0RhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGgpIHtcclxuICAgICAgICAgICAgZGF5cy5wdXNoKG5ld0RhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgbmV3RGF0ZS5zZXREYXRlKG5ld0RhdGUuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cERheXMoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kYXlzID0gdGhpcy5nZXREYXlzSW5Nb250aCh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzQmVmb3JlID0gdGhpcy5nZXRDZWxsc0JlZm9yZSh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzQWZ0ZXIgPSB0aGlzLmdldENlbGxzQWZ0ZXIodGhpcy5waWNrZWREYXRlKTtcclxuICAgICAgICB9LCA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHllYXJzTGlzdCgpIHtcclxuICAgICAgICBsZXQgeWVhcnMgPSBbXTtcclxuICAgICAgICBsZXQgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgbGV0IGVuZENhbGN1bGF0aW9uWWVhciA9IGN1cnJlbnRZZWFyICsgMTAwO1xyXG4gICAgICAgIGZvcihsZXQgeWVhciA9IGN1cnJlbnRZZWFyOyB5ZWFyIDw9IGVuZENhbGN1bGF0aW9uWWVhcjsgeWVhcisrKSB7XHJcbiAgICAgICAgICAgIHllYXJzLnB1c2goeWVhci50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHllYXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNb250aChtb250aCkge1xyXG4gICAgICAgIHRoaXMucGlja2VkRGF0ZS5zZXRNb250aChtb250aCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gdGhpcy5nZXRDdXJyZW50TW9udGgodGhpcy5waWNrZWREYXRlKTtcclxuICAgICAgICB0aGlzLnVwRGF5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmV2TW9udGgoKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkgLSAxO1xyXG4gICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwaWNrKGRheSkge1xyXG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGlja2VkRGF0ZS5zZXREYXRlKGRheSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERheSA9IHRoaXMucGlja2VkRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zcGVjaWZpZWREYXRlLnNldEZ1bGxZZWFyKHRoaXMucGlja2VkRGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICB0aGlzLnNwZWNpZmllZERhdGUuc2V0TW9udGgodGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkpO1xyXG4gICAgICAgIHRoaXMuc3BlY2lmaWVkRGF0ZS5zZXREYXRlKHRoaXMucGlja2VkRGF0ZS5nZXREYXRlKCkpO1xyXG5cclxuICAgICAgICB0aGlzLnVwKHtwaWNrZWREYXRlOiB0aGlzLnNwZWNpZmllZERhdGV9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ3VycmVudERheShkYXkpIHtcclxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiAoZGF5ID09PSBjdXJyZW50RGF0ZS5nZXREYXRlKCkgJiZcclxuICAgICAgICAgICAgdGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkgPT09IGN1cnJlbnREYXRlLmdldE1vbnRoKCkgJiZcclxuICAgICAgICAgICAgdGhpcy5waWNrZWREYXRlLmdldEZ1bGxZZWFyKCkgPT09IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1NlbGVjdGVkRGF5KGRheSkge1xyXG4gICAgICAgIHJldHVybiAoZGF5ID09PSB0aGlzLnNlbGVjdGVkRGF5ICYmXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VkRGF0ZS5nZXRNb250aCgpID09PSB0aGlzLnNwZWNpZmllZERhdGUuZ2V0TW9udGgoKSAmJlxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlZERhdGUuZ2V0RnVsbFllYXIoKSA9PT0gdGhpcy5zcGVjaWZpZWREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RZZWFyKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnBpY2tlZERhdGUuc2V0RnVsbFllYXIocGFyc2VJbnQodmFsdWUpKTtcclxuICAgICAgICB0aGlzLnVwRGF5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RNb250aCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5tb250aHMuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNb250aChtb250aCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb250cm9sbGVyLnRzIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSBcIi4vZGF0ZS1waWNrZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCAgXCIuL2RhdGUtcGlja2VyLnNhc3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBEYXRhUGlja2VyTW9kdWxlID0gYW5ndWxhclxyXG4gIC5tb2R1bGUoXCJkYXRlUGlja2VyXCIsIFtdKVxyXG4gIC5jb21wb25lbnQoXCJkYXRlUGlja2VyXCIsIERhdGVQaWNrZXJDb21wb25lbnQpXHJcbiAgLm5hbWU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIubW9kdWxlLnRzIiwiaW1wb3J0IHsgTGF5b3V0Q29udHJvbGxlciB9IGZyb20gXCIuL2xheW91dC5jb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjb25zdCBMYXlvdXRDb21wb25lbnQ6IGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMgPSB7XG4gIHRyYW5zY2x1ZGU6IHRydWUsXG4gIGNvbnRyb2xsZXI6IExheW91dENvbnRyb2xsZXIsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9sYXlvdXQucHVnXCIpXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvbGF5b3V0L2xheW91dC5jb21wb25lbnQudHMiLCJleHBvcnQgY2xhc3MgTGF5b3V0Q29udHJvbGxlciB7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvbGF5b3V0L2xheW91dC5jb250cm9sbGVyLnRzIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xuaW1wb3J0IHsgTGF5b3V0Q29tcG9uZW50IH0gZnJvbSBcIi4vbGF5b3V0LmNvbXBvbmVudFwiO1xuaW1wb3J0ICBcIi4vbGF5b3V0LnNhc3NcIjtcblxuZXhwb3J0IGNvbnN0IExheW91dE1vZHVsZSA9IGFuZ3VsYXJcbiAgLm1vZHVsZShcImxheW91dFwiLCBbXSlcbiAgLmNvbXBvbmVudChcImxheW91dGNvbHVtblwiLCBMYXlvdXRDb21wb25lbnQpXG4gIC5uYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiLCJpbXBvcnQgeyBTZWxlY3RDb250cm9sbGVyIH0gZnJvbSBcIi4vc2VsZWN0LmNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdENvbXBvbmVudDogYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyA9IHtcbiAgICBjb250cm9sbGVyOiBTZWxlY3RDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9zZWxlY3QucHVnXCIpLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIG9wdGlvbnM6IFwiPFwiLFxuICAgICAgICBjaG9vc2U6IFwiJlwiLFxuICAgICAgICBzZWxlY3RlZDogXCI9XCJcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIlxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbXCIkc2NvcGVcIl07XG4gICAgLy8gSW5wdXRcbiAgICBwdWJsaWMgb3B0aW9uczogYW55W107XG4gICAgcHVibGljIGNob29zZTogYW55O1xuICAgIHB1YmxpYyBzZWxlY3RlZDogc3RyaW5nO1xuXG4gICAgcHVibGljIG9wZW46IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyAkb25Jbml0KCkge1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBpY2sodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNob29zZSh7dmFsdWU6IHRoaXMuc2VsZWN0ZWR9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvc2VsZWN0L3NlbGVjdC5jb250cm9sbGVyLnRzIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4vc2VsZWN0LmNvbXBvbmVudFwiO1xuaW1wb3J0ICBcIi4vc2VsZWN0LnNhc3NcIjtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdE1vZHVsZSA9IGFuZ3VsYXJcbiAgLm1vZHVsZShcInNlbGVjdFwiLCBbXSlcbiAgLmNvbXBvbmVudChcImN1c3RvbVNlbGVjdFwiLCBTZWxlY3RDb21wb25lbnQpXG4gIC5uYW1lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuc2Fzc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9sYXlvdXQvbGF5b3V0LnNhc3Ncbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2VsZWN0L3NlbGVjdC5zYXNzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiZGF0ZS1waWNrZXJcXFwiIG5nLWlmPVxcXCIkY3RybC5vcGVuXFxcIj48ZGl2IGNsYXNzPVxcXCJsYXlvdXQtY29udGFpbmVyXFxcIj48ZGl2IGNsYXNzPVxcXCJsYXlvdXQtY29sdW1uXFxcIiBzdHlsZT1cXFwiZmxleC1iYXNpczogMzdweDtcXFwiPjxidXR0b24gY2xhc3M9XFxcImRhdGUtcGlja2VyX19wcmV2XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHRpdGxlPVxcXCJQcmV2aW91cyBtb250aFxcXCI+PGljb24gaWNvbj1cXFwibGVmdFxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnByZXZNb250aCgpXFxcIj48L2ljb24+PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cXFwibGF5b3V0LWNvbHVtblxcXCIgc3R5bGU9XFxcImZsZXgtYmFzaXM6IDcycHg7XFxcIj48Y3VzdG9tLXNlbGVjdCBjbGFzcz1cXFwiZGF0ZS1waWNrZXItc2VsZWN0LWNvbnRhaW5lclxcXCIgb3B0aW9ucz1cXFwiJGN0cmwubW9udGhzXFxcIiBzZWxlY3RlZD1cXFwiJGN0cmwuc2VsZWN0ZWRNb250aFxcXCIgY2hvb3NlPVxcXCIkY3RybC5zZWxlY3RNb250aCh2YWx1ZSlcXFwiPjwvY3VzdG9tLXNlbGVjdD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJsYXlvdXQtY29sdW1uXFxcIiBzdHlsZT1cXFwiZmxleC1iYXNpczogNzJweDtcXFwiPjxjdXN0b20tc2VsZWN0IGNsYXNzPVxcXCJkYXRlLXBpY2tlci1zZWxlY3QtY29udGFpbmVyXFxcIiBvcHRpb25zPVxcXCIkY3RybC55ZWFyc1xcXCIgc2VsZWN0ZWQ9XFxcIiRjdHJsLnNlbGVjdGVkWWVhclxcXCIgY2hvb3NlPVxcXCIkY3RybC5zZWxlY3RZZWFyKHZhbHVlKVxcXCI+PC9jdXN0b20tc2VsZWN0PjwvZGl2PjxkaXYgY2xhc3M9XFxcImxheW91dC1jb2x1bW5cXFwiIHN0eWxlPVxcXCJmbGV4LWJhc2lzOiAzN3B4O1xcXCI+PGJ1dHRvbiBjbGFzcz1cXFwiZGF0ZS1waWNrZXJfX25leHRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdGl0bGU9XFxcIk5leHQgbW9udGhcXFwiPjxpY29uIGljb249XFxcInJpZ2h0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwubmV4dE1vbnRoKClcXFwiPjwvaWNvbj48L2J1dHRvbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJsYXlvdXQtY29udGFpbmVyXFxcIj48ZGl2IGNsYXNzPVxcXCJjYWxlbmRhclxcXCI+PGRpdiBjbGFzcz1cXFwiY2FsZW5kYXJfX3dlZWtkYXlcXFwiIG5nLXJlcGVhdD1cXFwiJGRheSBpbiAkY3RybC53ZWVrRGF5c1xcXCI+e3skZGF5fX08L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9fY2VsbCBjYWxlbmRhcl9fY2VsbF9lbXB0eVxcXCIgbmctcmVwZWF0PVxcXCIkY2VsbCBpbiAkY3RybC5jZWxsc0JlZm9yZVxcXCI+PC9kaXY+PGJ1dHRvbiBjbGFzcz1cXFwiY2FsZW5kYXJfX2NlbGwgY2FsZW5kYXJfX2RheVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1yZXBlYXQ9XFxcIiRkYXkgaW4gJGN0cmwuZGF5c1xcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnBpY2soJGRheSlcXFwiIG5nLWNsYXNzPVxcXCJ7J2NhbGVuZGFyX19kYXlfYWN0aXZlJzogJGN0cmwuaXNTZWxlY3RlZERheSgkZGF5KSwgJ2NhbGVuZGFyX19kYXlfbWFya2VkJzogJGN0cmwuaXNDdXJyZW50RGF5KCRkYXkpfVxcXCI+e3skZGF5fX08L2J1dHRvbj48ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9fY2VsbCBjYWxlbmRhcl9fY2VsbF9lbXB0eVxcXCIgbmctcmVwZWF0PVxcXCIkY2VsbCBpbiAkY3RybC5jZWxsc0FmdGVyXFxcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJkYXRlLXBpY2tlci1vdmVybGF5XFxcIiBuZy1pZj1cXFwiJGN0cmwub3BlblxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIucHVnXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibGF5b3V0LWNvbHVtblxcXCIgbmctdHJhbnNjbHVkZT1cXFwibmctdHJhbnNjbHVkZVxcXCI+PC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9sYXlvdXQvbGF5b3V0LnB1Z1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImN1c3RvbS1zZWxlY3RcXFwiPjxidXR0b24gY2xhc3M9XFxcImN1c3RvbS1zZWxlY3RfX29wdGlvbiBjdXN0b20tc2VsZWN0X19vcHRpb25fcHJlc2VudFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwub3BlbiA9IHRydWVcXFwiPnt7JGN0cmwuc2VsZWN0ZWR9fTwvYnV0dG9uPjxjb3JhbC1pY29uIGNsYXNzPVxcXCJjdXN0b20tc2VsZWN0X19pY29uXFxcIiBpY29uPVxcXCJkb3duXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwub3BlbiA9IHRydWVcXFwiPjwvY29yYWwtaWNvbj48ZGl2IGNsYXNzPVxcXCJjdXN0b20tc2VsZWN0LW9wdGlvbnMtbGlzdFxcXCIgbmctaWY9XFxcIiRjdHJsLm9wZW5cXFwiPjxidXR0b24gY2xhc3M9XFxcImN1c3RvbS1zZWxlY3RfX29wdGlvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1yZXBlYXQ9XFxcIiRvcHRpb24gaW4gJGN0cmwub3B0aW9uc1xcXCIgbmctY2xhc3M9XFxcInsnY3VzdG9tLXNlbGVjdF9fb3B0aW9uX2N1cnJlbnQnOiAkb3B0aW9uID09ICRjdHJsLnNlbGVjdGVkfVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnBpY2soJG9wdGlvbilcXFwiIHZhbHVlPVxcXCJ7eyRvcHRpb259fVxcXCI+e3skb3B0aW9ufX08L2J1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjdXN0b20tc2VsZWN0LW92ZXJsYXlcXFwiIG5nLWlmPVxcXCIkY3RybC5vcGVuXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwub3BlbiA9IGZhbHNlXFxcIj48L2Rpdj48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NlbGVjdC9zZWxlY3QucHVnXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAubW9kdWxlJztcbmltcG9ydCAnLi9zdHlsZXMuc2Fzcyc7XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXRlUGlja2VyRGVtbycsIFtcbiAgICBBcHBNb2R1bGVcbl0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kZW1vL21haW4udHNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=