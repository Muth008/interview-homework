import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WarehouseShipment, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';

@Component({
    selector: 'app-list-shipment',
    standalone: true,
    imports: [
        CommonModule,
    ],
    providers: [ DatePipe ],
    templateUrl: './list-shipment.component.html',
    styleUrls: ['./list-shipment.component.scss'],
})
export class ListShipmentComponent {
    @Input() shipment: WarehouseShipment;
    @Input() statuses: WarehouseShipmentStatus[]
    @Output() editShipment: EventEmitter<void> = new EventEmitter<void>()

    getStatusNameById(statusId: number): string {
        const status = this.statuses?.find(s => s.id === statusId);
        return status ? status.name : 'Unknown';
    }
}
