
export class SelectController {
    public static $inject: string[] = ['$scope'];
    // Input
    public options: any[];
    public choose: any;
    public selected: string;

    public open: boolean;

    constructor(private $scope: angular.IScope) {

    }

    public $onInit() {
        this.open = false;
        console.log(this.selected);
    }

    public pick(value: string) {
        this.open = false;
        this.selected = value;
        this.choose({value: this.selected});
    }

    public close() {
        this.open = false;
    }
}
