import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehouseShipment, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';
import { ListShipmentComponent } from './list-shipment/list-shipment.component';
import { ShipmentsListService } from './shipments-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditShipmentComponent } from './edit-shipment/edit-shipment.component';
import { ProductsListService } from '../products-list/products-list.service';

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
    statuses: WarehouseShipmentStatus[];
    subscriptions = new Subscription();

    constructor(
        public shipmentListService: ShipmentsListService,
        private productListService: ProductsListService,
        private modalService: NgbModal
    ) {
        this.shipmentListService.refreshShipments();
        this.subscriptions.add(
            this.shipmentListService.fetchStatuses()?.subscribe(statuses => {
                this.statuses = statuses;
            })
        );
    }

    /**
     *  Finds the shipment by id in shipments and passes it to the edit modal.
     */
    editShipment(id: number): void {
        this.productListService.refreshProducts();
        const shipment = this.shipmentListService.shipments().find(shipment => shipment.id === id);
        if (shipment) {
            this.openShipmentModal(shipment);
        }
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
