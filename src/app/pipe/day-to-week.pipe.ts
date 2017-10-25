import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayToWeek'
})
export class DayToWeekPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let week:string[] = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
    return week[value];
  }

}
