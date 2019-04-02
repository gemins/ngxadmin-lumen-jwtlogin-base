import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class NgxRoleProvider implements NbRoleProvider {

    constructor(private authService: NbAuthService) {
    }

    getRole(): Observable<string> {
        return this.authService.onTokenChange()
            .pipe(
                map((token: NbAuthJWTToken) => {
                    console.log(token.getPayload()['role']);
                    return token.isValid() ? token.getPayload()['role'] : 'Guest';
                })
            )
    }
}