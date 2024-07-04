import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor() { }

  //filter out all null properties of object
  filterOutNullProperties(obj: any): any {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

}
