import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShipmentService, StatusService } from 'src/app/api';
import { WarehouseShipment, WarehouseShipmentProduct, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';

@Injectable({
    providedIn: 'root'
})
export class ShipmentsListService {
    public shipmentsUpdate = new BehaviorSubject<Array<WarehouseShipment>>([]);

    constructor(
        private shipmentService: ShipmentService,
        private statusService: StatusService,
    ) { }

    /**
     * Fetches a list of shipments from the shipmentService and emits the fetched shipments list
     * through the `shipmentsUpdate` Subject. It returns an Observable.
     */
    getShipments(): Observable<Array<WarehouseShipment>> {
        const shipmentsObservable = this.shipmentService.apiShipmentListPost();
        shipmentsObservable.subscribe(shipments => {
            this.shipmentsUpdate.next(shipments);
        });
        return shipmentsObservable;
    }

    /**
     * Fetches a list of shipment statuses from the statusService and returns an Observable.
     */
    getStatuses(): Observable<Array<WarehouseShipmentStatus>> {
        return this.statusService.apiStatusListPost();
    }

    /**
     * Fetches a single shipment by id from the shipmentService and returns an Observable.
     */
    getShipment(id: number): Observable<WarehouseShipment> {
        return this.shipmentService.apiShipmentGet(id);
    }

    /**
     * Adds a new shipment by calling the shipmentService's API.
     * Refreshes the shipment list upon success 
     */
    addShipment(shipment: WarehouseShipment): void {
        const { id, shipmentId, ...shipmentData } = shipment;
        this.shipmentService.apiShipmentPost(shipmentData).subscribe(() => {
            this.refreshShipments();
        });
    }

    /**
     * Updates an existing shipment by calling the shipmentService's API.
     * Refreshes the shipment list upon success 
     */
    updateShipment(shipment: WarehouseShipment): void {
        const { shipmentId, ...shipmentData } = shipment;
        this.shipmentService.apiShipmentPut(shipmentData).subscribe(() => {
            this.refreshShipments();
        });
    }

    /**
     * Refreshes the shipment list by calling getShipments
     */
    refreshShipments() {
        this.getShipments();
    }
}