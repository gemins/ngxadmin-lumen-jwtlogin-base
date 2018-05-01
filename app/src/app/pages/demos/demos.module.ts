import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { routing }       from './demos.routing';
import { Demos } from './demos.component';
import { DemoTables } from './components/pageTables/table.component';
import { DemoTablesService } from './components/pageTables/table.service';
import { DemoForm } from './components/pageForm/pageForm.component';
import { DemoEdit } from './components/editPage/pageEdit.component';
import { DemoCreate } from './components/createPage/pageCreate.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    routing
  ],
  declarations: [
    Demos,
    DemoTables,
    DemoEdit,
    DemoCreate,
    DemoForm
  ],
  providers: [
    DemoTablesService
  ]
})
export class DemosModule {
}
