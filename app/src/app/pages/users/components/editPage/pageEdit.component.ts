import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, AbstractControl, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../../../@core';
import {User} from '../../../../@core/data/models';

@Component({
    selector: 'user-edit',
    styleUrls: ['./pageEdit.scss'],
    templateUrl: './pageEdit.html'
})

@Input()
export class UserEdit {
    user = new User();
    submitted=false;
    messageError=null;
    id:null;
    public formUser:FormGroup;
    public quotas;

    constructor(private _router:Router,
                private route: ActivatedRoute,
                private apiService:ApiService,
                public fb: FormBuilder) {}

    ngOnInit() {
        this.formUser =  this.fb.group(this.user.createFb());
        let query = this.route.params.subscribe(params => {
            this.id = params['id'];
            if(this.id)
                this.getData(this.id);
            else
                this._router.navigate(['/']);
        });
    }

    getData(id):any {
        return new Promise((resolve, reject) => {
            this.apiService.getById(id, 'user')
                .subscribe(
                    result => {
                        //this.state.notifyDataChanged('menu.activeLink', {title: "Editar Vendedor"});
                        this.user = new User(result);
                        this.formUser = this.fb.group(this.user.createFb());
                        resolve();
                    }, result => {
                        this.messageError = this.apiService.getErrors(result);
                        //rest call error
                        console.log(result);
                    }
                );
        });
    }

    updateData(options):any {
        this.submitted=true;
        if(options['password'] == '')
            delete options['password'];

        return new Promise((resolve, reject) => {
            this.apiService.update(options, 'user')
                .subscribe(
                    result => {
                        resolve(result);
                        this._router.navigate(['../list'], {relativeTo: this.route});
                    }, result => {
                        this.messageError = this.apiService.getErrors(result);
                        this.submitted=false;
                    }
                );
        });
    }

    goBack(){
        this._router.navigate(['../view'], {relativeTo: this.route});
    }
}
