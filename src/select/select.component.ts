import { SelectController } from "./select.controller";

export const SelectComponent: angular.IComponentOptions = {
    controller: SelectController,
    template: require("./select.pug"),
    bindings: {
        options: "<",
        choose: "&",
        selected: "="
    }
};
