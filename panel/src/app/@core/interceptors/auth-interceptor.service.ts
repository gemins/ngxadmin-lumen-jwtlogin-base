import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { NB_AUTH_INTERCEPTOR_HEADER, NbAuthJWTToken } from '@nebular/auth';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
                private router: Router,
                private injector: Injector,
                @Inject(NB_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization') {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.getToken()
            .pipe(
                switchMap((token: NbAuthJWTToken) => {
                    if (token && token.getValue()) {
                        request = request.clone({
                            setHeaders: {
                                [this.headerName]: "Bearer " + token.getValue(),
                            },
                        });
                    }
                    return next.handle(request).do((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            // do stuff with response if you want
                        }
                    }, (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) {
                                this.router.navigate(['auth/login']);
                            }
                        }
                    });
                })
            );

        // return this.authService.getToken()
        //     .pipe(
        //         switchMap((token) => {
        //             if (token && token.getValue()) {
        //                 request = request.clone({
        //                     setHeaders: {
        //                         [this.headerName]: "Bearer " + token.getValue(),
        //                     },
        //                 });
        //             }
        //             next.handle(request).do((event: HttpEvent<any>) => {
        //                 if (event instanceof HttpResponse) {
        //                     // do stuff with response if you want
        //                 }
        //             }, (err: any) => {
        //                 if (err instanceof HttpErrorResponse) {
        //                     if (err.status === 401) {
        //                         this.router.navigate(['auth/login']);
        //                     }
        //                 }
        //             });
        //         })
        //     );
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }
}