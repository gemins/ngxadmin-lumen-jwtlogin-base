import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ApiService } from './api.service';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Injectable()
export class UserService {

    user: any = null;

    private userArray: any[];

    constructor(
        private apiService: ApiService,
        private authService: NbAuthService
    ) {
        this.setUser();
        this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                if (token && token.getValue()) {
                    this.getUser().then(
                        (data: any) => {
                            this.user = data;
                            localStorage.setItem("user", JSON.stringify(data));
                            this.setUser();
                        },
                        (err: any) => {}
                    );
                }
            });
    }

    isAdmin(){
        return this.user && this.user.role && this.user.role["name"] == "Root";
    }

    isProvider(){
        return this.user && this.user.role && this.user.role["name"] == "Provider";
    }

    getUser(){
        return new Promise((resolve, reject) => {
            this.apiService.getUser().subscribe(result => resolve(result), error => reject(error));
        });
    }

    setUser(){
        this.user = localStorage.getItem("user") && localStorage.getItem("user") != 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;
        this.updateMenu();
    }

    updateMenu(){
        for (let menu of MENU_ITEMS){
            if (menu['admin'] && !this.isAdmin())
                menu.hidden = true;

            if(menu['admin'] && this.isAdmin())
                menu.hidden = false;

            if (menu['owner'] && this.isProvider())
                menu.hidden = true;
        }
    }
}
