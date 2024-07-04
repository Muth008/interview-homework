import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListProductComponent} from "./list-product/list-product.component";
import {Observable, of, take} from "rxjs";
import {WarehouseProduct} from "../../core/models/warehouseProduct";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './edit-product-modal/edit-product.component';
import { ProductsListService } from './products-list.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ListProductComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent  {
  products$: Observable<WarehouseProduct[]> = this.productListService.productsUpdate.asObservable();

  constructor(
    private productListService: ProductsListService,
    private modalService: NgbModal
  ) {
    this.productListService.refreshProducts();
  }

  editProduct(id: number): void {
    this.products$.pipe(take(1)).subscribe(products => {
      const product = products.find(product => product.id === id);
      if (product) {
        this.openProductModal(product);
      }
    });
  }

  addProduct(): void {
    this.openProductModal()
  }

  openProductModal(product?: WarehouseProduct): void {
    const modalRef = this.modalService.open(EditProductComponent);

    if (product) {
      modalRef.componentInstance.product = product;
    }
    
    modalRef.result.then((result) => {
      if (result && result.id) {
        this.productListService.updateProduct(result);
      } else if (result) {
        this.productListService.addProduct(result);
      }
    }, () => {
      console.log('Modal dismissed');
    });
  }
}
