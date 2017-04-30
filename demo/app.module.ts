import * as angular from 'angular';
import { LayoutModule } from '../src/layout/layout.module';
import { DataPickerModule } from '../src/date-picker/date-picker.module';
import { SelectModule } from '../src/select/select.module';
import { ClickOutsideModule } from '../src/click-outside/click-outside.module';

export const AppModule = angular
    .module('app.components', [
        DataPickerModule,
        LayoutModule,
        SelectModule,
        ClickOutsideModule
    ])
    .name;
