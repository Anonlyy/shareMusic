import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'musicTime'
})
export class MusicTimePipe implements PipeTransform {

  transform(value:number,args?: any): any {
    let min,sec,val;
    val = value/1000;
    min =Math.floor(val/60)<10?('0'+Math.floor(val/60)):Math.floor(val/60);
    sec =Math.floor(val-min*60)<10?('0'+Math.floor(val-min*60)):Math.floor(val-min*60);
    return `${min}:${sec}`;
  }

}
