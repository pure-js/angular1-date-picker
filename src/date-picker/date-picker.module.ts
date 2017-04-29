import * as angular from "angular";
import { DatePickerComponent } from "./date-picker.component";
import  "./date-picker.sass";

export const DataPickerModule = angular
  .module("datePicker", [])
  .component("datePicker", DatePickerComponent)
  .name;
