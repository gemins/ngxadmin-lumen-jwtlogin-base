import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../../@core';

declare var jQuery:any;
declare var $ :any;

import 'style-loader!./select2component.scss';


@Component({
    selector: 'select2-component',
    templateUrl: './select2-component.html'
})
export class Select2Component {
    @Input() id:string = 'select2';
    @Input() service;
    @Input() defaultValue:any= {id: -1, text: "Buscar..."};
    @Input() elementData = "data";
    @Input() disabled = "";
    @Input() firstSearchAll = false;
    @Output() onChangeValue = new EventEmitter<any>();
    public emptyValue = [{id: -1, text: '', selected: 'selected', search: '', hidden: true}];
    elemSelect;

    constructor(private _elementRef:ElementRef, public apiService : ApiService) {
    }

    ngOnChanges() {
        if (this.defaultValue && this.defaultValue.id){
            let data = [this.defaultValue];
            this.createSelect2(data);
        }
    }

    ngAfterViewInit() {
        let data = [this.defaultValue];

        if(this.defaultValue.id == undefined)
            data = this.emptyValue;

        this.createSelect2(data);
    }

    clearSelect(){
        let self = this;
        this.elemSelect = this._elementRef.nativeElement.querySelector('#' + this.id);
        jQuery(this.elemSelect).val(-1).trigger("change");
    }

    createSelect2(data) {
        let self = this;
        this.elemSelect = this._elementRef.nativeElement.querySelector('#' + this.id);
        jQuery(this.elemSelect).select2({
            ajax: {
                transport:<any> function(params, success, failure){
                    let options = {
                        q: params.data.term,
                        where: self.elementData
                    };
                    new Promise((resolve, reject) => {
                        self.apiService.getAll(options, self.service)
                            .subscribe(
                                result => {
                                    success(result);
                                    resolve(result);
                                }, result => {
                                    //failure(result);
                                    console.log("error success");
                                }
                            );
                    });
                },
                delay: 250,
                processResults: function (data:any, params:any) {
                    return {
                        results: data[self.elementData].map(function (item) {
                                return item;
                            }
                        )
                    };
                }
            },
            width: '100%',
            data: data,
            placeholder: {
                id: -1,
                text: "Buscar..."
            },
            minimumInputLength: 1
        }).on('select2:select', function (evt) {
            let newData = jQuery(self.elemSelect).select2('data')[0];
            self.onChangeValue.emit(newData);
        });

        if (self.defaultValue.id && self.defaultValue.id != undefined)
            jQuery(self.elemSelect).val(self.defaultValue.id).trigger("change");
        //$(self.elemSelect).val(self.defaultValue.id, [self.defaultValue], true).trigger("change");
    }

}