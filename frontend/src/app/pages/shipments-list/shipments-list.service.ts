import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShipmentService, StatusService } from 'src/app/api';
import { CommonUtilsService } from 'src/app/common/utils/common-utils.service';
import { WarehouseShipment, WarehouseShipmentProduct, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsListService {
  public shipmentsUpdate = new BehaviorSubject<Array<WarehouseShipment>>([]);

  constructor(
    private shipmentService: ShipmentService,
    private statusService: StatusService,
    private commonUtilsService: CommonUtilsService
  ) { }

  getShipments(): Observable<Array<WarehouseShipment>> {
    const shipmentsObservable = this.shipmentService.apiShipmentListPost();
    shipmentsObservable.subscribe(shipments => {
      this.shipmentsUpdate.next(shipments);
    });
    return shipmentsObservable;
  }

  getStatuses(): Observable<Array<WarehouseShipmentStatus>> {
    return this.statusService.apiStatusListPost();
  }

  getShipment(id: number): Observable<WarehouseShipment> {
    return this.shipmentService.apiShipmentGet(id);
  }

  addShipment(shipment: WarehouseShipment): void {
    const { id, shipmentId, ...shipmentData } = shipment;
    this.shipmentService.apiShipmentPost(shipmentData).subscribe(() => {
      this.refreshShipments();
    });
  }

  updateShipment(shipment: WarehouseShipment): void {
    const { shipmentId, ...shipmentData } = shipment;
    this.shipmentService.apiShipmentPut(shipmentData).subscribe(() => {
      this.refreshShipments();
    });
  }

  refreshShipments() {
    this.getShipments();
  }
}