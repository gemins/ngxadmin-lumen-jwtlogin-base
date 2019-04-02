import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, AbstractControl, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../../../@core';
import {Demo} from '../../../../@core/data/models';

@Component({
    selector: 'demo-edit',
    styleUrls: ['./pageEdit.scss'],
    templateUrl: './pageEdit.html'
})

@Input()
export class DemoEdit {
    demo = new Demo();
    submitted=false;
    messageError=null;
    formValid=false;
    id:null;
    public formDemo:FormGroup;

    constructor(private _router:Router,
                private route: ActivatedRoute,
                private apiService:ApiService,
                public fb: FormBuilder) {
        this.formDemo =  this.fb.group(this.demo.createFb());

        const query = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id)
                this.getData(this.id);
            else
                this._router.navigate(['/']);
        });
    }

    ngOnInit() {
    }

    getData(id):any {
        return new Promise((resolve, reject) => {
            this.apiService.getById(id, 'demo')
                .subscribe(
                    result => {
                        this.demo = new Demo(result);
                        this.formDemo = this.fb.group(this.demo.createFb());
                        resolve();
                    }, result => {
                        this.messageError = this.apiService.getErrors(result);
                    }
                );
        });
    }

    updateData(options):any {
        this.submitted=true;
        return new Promise((resolve, reject) => {
            this.apiService.update(options, 'demo')
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

    changeValidForm($event){
        this.formValid = $event;
    }

    goBack(){
        this._router.navigate(['../list'], {relativeTo: this.route});self
    }
}
