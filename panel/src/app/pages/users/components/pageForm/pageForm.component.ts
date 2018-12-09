import {Component, Input, ViewChild} from '@angular/core';
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

    handleChangeImage(file: File){
        let myReader: FileReader = new FileReader();
        let self = this;
        myReader.onloadend = function (e) {
            let avatarControl = self.formGroup.controls['avatar'];
            let fbImg = {
                type: file.type,
                base64_image: myReader.result
            };
            avatarControl.setValue(fbImg);
        };
        myReader.readAsDataURL(file);
    }
}
