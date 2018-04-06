import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SITE_URL } from '../../../index';
import { User } from './';
//import { BaAlertsService} from '../../';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    constructor(//@Inject(forwardRef(() => BaAlertsService))
                //private _baAlert: BaAlertsService,
                private http: HttpClient) { }

    serializeParams(obj): URLSearchParams{
        let params: URLSearchParams = new URLSearchParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                params.set(key, obj[key]);
        }
        return params;
    }

    public getAll(options) {
        let serializedForm;
        if(options && typeof options == 'object')
            serializedForm = "?"+this.serializeParams(options);
        return this.http.get(SITE_URL + 'admin/user'+serializedForm)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }

    public getUser():Observable<any> {
        let url = SITE_URL + 'me/data';
        return this.http.get(url)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }

    public getById(id: number) {
        return this.http.get(SITE_URL + 'admin/user/' + id)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }

    public create(user: User) {
        return this.http.post(SITE_URL + 'admin/user', user)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }

    public update(user: User) {
        return this.http.put(SITE_URL + 'admin/user/' + user.id, user)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }

    public clone(id: number) {
        return this.http.get(SITE_URL + 'admin/user/' + id + '/clone')
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }


    public delete(id: number) {
        return this.http.delete(SITE_URL + 'admin/user/' + id)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error.json())
            });
    }
}