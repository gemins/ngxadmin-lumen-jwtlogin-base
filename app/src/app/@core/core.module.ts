import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SITE_URL } from './core.constants';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { AuthGuard, AuthInterceptor } from './interceptors';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          delay: 3000,
          baseEndpoint: SITE_URL + 'auth',
          login: {
            rememberMe: true,
            endpoint: '/login',
            defaultErrors: ['Username o Password son incorrectos, por favor intenta nuevamente.'],
            defaultMessages: ['Has logueado satisfactoriamente!'],
          },
          logout: {
            endpoint: '/logout',
            method: 'post',
          },
          token: {
            key: 'token'
          }
        },
      },
    },
    forms:{
      login : {
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        }
      },
      logout:{
        redirectDelay: 500,
        provider: 'email',
      }
    }
  }).providers,
  AnalyticsService,
  AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
