import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { ApiService } from '../../../@core';
import { UploadOutput} from 'ngx-uploader';

@Component({
  selector: 'vs-picture-uploader',
  styleUrls: ['./pictureUploader.scss'],
  templateUrl: './pictureUploader.html',
})
export class PictureUploader {

  @Input() defaultPicture: string = '/assets/images/placeholder.jpg';
  @Input() linkBroken: string = '/assets/images/link_broken.jpg';
  @Input() picture:any= '';

  @Input() required: boolean = false;
  
  @Input() disabled: boolean = false;

  @Input() position: string = 'center';

  @Input() urlPath:string = this.apiService.apiUrl;
  
  @Input() config:any = {}; //max_width | max_height | hide_loader | hide_message

  @Input() canDelete: boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();
  @Output() onChangePicture = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload: ElementRef;

  linkIsBroken = false;

  public selectedPicture:any = '/assets/images/placeholder.jpg';
  public uploadInProgress: boolean;

  constructor(private apiService: ApiService,
              private renderer: Renderer)
  {}

  ngOnChanges(){
    this.uploadInProgress = true;
    this.linkIsBroken = false;
    this.getPicture().then((image) => {
      this.uploadInProgress = false;
      this.selectedPicture = image;
      this.uploadInProgress = false;
    }, (err) =>{
      this.linkIsBroken = true;
      this.selectedPicture = err;
      this.uploadInProgress = false;
    });
  }

  getPicture(){
    return new Promise((resolve, reject) => {
      if(this.picture && this.picture != 'null' && this.picture != 'undefined' && this.picture != '' && typeof this.picture == 'string'){
        let image = this.urlPath + this.picture;
        this.validatePicture(image).then((data) => {
          resolve(image);
        }, err=>{
          reject(this.linkBroken);
        });
      }
      else if(typeof this.picture == 'object' && this.picture.base64_image)
        resolve(this.picture.base64_image);
      else{
        resolve(this.defaultPicture);
      }
    });
  }

  validatePicture(url){
    return new Promise((resolve, reject) => {
      let img = new Image;
      img.onerror = function(res){reject();};
      img.onload = function(res) {resolve();};
      img.src = url;
    });
  }

  removePicture(): boolean {
    this.picture = '';
    this.onChangePicture.emit('');
    return false;
  }

  bringFileSelector(): boolean {
    if(!this.disabled){
      this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
      this.uploadInProgress = false;
      return false;
    }
  }

  beforeUpload(uploadingFile: UploadOutput): void {
    if(!this.uploadInProgress) {
      this.uploadInProgress = true;

      const files = this._fileUpload.nativeElement.files;

      if (files.length) {
        const file = files[0];
        this._changePicture(file);
      }
    }
  }

  _changePicture(file: File): void {
    const reader = new FileReader();
    let img = new Image;
    let _this = this;

    img.onload = function() {
      if(_this.config && _this.config.max_width && img.width > _this.config.max_width){
        _this.uploadInProgress = false;
        alert("La imagen cargada supera el maximo de tamaño permitido (Tamaño requerido maximo 16x16)");
      } else if(_this.config && _this.config.max_height && img.height > _this.config.max_height){
        _this.uploadInProgress = false;
        alert("La imagen cargada supera el maximo de tamaño permitido (Tamaño requerido maximo 16x16)");
      } else{
        _this.onChangePicture.emit(file);
        _this.uploadInProgress = false;
      }
    };

    reader.addEventListener('load', (event: Event) => {
      img.src = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  _onUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  _onUploadCompleted(data): void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

}
