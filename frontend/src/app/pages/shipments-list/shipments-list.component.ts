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
  shipments$: Observable<WarehouseShipment[]> = this.shipmentListService.shipmentsUpdate.asObservable();
  products: WarehouseProduct[];
  statuses: WarehouseShipmentStatus[];
  subscriptions = new Subscription();

  constructor(
    private shipmentListService: ShipmentsListService,
    private productListService: ProductsListService,
    private modalService: NgbModal
  ) {
    this.shipmentListService.refreshShipments();
    this.subscriptions.add(
      this.productListService.getProducts().subscribe(products => {
        this.products = products;
      })
    );
    this.subscriptions.add(
      this.shipmentListService.getStatuses().subscribe(statuses => {
        this.statuses = statuses;
      })
    );
  }

  editShipment(id: number): void {
    this.shipments$.pipe(take(1)).subscribe(shipments => {
      const shipment = shipments.find(shipment => shipment.id === id);
      if (shipment) {
        this.openShipmentModal(shipment);
      }
    });
  }

  addShipment(): void {
    this.openShipmentModal();
  }

  openShipmentModal(shipment?: WarehouseShipment): void {
    const modalRef = this.modalService.open(EditShipmentComponent);

    if (shipment) {
      modalRef.componentInstance.shipment = shipment;
    }
    modalRef.componentInstance.allProducts = this.products;
    modalRef.componentInstance.allStatuses = this.statuses;

    modalRef.result.then((result) => {
      if (result && result.id) {
        this.shipmentListService.updateShipment(result);
      } else if (result) {
        this.shipmentListService.addShipment(result);
      }
    }, () => {
      console.log('Modal dismissed');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
