import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { ApiService } from '../../../@core';
import { UploadOutput} from 'ngx-uploader';

@Component({
  selector: 'vs-picture-uploader',
  styleUrls: ['./pictureUploader.scss'],
  templateUrl: './pictureUploader.html',
})
export class PictureUploader {

  @Input() defaultPicture:string;
  @Input() picture:string = '';

  @Input() position:string = 'center';
  //@Input() uploaderOptions:UploaderOptions;
  @Input() canDelete:boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();
  @Output() onChangePicture = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload:ElementRef;

  public uploadInProgress:boolean;

  constructor(private apiService: ApiService,
              private renderer: Renderer
  ) {
    this.defaultPicture = this.apiService.apiUrl + 'images/system/placeholder.jpg';
  }

  beforeUpload(uploadingFile: UploadOutput): void {
    let files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      // if (!this._canUploadOnServer()) {
      //   uploadingFile.setAbort();
      // } else {
      //   this.uploadInProgress = true;
      // }
    }
  }

  bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  removePicture():boolean {
    this.picture = '';
    return false;
  }

  _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    this.onChangePicture.emit(file);
    reader.readAsDataURL(file);
  }

  _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

}
