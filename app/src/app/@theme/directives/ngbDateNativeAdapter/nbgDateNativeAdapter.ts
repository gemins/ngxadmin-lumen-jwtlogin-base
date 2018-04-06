import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a Native Date adapter
 */
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

    fromModel(date: any): NgbDateStruct {
        let formatDate:any = date ? new Date(date) : null;

        if(formatDate == 'Invalid Date')
            formatDate = null;

        return formatDate ? {year: formatDate.getFullYear(), month: formatDate.getMonth() + 1, day: formatDate.getDate()} : null;
    }

    toModel(date: NgbDateStruct): any {
        if(date){
            let month = date.month < 10 ? '0'+date.month : date.month;
            let day = date.day < 10 ? '0'+date.day : date.day;
            return date.year+'-'+month+'-'+day+' 00:00:00';
        }else
            return null;
    }
}