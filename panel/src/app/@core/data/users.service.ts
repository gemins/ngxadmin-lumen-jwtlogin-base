import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MENU_ITEMS } from '../../pages/pages-menu';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

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
          if (token.isValid()) {
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

  getUser(){
    return new Promise((resolve, reject) => {
      this.apiService.getUser().subscribe(result => resolve(result), error => reject(error));
    });
  }

  setUser(){
    this.user = localStorage.getItem("user") && localStorage.getItem("user") != 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;
    //this.updateMenu();
  }

}
