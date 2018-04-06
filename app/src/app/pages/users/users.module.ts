import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { routing }       from './users.routing';
import { Users } from './users.component';
import { UserTables } from './components/pageTables/table.component';
import { UserTablesService } from './components/pageTables/table.service';
import { UserForm } from './components/pageForm/pageForm.component';
import { UserEdit } from './components/editPage/pageEdit.component';
import { UserCreate } from './components/createPage/pageCreate.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    routing
  ],
  declarations: [
    Users,
    UserTables,
    UserEdit,
    UserCreate,
    UserForm
  ],
  providers: [
    UserTablesService
  ]
})
export class UsersModule {
}
