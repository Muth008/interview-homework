import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseShipment } from 'src/app/core/models/warehouseShipment';
import { ShipmentsMockService } from './shipments.mock.service';
import { ListShipmentComponent } from './list-shipment/list-shipment.component';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [
    CommonModule,
    ListShipmentComponent
  ],
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss'],
})
export class ShipmentsListComponent {
  shipments$: Observable<WarehouseShipment[]> = this.shipmentsMockService.shipments;

  constructor(private shipmentsMockService: ShipmentsMockService) { }

  editShipment(id: number): void {
  }

  addShipment(): void {
  }
}
