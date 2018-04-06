import { Component, ViewChild, Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'contacts-component',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {


  @Input() model:any = [];
  @Input() format = {"data":"", "info" : ""};
  @Output() onChange = new EventEmitter<any>();

  constructor() {

  }

  
  addItem() {
    console.log("addItem");
    let contact = this.model;
    console.log(contact);
    let data = contact.push(this.format);
    console.log(data);
    this.onChange.emit(data);
    console.log("onChange emit");
  }

  removeItem(index) {
    let contact = this.model;
    let data = contact.splice(index, 1);
    this.onChange.emit(data);
  }
}
