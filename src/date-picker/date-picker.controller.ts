
export class DatePickerController {
    public static $inject = ['$scope', '$timeout'];
    // Input
    public specifiedDate: Date;
    public open: boolean;
    public up: any;
    public locale: string;

    // Day selected by user
    public selectedDay: number;
    // Month selected by user
    public selectedMonth: string;
    // Year selected by user
    public selectedYear: string;

    public pickedDate: Date;
    public days: Date[];
    public years: string[];
    public cellsBefore: number[];
    public cellsAfter: number[];
    public weekDays: string[];
    public months: string[];

    constructor(private $scope: angular.IScope, private timeout: angular.ITimeoutService) {

    }

    public $onInit() {
        this.locale = 'en-us';
        this.weekDays = this.getWeekDays();
        this.months = this.getMonths();
        this.setPickedDate(this.specifiedDate ? this.specifiedDate : new Date());
    }

    private getWeekDays() {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    }

    private getMonths() {
        let date =  new Date();
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }

    private setPickedDate(date: Date) {
        this.pickedDate = new Date(date);
        this.selectedDay = this.pickedDate.getDate();
        this.selectedMonth = this.getCurrentMonth(this.pickedDate);
        console.log('here month', this.selectedMonth);
        this.selectedYear = this.pickedDate.getFullYear().toString();
        this.days = this.getDaysInMonth(this.pickedDate);
        this.years = this.yearsList();
        this.cellsBefore = this.getCellsBefore(this.pickedDate);
        this.cellsAfter = this.getCellsAfter(this.pickedDate);
    }

    public getCurrentMonth(date) {
        return date.toLocaleString(this.locale, { month: 'short' });
    }

    private getCellsBefore(date) {
        let cells = [];
        let firstDay = new Date(date);
        firstDay.setDate(1);
        let weekDay = firstDay.getDay();
        for(let i = 0; i < weekDay; i++) {
            cells.push(i);
        }
        return cells;
    }

    private getCellsAfter(date) {
        let cells = [];
        let added: any = this.getCellsBefore(this.pickedDate).length;
        let month = date.getMonth();
        let year = date.getFullYear();
        let newDate: Date = new Date(year, month + 1, 0);
        let d: any = newDate.getDate();
        let common = added + d;
        let emptyCells = 7 - (common % 7);
        if (emptyCells < 7) {
            for (let i = 0; i < emptyCells; i++) {
                cells.push(i);
            }
        }
        return cells;
    }

    private getDaysInMonth(date) {
        let month = date.getMonth(),
            year = date.getFullYear();
        let newDate = new Date(year, month, 1);
        let days = [];
        while (newDate.getMonth() === month) {
            days.push(newDate.getDate());
            newDate.setDate(newDate.getDate() + 1);
        }
        return days;
    }

    public upDays() {
        this.timeout(() => {
            this.days = this.getDaysInMonth(this.pickedDate);
            this.cellsBefore = this.getCellsBefore(this.pickedDate);
            this.cellsAfter = this.getCellsAfter(this.pickedDate);
        }, 50);
    }

    public yearsList() {
        let years = [];
        let currentYear = new Date().getFullYear();
        let endCalculationYear = currentYear + 100;
        for(let year = currentYear; year <= endCalculationYear; year++) {
            years.push(year.toString());
        }
        return years;
    }

    public setMonth(month) {
        this.pickedDate.setMonth(month);
        this.selectedMonth = this.getCurrentMonth(this.pickedDate);
        this.upDays();
    }

    public prevMonth() {
        let month = this.pickedDate.getMonth() - 1;
        this.setMonth(month);
    }

    public nextMonth() {
        let month = this.pickedDate.getMonth() + 1;
        this.setMonth(month);
    }

    public pick(day) {
        this.open = false;
        this.pickedDate.setDate(day);
        this.selectedDay = this.pickedDate.getDate();
        this.specifiedDate.setFullYear(this.pickedDate.getFullYear());
        this.specifiedDate.setMonth(this.pickedDate.getMonth());
        this.specifiedDate.setDate(this.pickedDate.getDate());

        this.up({pickedDate: this.specifiedDate});
    }

    public close() {
        this.open = false;
    }

    public isCurrentDay(day) {
        let currentDate = new Date();
        return (day === currentDate.getDate() &&
            this.pickedDate.getMonth() === currentDate.getMonth() &&
            this.pickedDate.getFullYear() === currentDate.getFullYear());
    }

    public isSelectedDay(day) {
        return (day === this.selectedDay &&
            this.pickedDate.getMonth() === this.specifiedDate.getMonth() &&
            this.pickedDate.getFullYear() === this.specifiedDate.getFullYear());
    }

    public selectYear(value: string) {
        this.pickedDate.setFullYear(parseInt(value));
        this.upDays();
    }

    public selectMonth(value: string) {
        let month = this.months.indexOf(value);
        this.setMonth(month);
    }
}
