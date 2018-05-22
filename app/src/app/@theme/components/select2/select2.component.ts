import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../../@core';

declare var jQuery: any;
declare var $: any;

import 'style-loader!./select2component.scss';


@Component({
    selector: 'select2-component',
    templateUrl: './select2-component.html',
})
export class Select2Component {
    @Input() id: string = 'select2';
    @Input() service;
    @Input() multiple=false;
    @Input() defaultValue: any= {id: -1, text: 'Buscar...'};
    @Input() elementData = 'data';
    @Input() invalid = false;
    @Input() disabled = '';
    @Input() firstSearchAll = false;
    @Output() onChangeValue = new EventEmitter<any>();
    public emptyValue = [{id: -1, text: '', selected: 'selected', search: '', hidden: true}];
    elemSelect;

    constructor(private _elementRef: ElementRef, public apiService: ApiService) {
    }

    ngOnChanges() {
        if (!this.multiple && this.defaultValue && this.defaultValue.id){
            const data = [this.defaultValue];
            this.createSelect2(data);
        }else if (this.multiple && this.defaultValue){
            const data = this.defaultValue;
            this.createSelect2(data);
        }
    }

    ngAfterViewInit() {
        let data = [this.defaultValue];

        if (!this.multiple && this.defaultValue.id == undefined)
            data = this.emptyValue;

        if (this.multiple)
            data = this.defaultValue;

        this.createSelect2(data);
    }

    clearSelect(){
        const self = this;
        this.elemSelect = this._elementRef.nativeElement.querySelector('#' + this.id);
        jQuery(this.elemSelect).val(-1).trigger('change');
    }

    createSelect2(data) {
        const self = this;
        this.elemSelect = this._elementRef.nativeElement.querySelector('#' + this.id);
        jQuery(this.elemSelect).select2({
            ajax: {
                transport: <any> function(params, success, failure){
                    const options = {
                        q: params.data.term,
                        where: self.elementData,
                        per_page: 50
                    };
                    new Promise((resolve, reject) => {
                        self.apiService.getAll(options, self.service)
                            .subscribe(
                                result => {
                                    success(result);
                                    resolve(result);
                                }, result => {
                                    //failure(result);
                                    console.log('error success');
                                }
                            );
                    });
                },
                delay: 250,
                processResults: function (data: any, params: any) {
                    return {
                        results: data[self.elementData].map(function (item) {
                                return item;
                            }
                        ),
                    };
                },
            },
            width: '100%',
            data: data,
            placeholder: {
                id: -1,
                text: 'Buscar...',
            },
            minimumInputLength: 1,
        }).on('select2:select', function (evt) {
            let newData = jQuery(self.elemSelect).select2('data')[0];

            if(self.multiple)
                newData = jQuery(self.elemSelect).select2('data');

            self.onChangeValue.emit(newData);
        }).on('select2:unselect', function (evt) {
            let newData = jQuery(self.elemSelect).select2('data')[0];

            if(self.multiple)
                newData = jQuery(self.elemSelect).select2('data');

            self.onChangeValue.emit(newData);
        });


        if (!self.multiple && self.defaultValue && self.defaultValue.id && self.defaultValue.id != undefined) {
            jQuery(self.elemSelect).val(self.defaultValue.id).trigger('change');
        }else if(self.multiple && self.defaultValue[0] && self.defaultValue[0].id != undefined) {
            var selectedValues = self.parseUrls(self.defaultValue);
            jQuery(self.elemSelect).val(selectedValues).trigger('change');
        }
    }

    parseUrls(urls){
        var selectedValues = [];
        for (let url of urls){
            url.text = url.url;
            selectedValues.push(url.id);
        }
        return selectedValues;
    }

}