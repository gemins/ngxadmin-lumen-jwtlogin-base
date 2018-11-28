import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    NbAuthComponent,
    NbLoginComponent,
    NbLogoutComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
} from '@nebular/auth';

import { NgxAuthComponent, NgxLoginComponent } from './components';

export const routes: Routes = [
    {
        path: '',
        component: NgxAuthComponent,
        children: [
            {
                path: '',
                component: NgxLoginComponent,
            },
            {
                path: 'login',
                component: NgxLoginComponent,
            },
            {
                path: 'register',
                component: NbRegisterComponent,
            },
            {
                path: 'logout',
                component: NbLogoutComponent,
            },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NbResetPasswordComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}