import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgUploaderModule } from 'ngx-uploader';
import { RlTagInputModule } from 'angular2-tag-input';
import { ColorPickerModule } from 'ngx-color-picker';
import { SortablejsModule } from 'angular-sortablejs';
import { ModalModule, TooltipModule, TabsModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxAuthComponent, NgxLoginComponent, NgxAuthBlockComponent } from './components/auth/';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
} from '@nebular/theme';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  ThemeSwitcherComponent,
  TinyMCEComponent,
  CustomModalComponent,
  SearchBox,
  PictureUploader,
  PaginationComponent,
  Select2Component,
  ContactsComponent
} from './components';

import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, CountDownPipe } from './pipes';

import {
  OneColumnLayoutComponent,
  SampleLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';

const BASE_MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule, 
  NgxPaginationModule,
  ColorPickerModule,
  RlTagInputModule,
  RouterModule
];

const IMPORT_MOD = [
  ModalModule.forRoot(),
  TooltipModule.forRoot(),
  TabsModule.forRoot(),
  PopoverModule.forRoot(),
  BsDropdownModule.forRoot(),
  SortablejsModule.forRoot({ animation: 150 })
];

const EXPORT_MOD = [
  ModalModule,
  TooltipModule,
  TabsModule,
  PopoverModule,
  BsDropdownModule,
  SortablejsModule
];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NgbModule,
  NgUploaderModule
];

const COMPONENTS = [
  ThemeSwitcherComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  SampleLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  CustomModalComponent,
  SearchBox,
  PictureUploader,
  PaginationComponent,
  Select2Component,
  ContactsComponent
];

const AUTH_COMPONENTS = [
  //NgxAuthComponent,
  NgxAuthBlockComponent,
  NgxLoginComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  CountDownPipe
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [ DEFAULT_THEME, COSMIC_THEME ]
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, ...IMPORT_MOD],
  exports: [...BASE_MODULES, ...NB_MODULES, ...AUTH_COMPONENTS, ...COMPONENTS, ...PIPES, ...EXPORT_MOD],
  declarations: [...COMPONENTS, ...PIPES, ...AUTH_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
