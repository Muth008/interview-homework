import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WarehouseProduct} from "../../../core/models/warehouseProduct";

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  @Input() product: WarehouseProduct
  @Output() editProduct: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }
}
