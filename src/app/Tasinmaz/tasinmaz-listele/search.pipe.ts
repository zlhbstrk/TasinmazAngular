import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class SearchPipe implements PipeTransform {
  transform(tasinmaz: any[], searchInput: string): any[] {
    if (!tasinmaz) {
      return [];
    }
    if (!searchInput) {
      return tasinmaz;
    }
    searchInput = searchInput.toLocaleUpperCase();
    return tasinmaz.filter((x) => {
      return x.toLocaleUpperCase().includes(searchInput);
    });
  }
}
