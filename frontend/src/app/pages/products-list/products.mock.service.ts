import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {WarehouseProduct} from "../../core/models/warehouseProduct";

@Injectable({
  providedIn: 'root',
})
export class ProductsMockService {
  #mockedProducts: WarehouseProduct[] = [
    {
      id: 1,
      imageUrl: 'assets/logo_black.svg',
      name: 'CloudTalk logo sticker',
      description:
        'High-quality sticker of the best cloud calling solution provider in the world',
      quantity: 100,
      price: 10,
    }, {
      id: 2,
      imageUrl: 'assets/logo_black.svg',
      name: 'CloudTalk logo sticker 2',
      description:
        'High-quality sticker v2 of the best cloud calling solution provider in the world',
      quantity: 100,
      price: 20,
    }, {
      id: 3,
      imageUrl: 'assets/logo_black.svg',
      name: 'CloudTalk logo sticker 3',
      description:
        'High-quality sticker v3 of the best cloud calling solution provider in the world',
      quantity: 100,
      price: 30,
    }
  ];

  constructor() {}

  get products(): Observable<WarehouseProduct[]> {
    return of(this.#mockedProducts);
  }

  addToShipment(id: number): void {
    const product = this.#mockedProducts.find((product) => product.id === id);
    // add to shipment logic
  }
}
