/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { getDeepFromObject } from '@nebular/auth/helpers';
import { NbAuthService, NbAuthResult, NB_AUTH_OPTIONS} from '@nebular/auth';
import { SITE_CONF } from '../../../@core/core.constants';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent {
    siteConf:any=SITE_CONF;
    
    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    //socialLinks: NbAuthSocialLink[] = [];
    rememberMe = false;

    constructor(protected service: NbAuthService,
                @Inject(NB_AUTH_OPTIONS) protected options = {},
                protected cd: ChangeDetectorRef,
                protected router: Router) {

        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.strategy = this.getConfigValue('forms.login.strategy');
        //this.socialLinks = this.getConfigValue('forms.login.socialLinks');
        this.rememberMe = this.getConfigValue('forms.login.rememberMe');

        this.service.logout('email').subscribe(result=>{});
    }

    login(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();
            } else {
                this.errors = result["response"] && result["response"].error ? result["response"].error : result.getErrors();
            }

            let response = result.getResponse();
            if(response && response['body'] && response['body']['user'])
                localStorage.setItem("user", JSON.stringify(response['body']['user']));

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

    getConfigValue(key: string): any {
        return getDeepFromObject(this.options, key, null);
    }
}
