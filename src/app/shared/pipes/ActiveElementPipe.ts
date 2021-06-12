import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'activeElement'})
export class ActiveElementPipe implements PipeTransform {
  transform(value: any): any {
    if (value === true) {
      return `✅`;
    } else if (value === false) {
      return `❌`;
    } else {
      return value;
    }
  }
}
