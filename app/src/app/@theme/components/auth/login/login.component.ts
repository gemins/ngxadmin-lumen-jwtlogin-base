/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { NbAuthService, NbAuthResult, NB_AUTH_OPTIONS_TOKEN} from '@nebular/auth';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.html',
})
export class NgxLoginComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    //socialLinks: NbAuthSocialLink = [];

    constructor(protected service: NbAuthService,
                @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
                protected router: Router) {

        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.provider = this.getConfigValue('forms.login.provider');
        this.service.logout('email').subscribe(result=>{});
        //this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    }

    login(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
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
        });
    }

    getConfigValue(key: string): any {
        return getDeepFromObject(this.config, key, null);
    }
}
