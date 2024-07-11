import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    console.log(searchText);
    

    return items.filter((item:any) => (item.idNumber == searchText || 
      item.applicantName.toLowerCase() == searchText || item.pincode == searchText 
    ));
  }

}