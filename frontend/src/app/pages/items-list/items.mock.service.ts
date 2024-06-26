import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {WarehouseItem} from "../../core/models/warehouseItem";

@Injectable({
  providedIn: 'root'
})
export class ItemsMockService {
  #mockedItems = [{
    id: 1,
    imageUrl: 'assets/logo_black.svg',
    name: 'CloudTalk logo sticker',
    description: 'High-quality sticker of the best cloud calling solution provider in  the world',
    quantity: 100,
    unitPrice: 1
  }]

  constructor() { }

  get items(): Observable<WarehouseItem[]> {
    return of(this.#mockedItems)
  }

  addToShipment(id: number): void {
    const item = this.#mockedItems.find(item => item.id === id)
    // add to shipment logic
  }
}
