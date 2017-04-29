import * as angular from "angular";
import { clickOutsideDirectiveFactory } from "./click-outside.directive";

export const ClickOutsideModule = angular
  .module("clickOutside", [])
  .directive("clickOutside", clickOutsideDirectiveFactory())
  .name;
