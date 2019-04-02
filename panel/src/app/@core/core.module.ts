import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { AuthGuard, AuthInterceptor } from './interceptors';
import { NgxRoleProvider } from '../auth/role.provider';
import { SITE_URL } from './core.constants';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: SITE_URL + 'v1/auth',
        login: {
          endpoint: '/login',
          defaultErrors: ['Username o Password son incorrectos, por favor intenta nuevamente.'],
          defaultMessages: ['Has logueado satisfactoriamente!'],
        },
        logout: {
          endpoint: '/logout',
          method: 'post',
        },
        token: {
          class: NbAuthJWTToken,
          key: 'token'
        }
      }),
    ],
    forms: {
      login: {
        rememberMe: true,
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'taster',
        view: '*',
        create: '*',
        edit: '*',
      },
      admin: {
        parent: 'user',
        clone: '*',
        remove: '*',
      },
      root: {
        parent: 'admin',
        clone: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NgxRoleProvider,
  },
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
