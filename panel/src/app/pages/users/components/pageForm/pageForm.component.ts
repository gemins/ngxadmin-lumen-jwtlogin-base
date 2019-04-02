import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../../../@core';
import {UserService} from '../../../../@core/data/users.service';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'user-form',
    styleUrls: ['./pageForm.scss'],
    templateUrl: './pageForm.html'
})
export class UserForm {
    @Input() spinner = false;
    @Output() invalidForm = new EventEmitter<any>();
    @Input('group')
    public formGroup:FormGroup;
    public isCreation = false;
    roles:any=[];
    constructor(private _router:Router, private apiService:ApiService, public fb: FormBuilder, public userService:UserService) {
        this.isCreation = this._router.url.indexOf("create") > -1;

        this.apiService.getAll({}, 'role').subscribe(
            (result) => {this.roles = result['data'];},
            (error) => {console.log(error);}
        );        
    }

    ngOnInit(){
    }

    public defaultPicture = 'assets/img/theme/no-photo.png';
    
    changeValue(where, attr, values){
        this.formGroup.controls[where].setValue(values[attr]);
    }

    handleChangeImage(file: File, where: string){
        if(file){
            const myReader: FileReader = new FileReader();
            const _this = this;
            myReader.onloadend = function (e) {
                const imageControl = _this.formGroup.controls[where];
                const fbImg = {
                    type: file.type,
                    base64_image: myReader.result,
                };
                imageControl.setValue(fbImg);
            };
            myReader.readAsDataURL(file);
        }else{
            const imageControl = this.formGroup.controls[where].setValue("");
        }
    }
}
