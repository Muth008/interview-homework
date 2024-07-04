import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WarehouseShipment } from 'src/app/core/models/warehouseShipment';

@Injectable({
  providedIn: 'root',
})
export class ShipmentsMockService {
  #mockedShipments: WarehouseShipment[] = [
    {
      id: 1,
      shipmentId: "AASHIP456",
      companyName: "Shipping Company First",
      shipmentDate: "2024-07-29T08:07:14.660Z",
      statusId: 1,
      createdAt: "2024-06-29T08:07:14.667Z",
      updatedAt: "2024-07-01T18:18:26.771Z",
      products: [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    },{
        id: 2,
        shipmentId: "AASHIP457",
        companyName: "Shipping Company Second",
        shipmentDate: "2024-07-30T08:07:14.660Z",
        statusId: 1,
        createdAt: "2024-06-29T10:07:14.667Z",
        updatedAt: "2024-07-01T20:18:26.771Z",
        products: [
            {
            productId: 1,
            quantity: 10,
            },
            {
            productId: 2,
            quantity: 5,
            },
        ],
    }
  ];

  constructor() {}

  get shipments(): Observable<WarehouseShipment[]> {
    return of(this.#mockedShipments);
  }

  addToShipment(id: number): void {
    const shipment = this.#mockedShipments.find(
      (shipment) => shipment.id === id
    );
    // add to shipment logic
  }
}
