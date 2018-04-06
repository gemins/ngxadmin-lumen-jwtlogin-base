import {Component, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserTablesService} from './table.service';
import {PaginationInstance} from 'ngx-pagination';
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
    @ViewChild('renewPlanModal') renewPlanModal:CustomModalComponent;

    asyncDataTable:Observable<string[]>;
    loading:boolean;
    deleting = false;
    renewing = false;
    options = {
        page: 1,
        per_page: 10,
        q: '',
        order: 'desc'
    };
    public config:PaginationInstance = {
        id: 'table',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
    };

    constructor(private service:UserTablesService,
                private router:Router, private route:ActivatedRoute,
                public userService:UserService) {
    }

    ngOnInit() {
        this.getPage(1);
    }

    refreshPage(options) {
        this.options = options;
        this.getPage(this.options.page);
    }

    getPage(page:number, search:any = '') {
        this.loading = true;

        this.options.page = page;
        this.options.q = search;

        this.config.currentPage = page;
        this.config.itemsPerPage = this.options.per_page;

        this.asyncDataTable = this.service.getAllUsers(this.options).then((data) => {
            this.loading = false;
            this.config.totalItems = data.total;
            return data.data;
        });
    }

    public endDayPromotionDay(promoDate) {
        let endTime = new Date(promoDate);
        endTime.setDate(endTime.getDate() + 2);
        let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        let day = endTime.getDay();
        return days[day] + ' ' + endTime.getDate() + '/' + (endTime.getMonth() + 1);
    }

    public calcPromotion(val) {
        return val * 0.70; //- ((val * 1.3) - val);
    }

    public openDataSheet(userPlan) {
        if (userPlan.plan != undefined && userPlan.seller != undefined)
            window.open('assets/files/' + userPlan.plan.data_sheet + userPlan.seller.id + '.pdf', '_blank');
        else
            console.log("cant open PDF");
    }

    public paymentComplete(payment) {
        return payment && payment[0] && payment[0].state == 1;
    }

    editItem(id) {
        this.router.navigate(['../edit', {id: id}], {relativeTo: this.route});
    }

    deleteItem(id) {
        this.deleting = true;
        this.service.destroyUser(id).then((data) => {
            this.getPage(1, '');
            this.deleteModal.hide();
            this.deleting = false;
        }, ()=> {
            this.deleting = false;
            this.deleteModal.hide();
        });
    }
}
