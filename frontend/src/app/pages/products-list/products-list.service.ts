import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/api';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  constructor(private productService: ProductService) { }

  getProducts(): Observable<Array<WarehouseProduct>> {
    return this.productService.apiProductListPost();
  }
  
}