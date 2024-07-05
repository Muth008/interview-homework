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

    /**
     * Fetches a list of products from the productService and emits the fetched products list
     * through the `productsUpdate` Subject. It returns an Observable.
     */
    getProducts(): Observable<Array<WarehouseProduct>> {
        const productsObservable = this.productService.apiProductListPost();
        productsObservable.subscribe(products => {
        this.productsUpdate.next(products);
        });
        return productsObservable;
    }

    /**
     * Fetches a single product by id from the productService and returns an Observable.
     */
    getProduct(id: number): Observable<WarehouseProduct> {
        return this.productService.apiProductGet(id);
    }

    /**
     * Adds a new product by calling the productService's API.
     * Refreshes the product list upon success 
     */
    addProduct(product: WarehouseProduct): void {
        // Extract not null properties from the product object
        const { name, quantity, price, description, imageUrl, image } = 
            this.commonUtilsService.filterOutNullProperties(product);

        // Convert quantity and price to strings for the API
        const quantityStr = String(quantity);
        const priceStr = String(price);
    
        // Call apiProductPost with the extracted properties
        this.productService
            .apiProductPost(name, quantityStr, priceStr, description, imageUrl, image)
            .subscribe(() => {
                this.refreshProducts();
            });
    }

    /**
     * Updates an existing product by calling the productService's API.
     * Refreshes the product list upon success 
     */
    updateProduct(product: WarehouseProduct): void {
        // Extract not null properties from the product object
        const { id, name, quantity, price, description, imageUrl, image } = 
            this.commonUtilsService.filterOutNullProperties(product);

        // Convert id, quantity and price to strings for the API
        const idStr = String(id);
        const quantityStr = String(quantity);
        const priceStr = String(price);
    
        // Call apiProductPut with the extracted properties
        this.productService
            .apiProductPut(idStr, name, quantityStr, priceStr, description, imageUrl, image)
            .subscribe(() => {
                this.refreshProducts();
            });
    }

    /**
     * Refreshes the product list by calling getProducts
     */
    refreshProducts() {
        this.getProducts();
    }
    
}