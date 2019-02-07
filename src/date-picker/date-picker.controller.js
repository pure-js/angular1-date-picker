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
//# sourceMappingURL=date-picker.controller.js.map