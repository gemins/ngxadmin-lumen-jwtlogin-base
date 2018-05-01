import {Component, Input, ViewChild} from '@angular/core';
import {ApiService} from '../../../../@core';
import {UserService} from '../../../../@core/data/users.service';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'demo-form',
    styleUrls: ['./pageForm.scss'],
    templateUrl: './pageForm.html'
})
export class DemoForm {
    @Input('group')
    public formGroup:FormGroup;
    public isCreation = false;
    roles:any=[];
    constructor(private _router:Router, private apiService:ApiService, public fb: FormBuilder, public userService:UserService) {
        this.isCreation = this._router.url.indexOf("create") > -1;

        this.apiService.getAll({}, 'role').subscribe(
            (result) => {this.roles = result.data;},
            (error) => {console.log(error);}
        );
    }

    ngOnInit(){}
}
