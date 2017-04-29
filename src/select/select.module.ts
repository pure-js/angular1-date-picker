import * as angular from "angular";
import { SelectComponent } from "./select.component";
import  "./select.sass";

export const SelectModule = angular
  .module("select", [])
  .component("customSelect", SelectComponent)
  .name;
