import * as angular from "angular";
import { LayoutComponent } from "./layout.component";
import  "./layout.sass";

export const LayoutModule = angular
  .module("layout", [])
  .component("layoutcolumn", LayoutComponent)
  .name;