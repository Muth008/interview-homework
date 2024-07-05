import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShipmentsListService } from './shipments-list.service';
import { ShipmentService } from 'src/app/api';
import { BehaviorSubject, of } from 'rxjs';
import { WarehouseShipment } from 'src/app/core/models/warehouseShipment';

describe('ShipmentsListService', () => {
    let service: ShipmentsListService;
    let mockShipmentService: Partial<ShipmentService>;

    const mockShipments: WarehouseShipment[] = [
        { id: 1, shipmentId: '123', companyName: 'Test Company', statusId: 1, shipmentDate: '2025-01-01', products: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 5 }
        ] }
    ];

    beforeEach(() => {
        mockShipmentService = {
            apiShipmentListPost: jasmine.createSpy().and.returnValue(of(mockShipments)),
            apiShipmentGet: jasmine.createSpy().and.returnValue(of(mockShipments[0])),
            apiShipmentPost: jasmine.createSpy().and.returnValue(of(null)),
            apiShipmentPut: jasmine.createSpy().and.returnValue(of(null))
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ShipmentsListService,
                { provide: ShipmentService, useValue: mockShipmentService },
            ]
        });

        service = TestBed.inject(ShipmentsListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getShipments should fetch shipments and emit them', (done) => {
        service.getShipments().subscribe();
        service.shipmentsUpdate.subscribe((shipments) => {
            expect(shipments.length).toBe(1);
            expect(shipments[0].companyName).toBe('Test Company');
            done();
        });
    });

    it('getShipment should fetch a single shipment by id', (done) => {
        service.getShipment(1).subscribe((shipment) => {
            expect(mockShipmentService.apiShipmentGet).toHaveBeenCalledWith(1);
            expect(shipment.companyName).toBe('Test Company');
            done();
        });
    });

    it('addShipment should call apiShipmentPost and refresh shipments list', (done) => {
        const shipment: WarehouseShipment = { id: 1, shipmentId: '123', companyName: 'Test Company', statusId: 1, shipmentDate: '2025-01-01', products: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 5 }
        ] };
        service.shipmentsUpdate = new BehaviorSubject<Array<WarehouseShipment>>([]);

        service.addShipment(shipment);

        service.shipmentsUpdate.subscribe((shipments) => {
            expect(mockShipmentService.apiShipmentPost).toHaveBeenCalled();
            expect(shipments.length).toBe(1);
            expect(shipments[0].companyName).toBe('Test Company');
            done();
        });
    });

    it('updateShipment should call apiShipmentPut and refresh shipments list', (done) => {
        const shipment: WarehouseShipment = { id: 1, shipmentId: '123', companyName: 'Test Company', statusId: 1, shipmentDate: '2025-01-01', products: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 5 }
        ] };
        service.shipmentsUpdate = new BehaviorSubject<Array<WarehouseShipment>>([]);

        service.updateShipment(shipment);

        service.shipmentsUpdate.subscribe((shipments) => {
            expect(mockShipmentService.apiShipmentPut).toHaveBeenCalled();
            expect(shipments.length).toBe(1);
            expect(shipments[0].companyName).toBe('Test Company');
            done();
        });
    });

    it('refreshShipments should fetch shipments and emit them', (done) => {
        service.refreshShipments();

        service.shipmentsUpdate.subscribe((shipments) => {
            expect(shipments.length).toBe(1);
            expect(shipments[0].companyName).toBe('Test Company');
            done();
        });
    });
});