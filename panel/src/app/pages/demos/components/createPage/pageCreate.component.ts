import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import {ApiService} from '../../../../@core';
import {Demo} from '../../../../@core/data/models';

@Component({
    selector: 'demo-create',
    styleUrls: ['./pageCreate.scss'],
    templateUrl: './pageCreate.html'
})
export class DemoCreate {
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
    }

    ngOnInit() {
        this.formDemo =  this.fb.group(this.demo.createFb());
    }

    createData(options):any {
        this.submitted = true;
        return new Promise((resolve, reject) => {
            this.apiService.create(options, 'demo')
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

    changeValidForm($event){
        this.formValid = $event;
    }
    
    goBack(){
        this._router.navigate(['../list'], {relativeTo: this.route});self
    }
}
