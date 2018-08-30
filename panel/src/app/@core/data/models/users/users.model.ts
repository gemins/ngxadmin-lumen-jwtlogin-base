import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class User {
    id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    gender: string;
    email: string;
    avatar: string;
    password: string;
    confirmation_password: string;
    role:string;
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
            first_name: [this.first_name || '', <any>Validators.required],
            last_name: [this.last_name || ''],
            birthday: [this.birthday || ''],
            gender: [this.gender || ''],
            email: [this.email || '', <any>Validators.required],
            password: [this.password || '', Validators.minLength(8)],
            confirmation_password: [this.confirmation_password || ''],
            avatar: [this.avatar || ''],
            role: [this.role || 0]
        };
    }
}
