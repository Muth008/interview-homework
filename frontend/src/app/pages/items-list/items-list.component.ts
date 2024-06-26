import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListItemComponent} from "./list-item/list-item.component";
import {Observable, of} from "rxjs";
import {WarehouseItem} from "../../core/models/warehouseItem";
import {ItemsMockService} from "./items.mock.service";

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent  {
  items$: Observable<WarehouseItem[]> = this.itemsMockService.items

  constructor(private itemsMockService: ItemsMockService) { }

  addItemToShipment(id: number): void {
    this.itemsMockService.addToShipment(id)
  }
}
