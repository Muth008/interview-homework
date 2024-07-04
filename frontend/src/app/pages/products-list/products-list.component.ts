import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListProductComponent} from "./list-product/list-product.component";
import {Observable, of} from "rxjs";
import {WarehouseProduct} from "../../core/models/warehouseProduct";
import { ProductsListService } from './products-list.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ListProductComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent  {
  products$: Observable<WarehouseProduct[]> = this.productListService.getProducts();

  constructor(
    private productListService: ProductsListService,
  ) { }

  editProduct(id: number): void {
  }

  addProduct(): void {
  }

}
