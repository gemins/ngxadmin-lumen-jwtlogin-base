import {Injectable} from '@angular/core';
import {ApiService} from '../../../../@core';

@Injectable()
export class DemoTablesService {

    demosTableDataPageSize = 10;

    constructor(private apiService:ApiService) {
        
    }

    getAllDemos(options):any {
        return new Promise((resolve, reject) => {
            this.apiService.getAll(options, 'demo').subscribe(result =>resolve(result), result => reject());
        });
    }

    destroyDemo(id):any {
        return new Promise((resolve, reject) => {
            this.apiService.destroy(id, 'demo').subscribe(result => resolve(result), result => reject());
        });
    }
}
