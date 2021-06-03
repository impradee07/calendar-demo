import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorGenerator'
})
export class ColorGeneratorPipe implements PipeTransform {

  transform(): string {
    return "#" + ((1<<24)*Math.random() | 0).toString(16);
  }

}
