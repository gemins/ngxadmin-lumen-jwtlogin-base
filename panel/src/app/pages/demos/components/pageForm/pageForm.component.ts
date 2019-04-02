import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../../../@core';
import {UserService} from '../../../../@core/data/users.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'demo-form',
    styleUrls: ['./pageForm.scss'],
    templateUrl: './pageForm.html'
})
export class DemoForm {
    @Input() spinner = false;
    @Output() invalidForm = new EventEmitter<any>();
    @Input('group')
    public formGroup:FormGroup;
    public isCreation = false;
    roles:any=[];
    constructor(private _router:Router, private apiService:ApiService, public fb: FormBuilder, public userService:UserService) {
        this.isCreation = this._router.url.indexOf("create") > -1;
    }

    ngOnInit(){}

    fileChange(event) {
        const fileList: FileList = event.target.files;
        const myReader: FileReader = new FileReader();
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const self = this;
            myReader.onloadend = function (e) {
                const dsControl = self.formGroup.controls['data_sheet'];
                const fbFile = {
                    name: file.name,
                    type: file.type,
                    base64_file: myReader.result,
                };
                dsControl.setValue(fbFile);
            };
            myReader.readAsDataURL(file);
        }
    }

    handleChangeImage(file: File, where: string){
        let myReader: FileReader = new FileReader();
        let self = this;
        myReader.onloadend = function (e) {
            let imageControl = self.formGroup.controls[where];
            let fbImg = {
                type: file.type,
                base64_image: myReader.result
            };
            imageControl.setValue(fbImg);
        };
        myReader.readAsDataURL(file);
    }

    changeSelect2Data(where, data, attr=null){
        const item = this.formGroup.controls[where];
        if(attr)
            item.setValue(data[attr]);
        else
            item.setValue(data);
    }
}
