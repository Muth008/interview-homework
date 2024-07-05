import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { WarehouseShipment, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';
import { ListShipmentComponent } from './list-shipment/list-shipment.component';
import { ShipmentsListService } from './shipments-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditShipmentComponent } from './edit-shipment/edit-shipment.component';
import { ProductsListService } from '../products-list/products-list.service';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';

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
    shipments$: Observable<WarehouseShipment[]> = this.shipmentListService.shipmentsUpdate?.asObservable();
    products$: Observable<WarehouseProduct[]> = this.productListService.productsUpdate?.asObservable();
    statuses: WarehouseShipmentStatus[];
    subscriptions = new Subscription();

    constructor(
        private shipmentListService: ShipmentsListService,
        private productListService: ProductsListService,
        private modalService: NgbModal
    ) {
        this.shipmentListService.refreshShipments();
        this.subscriptions.add(
            this.shipmentListService.getStatuses()?.subscribe(statuses => {
                this.statuses = statuses;
            })
        );
    }

    /**
     *  Finds the shipment by id in shipments$ and passes it to the edit modal.
     */
    editShipment(id: number): void {
        this.shipments$.pipe(take(1)).subscribe(shipments => {
            const shipment = shipments.find(shipment => shipment.id === id);
            if (shipment) {
                this.openShipmentModal(shipment);
            }
        });
    }

    /**
     * Opens the edit modal without passing any data to it.
     */
    addShipment(): void {
        this.openShipmentModal();
    }


    /**
     * Opens the edit modal with the shipment data.
     * After modal is closed it calls update or add the shipment
     * in shipmentServiceList depending on the result data.
     */
    openShipmentModal(shipment?: WarehouseShipment): void {
        const modalRef = this.modalService.open(EditShipmentComponent);

        if (shipment) {
            modalRef.componentInstance.shipment = shipment;
        }
        
        this.products$.pipe(take(1)).subscribe(products => {
            modalRef.componentInstance.allProducts = products;
        });

        modalRef.componentInstance.allStatuses = this.statuses;

        modalRef.result.then((result) => {
            if (result && result.id) {
                this.shipmentListService.updateShipment(result);
            } else if (result) {
                this.shipmentListService.addShipment(result);
            }
        }, () => {});
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
