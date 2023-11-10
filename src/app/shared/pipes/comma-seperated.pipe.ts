import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparated',
})
export class CommaSeparatedPipe implements PipeTransform {
  transform(value: string[]): string {
    if (!value || value.length === 0) {
      return '';
    }

    return value.join(', ');
  }
}
