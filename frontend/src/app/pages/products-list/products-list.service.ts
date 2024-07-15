import { Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/api';
import { CommonUtilsService } from 'src/app/common/utils/common-utils.service';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';

@Injectable({
    providedIn: 'root'
})
export class ProductsListService {
    products = signal<Array<WarehouseProduct>>([]);

    constructor(
        private productService: ProductService,
        private commonUtilsService: CommonUtilsService
    ) { }

    /**
     * Fetches a list of products from the productService and updates the productsSignal.
     */
    fetchProducts(): Observable<Array<WarehouseProduct>> {
        return this.productService.apiProductListPost()
            .pipe(
                tap(products => this.products.set(products)
            )
        );
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
        this.productService.apiProductPost(name, quantityStr, priceStr, description, imageUrl, image)
            .pipe(
                switchMap(() => this.fetchProducts())
            )
            .subscribe();
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
        this.productService.apiProductPut(idStr, name, quantityStr, priceStr, description, imageUrl, image)
            .pipe(
                switchMap(() => this.fetchProducts())
            )
            .subscribe();
    }


    /**
     * Refreshes the product list by calling fetchProducts
     */
    refreshProducts(): void {
        this.fetchProducts().subscribe();
    }
    
}