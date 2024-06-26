import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WarehouseItem} from "../../../core/models/warehouseItem";

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item: WarehouseItem
  @Output() addToShipment: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }
}
