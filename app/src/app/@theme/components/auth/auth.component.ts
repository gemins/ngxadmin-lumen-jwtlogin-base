/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '@nebular/auth'; //'../services/auth.service';

@Component({
    selector: 'ngx-auth',
    styleUrls: ['./auth.component.scss'],
    template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <div class="flex-centered col-xl-4 col-lg-6 col-md-8 col-sm-12">
              <router-outlet></router-outlet>
            </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NgxAuthComponent implements OnDestroy {

    subscription: any;

    authenticated: boolean = false;
    token: string = '';

    // showcase of how to use the onAuthenticationChange method
    constructor(protected auth: NbAuthService) {
        this.subscription = auth.onAuthenticationChange()
            .subscribe((authenticated: boolean) => {
                this.authenticated = authenticated;
            });
    }

    ngOnDestroy(): void {
        console.log(this.subscription);
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}