import { Pipe, PipeTransform} from '@angular/core';
import { Observable, Subscriber} from 'rxjs/Rx';

@Pipe({name: 'countdown'})

export class CountDownPipe implements PipeTransform {
  /*
    Takes a value and makes it lowercase.
   */
  transform(elemTime, args) {
    if (!elemTime) {
      return;
    }

    /* FIX TO CREATE DATE ON INTERNET EXPLORER */
    let dateSplit = elemTime.split("-");
    let dateSplitFix = dateSplit[2].split(" ");
    dateSplit[2] = dateSplitFix[0];
    let timeSplit = dateSplitFix[1].split(":");
    let endTime = new Date(dateSplit[0],dateSplit[1] - 1,dateSplit[2],timeSplit[0],timeSplit[1],timeSplit[2]);
    /*END FIX*/

    let limit:number=48;
    if(args && args > 0)
      limit = parseInt(args);

    endTime.setHours(endTime.getHours() + limit);
    endTime.setHours(endTime.getHours() - (endTime.getTimezoneOffset() / 60));

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    let nowSeconds:any=false, nowMinutes:any=false, nowDays:any=false, nowHour:any=false;
    
    return new Observable<string>((observer: Subscriber<string>) => {
      let intTime = setInterval(() => {
        let nowTime = new Date();
        let diffTime:any = endTime.getTime() - nowTime.getTime();
        nowSeconds = Math.floor((diffTime % _minute) / _second);
        nowMinutes = Math.floor((diffTime % _hour) / _minute);
        nowDays = Math.floor(diffTime / _day);
        nowHour = Math.floor(((diffTime % _day) / _hour) + (nowDays * 24));
        if(diffTime <= 0){
          diffTime = false;
          clearInterval(intTime);
        }
        
        // if(args){
        //   switch(args){
        //     case 'd':
        //       observer.next(diffTime ? nowDays: diffTime);
        //       break;
        //     case 'h':
        //       observer.next(diffTime ? nowHour: diffTime);
        //       break;
        //     case 'm':
        //       observer.next(diffTime ? nowMinutes: diffTime);
        //       break;
        //     case 's':
        //       observer.next(diffTime ? nowSeconds: diffTime);
        //       break;
        //   }
        // }else
        observer.next(diffTime ? nowHour + 'hs ' + nowMinutes + 'min ' + nowSeconds + 'seg': "Tiempo Expirado");

      }, 1000);
    });
  }
}
