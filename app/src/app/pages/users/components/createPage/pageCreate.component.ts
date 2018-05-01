import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import {ApiService} from '../../../../@core';
import {User} from '../../../../@core/data/models';

@Component({
    selector: 'user-create',
    styleUrls: ['./pageCreate.scss'],
    templateUrl: './pageCreate.html'
})
export class UserCreate {
    user = new User();
    template = 0;
    id_user_clone = false;
    submitted=false;
    messageError=null;
    id:null;
    public formUser:FormGroup;
    public quotas;

    constructor(private _router:Router, 
                private route: ActivatedRoute, 
                private apiService:ApiService, 
                public fb: FormBuilder) {
    }

    ngOnInit() {
        this.formUser =  this.fb.group(this.user.createFb());
    }

    createData(options):any {
        if(options.password != options.confirmation_password)
            this.messageError = "Los passwords no coinciden";
        else{
            this.submitted = true;
            return new Promise((resolve, reject) => {
                this.apiService.create(options, 'user')
                    .subscribe(
                        result => {
                            resolve(result);
                            this._router.navigate(['../list'], {relativeTo: this.route});
                        }, result => {
                            this.messageError = this.apiService.getErrors(result);
                            this.submitted = false;
                        }
                    );
            });
        }
    }

    goBack(){
        this._router.navigate(['../view'], {relativeTo: this.route});
    }
}
