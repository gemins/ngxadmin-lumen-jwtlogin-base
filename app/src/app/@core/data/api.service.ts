import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SITE_URL } from '../core.constants';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class ApiService {
    where = {
        user : "admin/user",
        role : "admin/role",
    };

    apiUrl = SITE_URL;
    
    constructor(private http: HttpClient, private _sanitizer:DomSanitizer) { }

    serializeParams(obj): URLSearchParams{
        let params: URLSearchParams = new URLSearchParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                params.set(key, obj[key]);
        }
        return params;
    }
    
    private getUrlWhere(where){
        let url = this.where[where];
        if (url == undefined)
            url = where;
        return url
    }

    public getAll(options, where) {
        let serializedForm;
        if(options && typeof options == 'object')
            serializedForm = "?"+this.serializeParams(options);
        
        let url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + url + serializedForm)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    public getById(id: number, where) {
        let url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + url + '/' + id)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    public create(obj:any, where) {
        let url = this.getUrlWhere(where);
        return this.http.post(SITE_URL + url, obj)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    public update(obj:any, where) {
        let url = this.getUrlWhere(where);
        return this.http.put(SITE_URL + url + '/' + obj.id, obj)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    public clone(id: number, where) {
        let url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + url + '/' + id + '/clone')
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    public renew(id: number, where) {
        let url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + url + '/' + id + '/renew')
            .catch((error:any) => {
                return Observable.throw(error)
            });
    }


    public delete(id: number, where) {
        let url = this.getUrlWhere(where);
        return this.http.delete(SITE_URL + url + '/' + id)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    public destroy(id: number, where) {
        let url = this.getUrlWhere(where);
        return this.http.delete(SITE_URL + url + '/' + id + '/destroy')
            .catch((error:any) => {
                return Observable.throw(error)
            });
    }

    public exportExcel(date_from, date_until, where) {
        return this.http.post(SITE_URL + this.where[where] + '/export', {from_date: date_from, until_date : date_until}, { responseType: 'blob' })
            //.map(res => res.blob())
            .catch((error:any) => {
                let fileAsTextObservable = new Observable<string>(observer => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        let responseText = (<any>e.target).result;

                        observer.next(responseText);
                        observer.complete();
                    };
                    const errMsg = reader.readAsText(error.blob(), 'utf-8');
                });

                return fileAsTextObservable
                    .switchMap(errMsgJsonAsText => {
                        return Observable.throw(JSON.parse(errMsgJsonAsText));
                    });
            });
    }

    public getUser():Observable<any> {
        let url = SITE_URL + 'me/data';
        return this.http.get(url)
            .catch((error:any) => {
                //this._baAlert.handlerErrorMsg(error);
                return Observable.throw(error)
            });
    }

    //functions
    public getErrors(err){
        //rest call error
        let messageError = '<strong>Se encontraron los siguientes errores</strong>:</br><ul style="margin-top: 5px;">';
        let res = typeof err.json === 'function' ? err.error.json() : err.error;
        if(typeof res == "object"){
            for (var v in res) {
                if(res[v] instanceof Array){
                    for (var r in res[v]) {
                        messageError += '<li>' + res[v][r] + '</li>';
                    }
                }else{
                    messageError += '<li>' + res[v] + '</li>';
                }

            }
            messageError += '</ul>';
        }else{
            messageError = '<strong>Ocurrio un error interno, comuniquese con el administador</strong>';
        }
        return this._sanitizer.bypassSecurityTrustHtml(messageError);
    }
}