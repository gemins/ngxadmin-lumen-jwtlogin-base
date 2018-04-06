import {Component, Input, Output, EventEmitter} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import 'style-loader!./pagination.scss';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination.html'
})
export class PaginationComponent {
  @Input() config:PaginationInstance = {
    id: 'table',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  @Output() pageChange = new EventEmitter<any>();

  constructor () {
  }
}
