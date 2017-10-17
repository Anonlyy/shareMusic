import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createTime'
})
export class CreateTimePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let unixTimestamp = new Date(value);
    let date = unixTimestamp.getFullYear()+'.'+(unixTimestamp.getMonth()+1)+'.'+unixTimestamp.getDate();
    return date;
  }
}
