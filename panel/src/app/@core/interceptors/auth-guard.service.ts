import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated()
            .pipe(
                tap(authenticated => {
                    if (!authenticated)
                        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url }});
                })
            );
    }
}