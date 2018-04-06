import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class User {
    id: number;
    user_id: number;
    type: number;
    first_name: string;
    last_name: string;
    birthday: string;
    gender: string;
    email: string;
    avantar: string;
    password: string;
    role: string;
    confirmation_password: string;
    createdAt: string;
    updatedAt: string;
    _fb;
    constructor(obj: any = {}) {
        for (var key in obj) this[key] = obj[key];
    }

    public createFb(){
        this._fb = new FormBuilder();

        return {
            id: [this.id || ''],
            type: [this.type || 3, <any>Validators.required],
            first_name: [this.first_name || '', <any>Validators.required],
            last_name: [this.last_name || '', <any>Validators.required],
            avantar: [this.avantar || '', <any>Validators.required],
            gender: [this.gender || ''],
            birthday: [this.birthday || ''],
            role: [this.role || ''],
            email: [this.email || '', <any>Validators.required],
            password: [this.password || '', Validators.minLength(8)],
            confirmation_password: [''],
        };
    }
}
