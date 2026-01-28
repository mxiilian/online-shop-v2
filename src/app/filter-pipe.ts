import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchString: string, price: number): any[] {
    if (!products) return [];
    if (!searchString && price === 0) return products;
    if (searchString && price === 0) {
      searchString = searchString.toLowerCase();
      return products.filter(p => {
        return p.name.toLowerCase().includes(searchString);
    });
    }
    searchString = searchString.toLowerCase();
    return products.filter(p => {
      return p.name.toLowerCase().includes(searchString) && p.price <= price;
    });
  }

}
