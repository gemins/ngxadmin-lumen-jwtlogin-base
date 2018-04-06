import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../../@core';
import { ModalDirective } from 'ngx-bootstrap';
import 'rxjs/Rx' ;
import * as FileSaver from 'file-saver';

@Component({
    selector: 'search-box',
    templateUrl: './search-box.html',
})
export class SearchBox {
    @ViewChild('customModal') customModal: ModalDirective;
    @Input() baSearch:string = '';
    @Input() show:any = {};
    @Input() baConfPage:any = {
        page: 1,
        per_page: 10,
        q: '',
        order: 'desc'
    };
    @Output() onOptionChange = new EventEmitter<any>();
    @Output() onChangeValue = new EventEmitter<any>();

    list_per_page:any=[10,25,50,100];
    list_order:any=[{value: 'desc', text: 'Más Nuevo'},{value: 'asc', text: 'Más Viejo'}];
    show_export = false;
    show_order = true;
    show_per_page = true;
    msg_error:any;
    msg_success:any;
    exporting=false;

    date_from = {
        year: new Date().getFullYear(),
        month: new Date().getUTCMonth() + 1,
        day: new Date().getDate()
    };

    date_until = {
        year: new Date().getFullYear(),
        month: new Date().getUTCMonth() + 1,
        day: new Date().getDate()
    };
    
    constructor(private apiService:ApiService) {}

    ngOnInit(){
        this.show_export = this.show.export ? this.show.export : false;
        this.show_order = this.show.order ? this.show.order : true;
        this.show_per_page = this.show.per_page ? this.show.per_page : true;
    }
    
    changeOptions(option, value){
        this.baConfPage[option] = value;
        this.onOptionChange.emit(this.baConfPage);
    }

    searching(){
        this.onChangeValue.emit(this.baSearch);
    }

    getOrderText(value){
        if(!value)
            value = "desc";

        for(let order of this.list_order){
            if(value == order.value)
                return order.text;
        }
    }

    //Modal Functions

    exportExcel(){
        let from = this.formatDate(this.date_from);
        let until = this.formatDate(this.date_until);
        this.msg_error = false;
        this.msg_success = false;
        this.exporting = true;
        this.apiService.exportExcel(from, until, 'client').subscribe((response) => {
            this.exporting = false;
            let filename = "client_sheet_"+from+"_"+until+".xlsx";
            FileSaver.saveAs(response, filename);
            this.msg_success = "El archivo " + filename + " se creo satisfactoriamente."
            setTimeout(()=>{
                this.msg_success = false;
            },5000);
        }, (err) => {
            this.exporting = false;
            this.msg_error = err.error;
        })
    }

    public formatDate(date){
        let month = date.month < 10 ? '0'+date.month : date.month;
        let day = date.day < 10 ? '0'+date.day : date.day;
        return date.year+"-"+month+"-"+day;
    }

    public cancel(): void{
        this.msg_error = false;
        this.hide();
    }

    public showModalExport(): void {
        this.customModal.show();
    }

    public hide(): void {
        this.msg_error = false;
        this.customModal.hide();
    }
}