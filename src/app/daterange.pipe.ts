import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {
  transform(items: any[], fromDate: Date, toDate: Date): any[] {
    if (!items || !fromDate || !toDate) {
      return items;
    }
    fromDate = new Date(fromDate);
    toDate = new Date(toDate);
    
    return items.filter(item => {
      const itemDate = new Date(item.dateOfApplication); 
      return itemDate >= fromDate && itemDate <= toDate;
    });
  }
}