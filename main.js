webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_layout_layout_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_date_picker_date_picker_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_select_select_module__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_select_select_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_select_select_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_click_outside_click_outside_module__ = __webpack_require__(3);
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var click_outside_directive_1 = __webpack_require__(2);
exports.ClickOutsideModule = angular
    .module("clickOutside", [])
    .directive("clickOutside", click_outside_directive_1.clickOutsideDirectiveFactory())
    .name;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var date_picker_controller_1 = __webpack_require__(5);
exports.DatePickerComponent = {
    controller: date_picker_controller_1.DatePickerController,
    template: __webpack_require__(16),
    bindings: {
        specifiedDate: "=",
        open: "=",
        up: "&"
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DatePickerController = (function () {
    function DatePickerController(scope, timeout) {
        this.scope = scope;
        this.timeout = timeout;
        this.weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
    DatePickerController.prototype.$onInit = function () {
        var _this = this;
        this.setPickedDate(this.specifiedDate ? this.specifiedDate : new Date());
        this.scope.$watch(function () {
            return _this.open;
        }, function () {
            _this.setPickedDate(_this.specifiedDate);
        });
    };
    DatePickerController.prototype.setPickedDate = function (date) {
        this.pickedDate = new Date(date);
        this.selectedDay = this.pickedDate.getDate();
        this.selectedMonth = this.getCurrentMonth(this.pickedDate);
        this.selectedYear = this.pickedDate.getFullYear().toString();
        this.days = this.getDaysInMonth(this.pickedDate);
        this.years = this.yearsList();
        this.cellsBefore = this.getCellsBefore(this.pickedDate);
        this.cellsAfter = this.getCellsAfter(this.pickedDate);
    };
    DatePickerController.prototype.getCurrentMonth = function (date) {
        var locale = "en-us";
        return date.toLocaleString(locale, { month: "short" });
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
        var month = date.getMonth(), year = date.getFullYear();
        var newDate = new Date(year, month + 1, 0);
        var d = newDate.getDate();
        var common = added + d;
        var emptyCells = 7 - (common % 7);
        for (var i = 0; i < emptyCells; i++) {
            cells.push(i);
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
DatePickerController.$inject = ["$scope", "$timeout"];
exports.DatePickerController = DatePickerController;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var date_picker_component_1 = __webpack_require__(4);
__webpack_require__(13);
exports.DataPickerModule = angular
    .module("datePicker", [])
    .component("datePicker", date_picker_component_1.DatePickerComponent)
    .name;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var layout_controller_1 = __webpack_require__(8);
exports.LayoutComponent = {
    transclude: true,
    controller: layout_controller_1.LayoutController,
    template: __webpack_require__(17)
};


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var layout_component_1 = __webpack_require__(7);
__webpack_require__(14);
exports.LayoutModule = angular
    .module("layout", [])
    .component("layoutcolumn", layout_component_1.LayoutComponent)
    .name;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var select_controller_1 = __webpack_require__(11);
exports.SelectComponent = {
    controller: select_controller_1.SelectController,
    template: __webpack_require__(18),
    bindings: {
        options: "<",
        choose: "&",
        selected: "="
    }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectController = (function () {
    function SelectController($scope) {
        this.$scope = $scope;
    }
    SelectController.prototype.$onInit = function () {
        this.open = false;
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var select_component_1 = __webpack_require__(10);
__webpack_require__(15);
exports.SelectModule = angular
    .module("select", [])
    .component("customSelect", select_component_1.SelectComponent)
    .name;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

module.exports = "<div class=\"date-picker\" ng-if=\"$ctrl.open\"><div class=\"layout-container\"><div class=\"layout-column\" style=\"flex-basis: 37px;\"><button class=\"date-picker__prev\" type=\"button\" title=\"Previous month\"><coral-icon icon=\"left\" ng-click=\"$ctrl.prevMonth()\"></coral-icon></button></div><div class=\"layout-column\" style=\"flex-basis: 72px;\"><custom-select class=\"date-picker-select-container\" options=\"$ctrl.months\" selected=\"$ctrl.selectedMonth\" choose=\"$ctrl.selectMonth(value)\"></custom-select></div><div class=\"layout-column\" style=\"flex-basis: 72px;\"><custom-select class=\"date-picker-select-container\" options=\"$ctrl.years\" selected=\"$ctrl.selectedYear\" choose=\"$ctrl.selectYear(value)\"></custom-select></div><div class=\"layout-column\" style=\"flex-basis: 37px;\"><button class=\"date-picker__next\" type=\"button\" title=\"Next month\"><coral-icon icon=\"right\" ng-click=\"$ctrl.nextMonth()\"></coral-icon></button></div></div><div class=\"layout-container\"><div class=\"calendar\"><div class=\"calendar__weekday\" ng-repeat=\"$day in $ctrl.weekDays\">{{$day}}</div><div class=\"calendar__cell calendar__cell_empty\" ng-repeat=\"$cell in $ctrl.cellsBefore\"></div><button class=\"calendar__cell calendar__day\" type=\"button\" ng-repeat=\"$day in $ctrl.days\" ng-click=\"$ctrl.pick($day)\" ng-class=\"{'calendar__day_active': $ctrl.isSelectedDay($day), 'calendar__day_marked': $ctrl.isCurrentDay($day)}\">{{$day}}</button><div class=\"calendar__cell calendar__cell_empty\" ng-repeat=\"$cell in $ctrl.cellsAfter\"></div></div></div></div><div class=\"date-picker-overlay\" ng-if=\"$ctrl.open\" ng-click=\"$ctrl.close()\"></div>"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-column\" ng-transclude=\"ng-transclude\"></div>"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div class=\"custom-select\"><button class=\"custom-select__option custom-select__option_present\" type=\"button\" ng-click=\"$ctrl.open = true\">{{$ctrl.selected}}</button><coral-icon class=\"custom-select__icon\" icon=\"down\" ng-click=\"$ctrl.open = true\"></coral-icon><div class=\"custom-select-options-list\" ng-if=\"$ctrl.open\"><button class=\"custom-select__option\" type=\"button\" ng-repeat=\"$option in $ctrl.options\" ng-class=\"{'custom-select__option_current': $option == $ctrl.selected}\" ng-click=\"$ctrl.pick($option)\" value=\"{{$option}}\">{{$option}}</button></div><div class=\"custom-select-overlay\" ng-if=\"$ctrl.open\" ng-click=\"$ctrl.open = false\"></div></div>"

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(1);



__WEBPACK_IMPORTED_MODULE_0_angular__["module"]('datePickerDemo', [
    __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]
]);


/***/ })
],[19]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZW1vL2FwcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIubW9kdWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvbGF5b3V0LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L2xheW91dC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvbGF5b3V0Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC9zZWxlY3QuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnNhc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9sYXlvdXQuc2FzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0L3NlbGVjdC5zYXNzIiwid2VicGFjazovLy8uL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5wdWciLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9sYXlvdXQucHVnIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Qvc2VsZWN0LnB1ZyIsIndlYnBhY2s6Ly8vLi9kZW1vL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ3VCO0FBQ0k7QUFDSjtBQUNNOztBQUU3QixpRUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7QUNYQTtJQUNJLCtCQUFvQixTQUFtQztRQUFuQyxjQUFTLEdBQVQsU0FBUyxDQUEwQjtJQUFHLENBQUM7SUFHM0Qsb0NBQUksR0FBSixVQUFLLE1BQWMsRUFBRSxRQUFRLEVBQUUsTUFBc0I7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV0QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRWpELE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUNOLDRCQUFDO0FBQUQsQ0FBQztBQUVZLG9DQUE0QixHQUFHO0lBQ3hDLElBQU0sU0FBUyxHQUFHLFVBQUMsU0FBbUMsSUFBSyxXQUFJLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO0lBQ2hHLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ3JCLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQzdCRixxQ0FBbUM7QUFDbkMsdURBQXlFO0FBRTVELDBCQUFrQixHQUFHLE9BQU87S0FDdEMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7S0FDMUIsU0FBUyxDQUFDLGNBQWMsRUFBRSxzREFBNEIsRUFBRSxDQUFDO0tBQ3pELElBQUksQ0FBQzs7Ozs7Ozs7OztBQ05SLHNEQUFnRTtBQUVuRCwyQkFBbUIsR0FBOEI7SUFDMUQsVUFBVSxFQUFFLDZDQUFvQjtJQUNoQyxRQUFRLEVBQUUsbUJBQU8sQ0FBQyxFQUFtQixDQUFDO0lBQ3RDLFFBQVEsRUFBRTtRQUNOLGFBQWEsRUFBRSxHQUFHO1FBQ2xCLElBQUksRUFBRSxHQUFHO1FBQ1QsRUFBRSxFQUFFLEdBQUc7S0FDVjtDQUNKLENBQUM7Ozs7Ozs7Ozs7QUNURjtJQXNCSSw4QkFBb0IsS0FBcUIsRUFBVSxPQUFnQztRQUEvRCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBSDVFLGFBQVEsR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLFdBQU0sR0FBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFJL0csQ0FBQztJQUVNLHNDQUFPLEdBQWQ7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUMsRUFBRTtZQUNDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDRDQUFhLEdBQXJCLFVBQXNCLElBQVU7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLDhDQUFlLEdBQXRCLFVBQXVCLElBQUk7UUFDdkIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyw2Q0FBYyxHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hDLEdBQUcsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLDRDQUFhLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLE9BQU8sR0FBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBUSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEMsR0FBRyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sNkNBQWMsR0FBdEIsVUFBdUIsSUFBSTtRQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxxQ0FBTSxHQUFiO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLHdDQUFTLEdBQWhCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyxJQUFJLGtCQUFrQixHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDM0MsR0FBRyxFQUFDLElBQUksSUFBSSxHQUFHLFdBQVcsRUFBRSxJQUFJLElBQUksa0JBQWtCLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUM3RCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSx1Q0FBUSxHQUFmLFVBQWdCLEtBQUs7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLHdDQUFTLEdBQWhCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0sd0NBQVMsR0FBaEI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxtQ0FBSSxHQUFYLFVBQVksR0FBRztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxvQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLDJDQUFZLEdBQW5CLFVBQW9CLEdBQUc7UUFDbkIsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU0sNENBQWEsR0FBcEIsVUFBcUIsR0FBRztRQUNwQixNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFdBQVc7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU0seUNBQVUsR0FBakIsVUFBa0IsS0FBYTtRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLDBDQUFXLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDO0FBaEtVLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFEL0Isb0RBQW9COzs7Ozs7Ozs7O0FDRGpDLHFDQUFtQztBQUNuQyxxREFBOEQ7QUFDOUQsd0JBQTZCO0FBRWhCLHdCQUFnQixHQUFHLE9BQU87S0FDcEMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7S0FDeEIsU0FBUyxDQUFDLFlBQVksRUFBRSwyQ0FBbUIsQ0FBQztLQUM1QyxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUNQUixpREFBdUQ7QUFFMUMsdUJBQWUsR0FBOEI7SUFDeEQsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLG9DQUFnQjtJQUM1QixRQUFRLEVBQUUsbUJBQU8sQ0FBQyxFQUFjLENBQUM7Q0FDbEMsQ0FBQzs7Ozs7Ozs7OztBQ05GO0lBQUE7SUFFQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDO0FBRlksNENBQWdCOzs7Ozs7Ozs7O0FDQTdCLHFDQUFtQztBQUNuQyxnREFBcUQ7QUFDckQsd0JBQXdCO0FBRVgsb0JBQVksR0FBRyxPQUFPO0tBQ2hDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0tBQ3BCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0NBQWUsQ0FBQztLQUMxQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUNQUixrREFBdUQ7QUFFMUMsdUJBQWUsR0FBOEI7SUFDdEQsVUFBVSxFQUFFLG9DQUFnQjtJQUM1QixRQUFRLEVBQUUsbUJBQU8sQ0FBQyxFQUFjLENBQUM7SUFDakMsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLFFBQVEsRUFBRSxHQUFHO0tBQ2hCO0NBQ0osQ0FBQzs7Ozs7Ozs7OztBQ1RGO0lBU0ksMEJBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBRTFDLENBQUM7SUFFTSxrQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLCtCQUFJLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGdDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDO0FBekJpQix3QkFBTyxHQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFEcEMsNENBQWdCOzs7Ozs7Ozs7O0FDRDdCLHFDQUFtQztBQUNuQyxpREFBcUQ7QUFDckQsd0JBQXdCO0FBRVgsb0JBQVksR0FBRyxPQUFPO0tBQ2hDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0tBQ3BCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0NBQWUsQ0FBQztLQUMxQyxJQUFJLENBQUM7Ozs7Ozs7QUNQUix5Qzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSx3SkFBd0osMk5BQTJOLG1PQUFtTyxnT0FBZ08sd1NBQXdTLE1BQU0sa1BBQWtQLG9HQUFvRyxLQUFLLE1BQU0sc047Ozs7OztBQ0FyOEMsc0Y7Ozs7OztBQ0FBLHNLQUFzSyxnQkFBZ0IsdVJBQXVSLDJEQUEyRCw4Q0FBOEMsU0FBUyxLQUFLLFNBQVMsc0g7Ozs7Ozs7Ozs7O0FDQTdrQjtBQUNvQjs7QUFFcEI7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tIFwiLi4vc3JjL2xheW91dC9sYXlvdXQubW9kdWxlXCI7XG5pbXBvcnQgeyBEYXRhUGlja2VyTW9kdWxlIH0gZnJvbSBcIi4uL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5tb2R1bGVcIjtcbmltcG9ydCB7IFNlbGVjdE1vZHVsZSB9IGZyb20gXCIuLi9zcmMvc2VsZWN0L3NlbGVjdC5tb2R1bGVcIjtcbmltcG9ydCB7IENsaWNrT3V0c2lkZU1vZHVsZSB9IGZyb20gXCIuLi9zcmMvY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLm1vZHVsZVwiO1xuXG5leHBvcnQgY29uc3QgQXBwTW9kdWxlID0gYW5ndWxhclxuICAgIC5tb2R1bGUoXCJhcHAuY29tcG9uZW50c1wiLCBbXG4gICAgICAgIERhdGFQaWNrZXJNb2R1bGUsXG4gICAgICAgIExheW91dE1vZHVsZSxcbiAgICAgICAgU2VsZWN0TW9kdWxlLFxuICAgICAgICBDbGlja091dHNpZGVNb2R1bGVcbiAgICBdKVxuICAgIC5uYW1lO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kZW1vL2FwcC5tb2R1bGUudHNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSVNjb3BlIH0gZnJvbSBcImFuZ3VsYXJcIjtcblxuY2xhc3MgY2xpY2tPdXRzaWRlRGlyZWN0aXZlIGltcGxlbWVudHMgYW5ndWxhci5JRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRkb2N1bWVudDogYW5ndWxhci5JRG9jdW1lbnRTZXJ2aWNlKSB7fVxuXG4gICAgcmVzdHJpY3Q6IFwiQVwiO1xuICAgIGxpbmsoJHNjb3BlOiBJU2NvcGUsICRlbGVtZW50LCAkYXR0cnM6IG5nLklBdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRoaXMuJGRvY3VtZW50Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKCRlbGVtZW50WzBdICE9PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRhcmdldFwiLCAkZWxlbWVudC5wYXJlbnQuY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGV2YWwoJGF0dHJzLmNsaWNrT3V0c2lkZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgY2xpY2tPdXRzaWRlRGlyZWN0aXZlRmFjdG9yeSA9IGZ1bmN0aW9uICgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XG4gICAgY29uc3QgZGlyZWN0aXZlID0gKCRkb2N1bWVudDogYW5ndWxhci5JRG9jdW1lbnRTZXJ2aWNlKSA9PiBuZXcgY2xpY2tPdXRzaWRlRGlyZWN0aXZlKCRkb2N1bWVudCk7XG4gICAgZGlyZWN0aXZlLiRpbmplY3QgPSBbXCIkZG9jdW1lbnRcIl07XG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xuaW1wb3J0IHsgY2xpY2tPdXRzaWRlRGlyZWN0aXZlRmFjdG9yeSB9IGZyb20gXCIuL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlXCI7XG5cbmV4cG9ydCBjb25zdCBDbGlja091dHNpZGVNb2R1bGUgPSBhbmd1bGFyXG4gIC5tb2R1bGUoXCJjbGlja091dHNpZGVcIiwgW10pXG4gIC5kaXJlY3RpdmUoXCJjbGlja091dHNpZGVcIiwgY2xpY2tPdXRzaWRlRGlyZWN0aXZlRmFjdG9yeSgpKVxuICAubmFtZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLm1vZHVsZS50cyIsImltcG9ydCB7IERhdGVQaWNrZXJDb250cm9sbGVyIH0gZnJvbSBcIi4vZGF0ZS1waWNrZXIuY29udHJvbGxlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERhdGVQaWNrZXJDb21wb25lbnQ6IGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICBjb250cm9sbGVyOiBEYXRlUGlja2VyQ29udHJvbGxlcixcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9kYXRlLXBpY2tlci5wdWdcIiksXHJcbiAgICBiaW5kaW5nczoge1xyXG4gICAgICAgIHNwZWNpZmllZERhdGU6IFwiPVwiLFxyXG4gICAgICAgIG9wZW46IFwiPVwiLFxyXG4gICAgICAgIHVwOiBcIiZcIlxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIlxyXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiXTtcclxuICAgIC8vIElucHV0XHJcbiAgICBwdWJsaWMgc3BlY2lmaWVkRGF0ZTogRGF0ZTtcclxuICAgIHB1YmxpYyBvcGVuOiBib29sZWFuO1xyXG4gICAgcHVibGljIHVwOiBhbnk7XHJcblxyXG4gICAgLy8gRGF5IHNlbGVjdGVkIGJ5IHVzZXJcclxuICAgIHB1YmxpYyBzZWxlY3RlZERheTogbnVtYmVyO1xyXG4gICAgLy8gTW9udGggc2VsZWN0ZWQgYnkgdXNlclxyXG4gICAgcHVibGljIHNlbGVjdGVkTW9udGg6IHN0cmluZztcclxuICAgIC8vIFllYXIgc2VsZWN0ZWQgYnkgdXNlclxyXG4gICAgcHVibGljIHNlbGVjdGVkWWVhcjogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBwaWNrZWREYXRlOiBEYXRlO1xyXG4gICAgcHVibGljIGRheXM6IERhdGVbXTtcclxuICAgIHB1YmxpYyB5ZWFyczogc3RyaW5nW107XHJcbiAgICBwdWJsaWMgY2VsbHNCZWZvcmU6IG51bWJlcltdO1xyXG4gICAgcHVibGljIGNlbGxzQWZ0ZXI6IG51bWJlcltdO1xyXG4gICAgcHVibGljIHdlZWtEYXlzOiBzdHJpbmdbXSA9IFtcIlN1XCIsIFwiTW9cIiwgXCJUdVwiLCBcIldlXCIsIFwiVGhcIiwgXCJGclwiLCBcIlNhXCJdO1xyXG4gICAgcHVibGljIG1vbnRoczogc3RyaW5nW10gPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzY29wZTogYW5ndWxhci5JU2NvcGUsIHByaXZhdGUgdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRQaWNrZWREYXRlKHRoaXMuc3BlY2lmaWVkRGF0ZSA/IHRoaXMuc3BlY2lmaWVkRGF0ZSA6IG5ldyBEYXRlKCkpO1xyXG5cclxuICAgICAgICB0aGlzLnNjb3BlLiR3YXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW47XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFBpY2tlZERhdGUodGhpcy5zcGVjaWZpZWREYXRlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBpY2tlZERhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGlja2VkRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSB0aGlzLnBpY2tlZERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHRoaXMuZ2V0Q3VycmVudE1vbnRoKHRoaXMucGlja2VkRGF0ZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFllYXIgPSB0aGlzLnBpY2tlZERhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuZGF5cyA9IHRoaXMuZ2V0RGF5c0luTW9udGgodGhpcy5waWNrZWREYXRlKTtcclxuICAgICAgICB0aGlzLnllYXJzID0gdGhpcy55ZWFyc0xpc3QoKTtcclxuICAgICAgICB0aGlzLmNlbGxzQmVmb3JlID0gdGhpcy5nZXRDZWxsc0JlZm9yZSh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgIHRoaXMuY2VsbHNBZnRlciA9IHRoaXMuZ2V0Q2VsbHNBZnRlcih0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TW9udGgoZGF0ZSkge1xyXG4gICAgICAgIGxldCBsb2NhbGUgPSBcImVuLXVzXCI7XHJcbiAgICAgICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDZWxsc0JlZm9yZShkYXRlKSB7XHJcbiAgICAgICAgbGV0IGNlbGxzID0gW107XHJcbiAgICAgICAgbGV0IGZpcnN0RGF5ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgZmlyc3REYXkuc2V0RGF0ZSgxKTtcclxuICAgICAgICBsZXQgd2Vla0RheSA9IGZpcnN0RGF5LmdldERheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3ZWVrRGF5OyBpKyspIHtcclxuICAgICAgICAgICAgY2VsbHMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2VsbHNBZnRlcihkYXRlKSB7XHJcbiAgICAgICAgbGV0IGNlbGxzID0gW107XHJcbiAgICAgICAgbGV0IGFkZGVkOiBhbnkgPSB0aGlzLmdldENlbGxzQmVmb3JlKHRoaXMucGlja2VkRGF0ZSkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBsZXQgbmV3RGF0ZTogYW55ID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKTtcclxuICAgICAgICBsZXQgZDogYW55ID0gbmV3RGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IGNvbW1vbiA9IGFkZGVkICsgZDtcclxuICAgICAgICBsZXQgZW1wdHlDZWxscyA9IDcgLSAoY29tbW9uICUgNyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVtcHR5Q2VsbHM7IGkrKykge1xyXG4gICAgICAgICAgICBjZWxscy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2VsbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXlzSW5Nb250aChkYXRlKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBuZXdEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xyXG4gICAgICAgIGxldCBkYXlzID0gW107XHJcbiAgICAgICAgd2hpbGUgKG5ld0RhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGgpIHtcclxuICAgICAgICAgICAgZGF5cy5wdXNoKG5ld0RhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgbmV3RGF0ZS5zZXREYXRlKG5ld0RhdGUuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cERheXMoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kYXlzID0gdGhpcy5nZXREYXlzSW5Nb250aCh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzQmVmb3JlID0gdGhpcy5nZXRDZWxsc0JlZm9yZSh0aGlzLnBpY2tlZERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzQWZ0ZXIgPSB0aGlzLmdldENlbGxzQWZ0ZXIodGhpcy5waWNrZWREYXRlKTtcclxuICAgICAgICB9LCA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHllYXJzTGlzdCgpIHtcclxuICAgICAgICBsZXQgeWVhcnMgPSBbXTtcclxuICAgICAgICBsZXQgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgbGV0IGVuZENhbGN1bGF0aW9uWWVhciA9IGN1cnJlbnRZZWFyICsgMTAwO1xyXG4gICAgICAgIGZvcihsZXQgeWVhciA9IGN1cnJlbnRZZWFyOyB5ZWFyIDw9IGVuZENhbGN1bGF0aW9uWWVhcjsgeWVhcisrKSB7XHJcbiAgICAgICAgICAgIHllYXJzLnB1c2goeWVhci50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHllYXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNb250aChtb250aCkge1xyXG4gICAgICAgIHRoaXMucGlja2VkRGF0ZS5zZXRNb250aChtb250aCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gdGhpcy5nZXRDdXJyZW50TW9udGgodGhpcy5waWNrZWREYXRlKTtcclxuICAgICAgICB0aGlzLnVwRGF5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmV2TW9udGgoKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkgLSAxO1xyXG4gICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwaWNrKGRheSkge1xyXG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGlja2VkRGF0ZS5zZXREYXRlKGRheSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERheSA9IHRoaXMucGlja2VkRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zcGVjaWZpZWREYXRlLnNldEZ1bGxZZWFyKHRoaXMucGlja2VkRGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICB0aGlzLnNwZWNpZmllZERhdGUuc2V0TW9udGgodGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkpO1xyXG4gICAgICAgIHRoaXMuc3BlY2lmaWVkRGF0ZS5zZXREYXRlKHRoaXMucGlja2VkRGF0ZS5nZXREYXRlKCkpO1xyXG5cclxuICAgICAgICB0aGlzLnVwKHtwaWNrZWREYXRlOiB0aGlzLnNwZWNpZmllZERhdGV9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ3VycmVudERheShkYXkpIHtcclxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiAoZGF5ID09PSBjdXJyZW50RGF0ZS5nZXREYXRlKCkgJiZcclxuICAgICAgICAgICAgdGhpcy5waWNrZWREYXRlLmdldE1vbnRoKCkgPT09IGN1cnJlbnREYXRlLmdldE1vbnRoKCkgJiZcclxuICAgICAgICAgICAgdGhpcy5waWNrZWREYXRlLmdldEZ1bGxZZWFyKCkgPT09IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1NlbGVjdGVkRGF5KGRheSkge1xyXG4gICAgICAgIHJldHVybiAoZGF5ID09PSB0aGlzLnNlbGVjdGVkRGF5ICYmXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VkRGF0ZS5nZXRNb250aCgpID09PSB0aGlzLnNwZWNpZmllZERhdGUuZ2V0TW9udGgoKSAmJlxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlZERhdGUuZ2V0RnVsbFllYXIoKSA9PT0gdGhpcy5zcGVjaWZpZWREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RZZWFyKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnBpY2tlZERhdGUuc2V0RnVsbFllYXIocGFyc2VJbnQodmFsdWUpKTtcclxuICAgICAgICB0aGlzLnVwRGF5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RNb250aCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5tb250aHMuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNb250aChtb250aCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb250cm9sbGVyLnRzIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSBcIi4vZGF0ZS1waWNrZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCAgXCIuL2RhdGUtcGlja2VyLnNhc3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBEYXRhUGlja2VyTW9kdWxlID0gYW5ndWxhclxyXG4gIC5tb2R1bGUoXCJkYXRlUGlja2VyXCIsIFtdKVxyXG4gIC5jb21wb25lbnQoXCJkYXRlUGlja2VyXCIsIERhdGVQaWNrZXJDb21wb25lbnQpXHJcbiAgLm5hbWU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIubW9kdWxlLnRzIiwiaW1wb3J0IHsgTGF5b3V0Q29udHJvbGxlciB9IGZyb20gXCIuL2xheW91dC5jb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjb25zdCBMYXlvdXRDb21wb25lbnQ6IGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMgPSB7XG4gIHRyYW5zY2x1ZGU6IHRydWUsXG4gIGNvbnRyb2xsZXI6IExheW91dENvbnRyb2xsZXIsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9sYXlvdXQucHVnXCIpXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvbGF5b3V0L2xheW91dC5jb21wb25lbnQudHMiLCJleHBvcnQgY2xhc3MgTGF5b3V0Q29udHJvbGxlciB7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvbGF5b3V0L2xheW91dC5jb250cm9sbGVyLnRzIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xuaW1wb3J0IHsgTGF5b3V0Q29tcG9uZW50IH0gZnJvbSBcIi4vbGF5b3V0LmNvbXBvbmVudFwiO1xuaW1wb3J0ICBcIi4vbGF5b3V0LnNhc3NcIjtcblxuZXhwb3J0IGNvbnN0IExheW91dE1vZHVsZSA9IGFuZ3VsYXJcbiAgLm1vZHVsZShcImxheW91dFwiLCBbXSlcbiAgLmNvbXBvbmVudChcImxheW91dGNvbHVtblwiLCBMYXlvdXRDb21wb25lbnQpXG4gIC5uYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL34vc291cmNlLW1hcC1sb2FkZXIhLi9zcmMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiLCJpbXBvcnQgeyBTZWxlY3RDb250cm9sbGVyIH0gZnJvbSBcIi4vc2VsZWN0LmNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdENvbXBvbmVudDogYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyA9IHtcbiAgICBjb250cm9sbGVyOiBTZWxlY3RDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9zZWxlY3QucHVnXCIpLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIG9wdGlvbnM6IFwiPFwiLFxuICAgICAgICBjaG9vc2U6IFwiJlwiLFxuICAgICAgICBzZWxlY3RlZDogXCI9XCJcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIlxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbXCIkc2NvcGVcIl07XG4gICAgLy8gSW5wdXRcbiAgICBwdWJsaWMgb3B0aW9uczogYW55W107XG4gICAgcHVibGljIGNob29zZTogYW55O1xuICAgIHB1YmxpYyBzZWxlY3RlZDogc3RyaW5nO1xuXG4gICAgcHVibGljIG9wZW46IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyAkb25Jbml0KCkge1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGljayh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2hvb3NlKHt2YWx1ZTogdGhpcy5zZWxlY3RlZH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vfi9zb3VyY2UtbWFwLWxvYWRlciEuL3NyYy9zZWxlY3Qvc2VsZWN0LmNvbnRyb2xsZXIudHMiLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi9zZWxlY3QuY29tcG9uZW50XCI7XG5pbXBvcnQgIFwiLi9zZWxlY3Quc2Fzc1wiO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0TW9kdWxlID0gYW5ndWxhclxuICAubW9kdWxlKFwic2VsZWN0XCIsIFtdKVxuICAuY29tcG9uZW50KFwiY3VzdG9tU2VsZWN0XCIsIFNlbGVjdENvbXBvbmVudClcbiAgLm5hbWU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9+L3NvdXJjZS1tYXAtbG9hZGVyIS4vc3JjL3NlbGVjdC9zZWxlY3QubW9kdWxlLnRzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5zYXNzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xheW91dC9sYXlvdXQuc2Fzc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zZWxlY3Qvc2VsZWN0LnNhc3Ncbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJkYXRlLXBpY2tlclxcXCIgbmctaWY9XFxcIiRjdHJsLm9wZW5cXFwiPjxkaXYgY2xhc3M9XFxcImxheW91dC1jb250YWluZXJcXFwiPjxkaXYgY2xhc3M9XFxcImxheW91dC1jb2x1bW5cXFwiIHN0eWxlPVxcXCJmbGV4LWJhc2lzOiAzN3B4O1xcXCI+PGJ1dHRvbiBjbGFzcz1cXFwiZGF0ZS1waWNrZXJfX3ByZXZcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdGl0bGU9XFxcIlByZXZpb3VzIG1vbnRoXFxcIj48Y29yYWwtaWNvbiBpY29uPVxcXCJsZWZ0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwucHJldk1vbnRoKClcXFwiPjwvY29yYWwtaWNvbj48L2J1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJsYXlvdXQtY29sdW1uXFxcIiBzdHlsZT1cXFwiZmxleC1iYXNpczogNzJweDtcXFwiPjxjdXN0b20tc2VsZWN0IGNsYXNzPVxcXCJkYXRlLXBpY2tlci1zZWxlY3QtY29udGFpbmVyXFxcIiBvcHRpb25zPVxcXCIkY3RybC5tb250aHNcXFwiIHNlbGVjdGVkPVxcXCIkY3RybC5zZWxlY3RlZE1vbnRoXFxcIiBjaG9vc2U9XFxcIiRjdHJsLnNlbGVjdE1vbnRoKHZhbHVlKVxcXCI+PC9jdXN0b20tc2VsZWN0PjwvZGl2PjxkaXYgY2xhc3M9XFxcImxheW91dC1jb2x1bW5cXFwiIHN0eWxlPVxcXCJmbGV4LWJhc2lzOiA3MnB4O1xcXCI+PGN1c3RvbS1zZWxlY3QgY2xhc3M9XFxcImRhdGUtcGlja2VyLXNlbGVjdC1jb250YWluZXJcXFwiIG9wdGlvbnM9XFxcIiRjdHJsLnllYXJzXFxcIiBzZWxlY3RlZD1cXFwiJGN0cmwuc2VsZWN0ZWRZZWFyXFxcIiBjaG9vc2U9XFxcIiRjdHJsLnNlbGVjdFllYXIodmFsdWUpXFxcIj48L2N1c3RvbS1zZWxlY3Q+PC9kaXY+PGRpdiBjbGFzcz1cXFwibGF5b3V0LWNvbHVtblxcXCIgc3R5bGU9XFxcImZsZXgtYmFzaXM6IDM3cHg7XFxcIj48YnV0dG9uIGNsYXNzPVxcXCJkYXRlLXBpY2tlcl9fbmV4dFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB0aXRsZT1cXFwiTmV4dCBtb250aFxcXCI+PGNvcmFsLWljb24gaWNvbj1cXFwicmlnaHRcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5uZXh0TW9udGgoKVxcXCI+PC9jb3JhbC1pY29uPjwvYnV0dG9uPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImxheW91dC1jb250YWluZXJcXFwiPjxkaXYgY2xhc3M9XFxcImNhbGVuZGFyXFxcIj48ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9fd2Vla2RheVxcXCIgbmctcmVwZWF0PVxcXCIkZGF5IGluICRjdHJsLndlZWtEYXlzXFxcIj57eyRkYXl9fTwvZGl2PjxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX19jZWxsIGNhbGVuZGFyX19jZWxsX2VtcHR5XFxcIiBuZy1yZXBlYXQ9XFxcIiRjZWxsIGluICRjdHJsLmNlbGxzQmVmb3JlXFxcIj48L2Rpdj48YnV0dG9uIGNsYXNzPVxcXCJjYWxlbmRhcl9fY2VsbCBjYWxlbmRhcl9fZGF5XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIG5nLXJlcGVhdD1cXFwiJGRheSBpbiAkY3RybC5kYXlzXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwucGljaygkZGF5KVxcXCIgbmctY2xhc3M9XFxcInsnY2FsZW5kYXJfX2RheV9hY3RpdmUnOiAkY3RybC5pc1NlbGVjdGVkRGF5KCRkYXkpLCAnY2FsZW5kYXJfX2RheV9tYXJrZWQnOiAkY3RybC5pc0N1cnJlbnREYXkoJGRheSl9XFxcIj57eyRkYXl9fTwvYnV0dG9uPjxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX19jZWxsIGNhbGVuZGFyX19jZWxsX2VtcHR5XFxcIiBuZy1yZXBlYXQ9XFxcIiRjZWxsIGluICRjdHJsLmNlbGxzQWZ0ZXJcXFwiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImRhdGUtcGlja2VyLW92ZXJsYXlcXFwiIG5nLWlmPVxcXCIkY3RybC5vcGVuXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+PC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5wdWdcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsYXlvdXQtY29sdW1uXFxcIiBuZy10cmFuc2NsdWRlPVxcXCJuZy10cmFuc2NsdWRlXFxcIj48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xheW91dC9sYXlvdXQucHVnXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiY3VzdG9tLXNlbGVjdFxcXCI+PGJ1dHRvbiBjbGFzcz1cXFwiY3VzdG9tLXNlbGVjdF9fb3B0aW9uIGN1c3RvbS1zZWxlY3RfX29wdGlvbl9wcmVzZW50XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5vcGVuID0gdHJ1ZVxcXCI+e3skY3RybC5zZWxlY3RlZH19PC9idXR0b24+PGNvcmFsLWljb24gY2xhc3M9XFxcImN1c3RvbS1zZWxlY3RfX2ljb25cXFwiIGljb249XFxcImRvd25cXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5vcGVuID0gdHJ1ZVxcXCI+PC9jb3JhbC1pY29uPjxkaXYgY2xhc3M9XFxcImN1c3RvbS1zZWxlY3Qtb3B0aW9ucy1saXN0XFxcIiBuZy1pZj1cXFwiJGN0cmwub3BlblxcXCI+PGJ1dHRvbiBjbGFzcz1cXFwiY3VzdG9tLXNlbGVjdF9fb3B0aW9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIG5nLXJlcGVhdD1cXFwiJG9wdGlvbiBpbiAkY3RybC5vcHRpb25zXFxcIiBuZy1jbGFzcz1cXFwieydjdXN0b20tc2VsZWN0X19vcHRpb25fY3VycmVudCc6ICRvcHRpb24gPT0gJGN0cmwuc2VsZWN0ZWR9XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwucGljaygkb3B0aW9uKVxcXCIgdmFsdWU9XFxcInt7JG9wdGlvbn19XFxcIj57eyRvcHRpb259fTwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XFxcImN1c3RvbS1zZWxlY3Qtb3ZlcmxheVxcXCIgbmctaWY9XFxcIiRjdHJsLm9wZW5cXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5vcGVuID0gZmFsc2VcXFwiPjwvZGl2PjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2VsZWN0L3NlbGVjdC5wdWdcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZGF0ZVBpY2tlckRlbW8nLCBbXG4gICAgQXBwTW9kdWxlXG5dKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVtby9tYWluLnRzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9