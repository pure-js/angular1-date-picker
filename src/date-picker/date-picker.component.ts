import { DatePickerController } from "./date-picker.controller";

export const DatePickerComponent: angular.IComponentOptions = {
    controller: DatePickerController,
    template: require("./date-picker.pug"),
    bindings: {
        specifiedDate: "=",
        open: "=",
        up: "&"
    }
};
