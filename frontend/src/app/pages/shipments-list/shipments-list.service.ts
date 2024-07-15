import { Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ShipmentService, StatusService } from 'src/app/api';
import { WarehouseShipment, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';
import { ProductsListService } from '../products-list/products-list.service';

@Injectable({
    providedIn: 'root'
})
export class ShipmentsListService {
    shipments = signal<Array<WarehouseShipment>>([]);

    constructor(
        private shipmentService: ShipmentService,
        private productsListService: ProductsListService,
        private statusService: StatusService,
    ) { }

    /**
     * Fetches a list of shipments from the shipmentService and updates the shipmentsSignal.
     */
    fetchShipments(): Observable<Array<WarehouseShipment>> {
        return this.shipmentService.apiShipmentListPost()
            .pipe(
                tap(shipments => this.shipments.set(shipments))
            );
    }

    /**
     * Fetches a list of shipment statuses from the statusService and returns an Observable.
     */
    fetchStatuses(): Observable<Array<WarehouseShipmentStatus>> {
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
        this.shipmentService.apiShipmentPost(shipmentData)
            .pipe(
                switchMap(() => this.fetchShipments())
            )
            .subscribe();
    }

    /**
     * Updates an existing shipment by calling the shipmentService's API.
     * Refreshes the shipment list upon success 
     */
    updateShipment(shipment: WarehouseShipment): void {
        const { shipmentId, ...shipmentData } = shipment;
        this.shipmentService.apiShipmentPut(shipmentData)
            .pipe(
                switchMap(() => this.fetchShipments())
            )
            .subscribe();
    }

    /**
     * Refreshes the shipment list by calling getShipments
     */
    refreshShipments() {
        this.fetchShipments().subscribe();
        this.productsListService.refreshProducts();
    }
}