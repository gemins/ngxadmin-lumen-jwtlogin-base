import {Component, ViewChild, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import 'style-loader!./modal.scss';

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.html'
})
export class CustomModalComponent {
  @ViewChild('customModal') customModal: ModalDirective;
  data:null;
  error:null;
  @Input() baModalConfig={title : "Title", body:"body", buttonOkey: "Aceptar", buttonOkeyColor: "btn-success", buttonOkeyIcon: "ion-checkmark-round"};
  @Input() disabled=false;
  @Output() onOkey = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  constructor () {
  }

  public okey(): void{
    this.onOkey.emit(this.data);
  }

  public cancel(): void{
    this.hide();
    this.onCancel.emit(this.data);
  }

  public setError(string): void{
    console.log("getError: "+ string);
    this.error = string;
  }

  public show(data): void {
    this.data = data;
    this.customModal.show();
  }

  public hide(): void {
    this.error = null;
    this.data = null;
    this.customModal.hide();
  }
}
