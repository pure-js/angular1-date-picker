import { LayoutController } from "./layout.controller";

export const LayoutComponent: angular.IComponentOptions = {
  transclude: true,
  controller: LayoutController,
  template: require("./layout.pug")
};