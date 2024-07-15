import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ShipmentsListComponent } from "./shipments-list.component";
import { ShipmentsListService } from "./shipments-list.service";
import { ProductsListService } from "../products-list/products-list.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditShipmentComponent } from "./edit-shipment/edit-shipment.component";
import { WarehouseShipment, WarehouseShipmentStatus } from "src/app/core/models/warehouseShipment";
import { BehaviorSubject, of } from "rxjs";
import { WarehouseProduct } from "src/app/core/models/warehouseProduct";
import { signal } from "@angular/core";

describe('ShipmentsListComponent', () => {
    let component: ShipmentsListComponent;
    let fixture: ComponentFixture<ShipmentsListComponent>;
    let mockShipmentsListService: Partial<ShipmentsListService>;
    let mockProductListService: Partial<ProductsListService>;
    let mockModalService: Partial<NgbModal>;
    let mockModalRef: { componentInstance: any, result: Promise<any> };
    const mockShipments: WarehouseShipment[] = [
        { id: 1, shipmentId: '123', companyName: 'Test Company', statusId: 1, shipmentDate: '2025-01-01', products: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 5 }
        ] }
    ];
    const mockProducts: WarehouseProduct[] = [
        { id: 1, name: 'Product 1', description: 'Description 1', imageUrl: 'URL1', quantity: 10, price: 100 },
        { id: 2, name: 'Product 2', description: 'Description 2', imageUrl: 'URL2', quantity: 20, price: 200 }
    ];
    const moskStatuses: WarehouseShipmentStatus[] = [
        { id: 1, name: 'Created' },
        { id: 2, name: 'Delivered' }
    ];
    
    beforeEach(async () => {
        mockShipmentsListService = {
            refreshShipments: jasmine.createSpy('refreshShipments'),
            shipments: signal<WarehouseShipment[]>(mockShipments),
            updateShipment: jasmine.createSpy('updateShipment').and.callThrough(),
            addShipment: jasmine.createSpy('addShipment').and.callThrough(),
            fetchStatuses: jasmine.createSpy('fetchStatuses').and.returnValue(of(moskStatuses))
          };

        mockProductListService = {
            refreshProducts: jasmine.createSpy('refreshProducts'),
            products: signal<WarehouseProduct[]>(mockProducts),
            updateProduct: jasmine.createSpy('updateProduct').and.callThrough(),
            addProduct: jasmine.createSpy('addProduct').and.callThrough(),
            fetchProducts: jasmine.createSpy('fetchProducts').and.returnValue(of(mockProducts))
        };

        mockModalRef = {
            componentInstance: {},
            result: Promise.resolve(mockShipments[0]) // Simulate selecting the first product for edit
        };
        mockModalService = {
            open: jasmine.createSpy('open').and.returnValue(mockModalRef)
        };

        await TestBed.configureTestingModule({
            imports: [ ShipmentsListComponent, EditShipmentComponent ],
            providers: [
            { provide: ShipmentsListService, useValue: mockShipmentsListService },
            { provide: ProductsListService, useValue: mockProductListService },
            { provide: NgbModal, useValue: mockModalService }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShipmentsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call addShipment and open modal on button click', () => {
        spyOn(component, 'addShipment');
        const button = fixture.debugElement.nativeElement.querySelector('.btn.btn-primary');
        button.click();
        expect(component.addShipment).toHaveBeenCalled();
    });

    it('should open modal with correct component for addShipment', () => {
        component.addShipment();
        expect(mockModalService.open).toHaveBeenCalledWith(EditShipmentComponent);
    });

    it('should open modal with correct component and data for editShipment', () => {
        component.editShipment(1);
        expect(mockModalService.open).toHaveBeenCalledWith(EditShipmentComponent);
        expect(mockModalRef.componentInstance.shipment).toEqual(mockShipments[0]);
    });

    it('should update shipment when modal closed with result having id', async () => {
        // Use async/await to wait for modal result
        fixture.whenStable();
        component.editShipment(1);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(mockShipmentsListService.updateShipment).toHaveBeenCalledWith(mockShipments[0]);
    });

    it('should add shipment when modal closed with result not having id', async () => {
        const newShipment = { shipmentId: '1234', companyName: 'Test Company 2', statusId: 1, shipmentDate: '2026-01-01', products: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 5 }
        ] };
        mockModalRef.result = Promise.resolve(newShipment);

        await fixture.whenStable();
        component.addShipment();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(mockShipmentsListService.addShipment).toHaveBeenCalledWith(newShipment);
    });

    it('should not update or add product when modal is dismissed', async () => {
        mockModalRef.result = Promise.reject();
        component.editShipment(1);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(mockShipmentsListService.updateShipment).not.toHaveBeenCalled();
        expect(mockShipmentsListService.addShipment).not.toHaveBeenCalled();
    });
});
