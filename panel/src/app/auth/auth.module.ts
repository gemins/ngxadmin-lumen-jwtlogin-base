import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule
} from '@nebular/theme';

import {
    NgxAuthBlockComponent,
    NgxAuthComponent,
    NgxLoginComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbCardModule,
        NbLayoutModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,
        NbAuthModule,
    ],
    declarations: [
        NgxAuthBlockComponent,
        NgxAuthComponent,
        NgxLoginComponent,
    ],
})
export class NgxAuthModule {
}