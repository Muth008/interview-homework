import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ProductService } from 'src/app/api';
import { CommonUtilsService } from 'src/app/common/utils/common-utils.service';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  public productsUpdate = new BehaviorSubject<Array<WarehouseProduct>>([]);

  constructor(
    private productService: ProductService,
    private commonUtilsService: CommonUtilsService
  ) { }

  getProducts(): Observable<Array<WarehouseProduct>> {
    const productsObservable = this.productService.apiProductListPost();
    productsObservable.subscribe(products => {
      this.productsUpdate.next(products);
    });
    return productsObservable;
  }

  getProduct(id: number): Observable<WarehouseProduct> {
    return this.productService.apiProductGet(id);
  }

  addProduct(product: WarehouseProduct): void {
    // Extract not null properties from the product object
    const { name, quantity, price, description, imageUrl, image } = this.commonUtilsService.filterOutNullProperties(product);

    // Convert quantity and price to strings for the API
    const quantityStr = String(quantity);
    const priceStr = String(price);
  
    // Call apiProductPost with the extracted properties
    this.productService.apiProductPost(name, quantityStr, priceStr, description, imageUrl, image).subscribe(() => {
      this.refreshProducts();
    });
  }

  updateProduct(product: WarehouseProduct): void {
    // Extract not null properties from the product object
    const { id, name, quantity, price, description, imageUrl, image } = this.commonUtilsService.filterOutNullProperties(product);

    // Convert id, quantity and price to strings for the API
    const idStr = String(id);
    const quantityStr = String(quantity);
    const priceStr = String(price);
  
    // Call apiProductPut with the extracted properties
    this.productService.apiProductPut(idStr, name, quantityStr, priceStr, description, imageUrl, image).subscribe(() => {
      this.refreshProducts();
    });
  }

  refreshProducts() {
    this.getProducts();
  }
  
}