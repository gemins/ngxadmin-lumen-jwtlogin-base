import {Component, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserTablesService} from './table.service';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../../../../@core';
import {UserService} from '../../../../@core/data/users.service';
import {CustomModalComponent} from '../../../../@theme/components';


@Component({
    selector: 'user-tables',
    templateUrl: './table.html',
    styleUrls: ['./table.scss'],
})
export class UserTables {
    @ViewChild('deleteModal') deleteModal:CustomModalComponent;
    @ViewChild('cloneModal') cloneModal: CustomModalComponent;

    asyncDataTable:Observable<string[]>;
    loading:boolean;
    deleting = false;
    cloning = false;
    loadingData = true;
    options = {
        page: 1,
        per_page: 10,
        q: '',
        order: 'desc'
    };
    public config = {
        id: 'table',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
    };

    filters = {};

    constructor(private service:UserTablesService,
                private router:Router, private route:ActivatedRoute,
                private apiService:ApiService,
                public userService:UserService) {
    }

    ngOnInit() {
        this.getPage(1);
    }

    refreshPage(options) {
        if(options)
            this.options = options;
        this.getPage(this.options.page);
    }

    getPage(page:number, search:any = '') {
        this.loading = true;
        this.loadingData = true;

        this.options.page = page;
        this.options.q = search;

        let search_options = {};
        Object.assign(search_options,this.options);
        Object.assign(search_options,this.filters);

        this.asyncDataTable = this.service.getAllUsers(search_options).then((data) => {
            this.loading = false;
            this.config.totalItems = data.total;
            this.loadingData = false;
            return data.data;
        });
    }

    clearFilter(){
        this.filters = {};
        this.options.q = "";
        this.getPage(1);
    }

    editItem(id) {
        this.router.navigate(['../edit', {id: id}], {relativeTo: this.route});
    }

    cloneItem(id){
        this.cloning = true;
        return new Promise((resolve, reject) => {
            this.apiService.clone(id, 'demo')
                .subscribe(
                    result => {
                        this.getPage(this.config.currentPage);
                        this.cloning=false;
                        this.cloneModal.hide();
                        resolve();
                    }, result => {
                        this.cloneModal.hide();
                        this.cloning=false;
                    }
                );
        });
    }

    deleteItem(id){
        this.deleting = true;
        return new Promise((resolve, reject) => {
            this.apiService.delete(id, 'demo')
                .subscribe(
                    result => {
                        this.deleteModal.hide();
                        this.getPage(this.config.currentPage);
                        this.deleting=false;
                        resolve();
                    }, result => {
                        this.deleteModal.setError(result);
                        //rest call error
                        this.deleting=false;
                    }
                );
        });
    }
}
