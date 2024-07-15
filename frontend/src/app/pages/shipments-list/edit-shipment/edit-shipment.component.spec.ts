import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EditShipmentComponent } from './edit-shipment.component';
import { ShipmentsListService } from '../shipments-list.service';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';
import { WarehouseShipment } from 'src/app/core/models/warehouseShipment';
import { signal } from '@angular/core';
import { ProductsListService } from '../../products-list/products-list.service';

describe('EditShipmentComponent', () => {
let component: EditShipmentComponent;
let fixture: ComponentFixture<EditShipmentComponent>;
let mockActiveModal: Partial<NgbActiveModal>;
let mockFormBuilder: FormBuilder;
let mockProductListService: Partial<ProductsListService>;
const mockProducts: WarehouseProduct[] = [
    { id: 1, name: 'Product 1', quantity: 10 } as WarehouseProduct,
    { id: 2, name: 'Product 2', quantity: 20 } as WarehouseProduct
];


    beforeEach(async () => {
        const mockShipmentsListService = {};
        mockActiveModal = {
            close: jasmine.createSpy('close')
        };
        mockFormBuilder = new FormBuilder();

        mockProductListService = {
            products: signal<WarehouseProduct[]>(mockProducts),
        };

        await TestBed.configureTestingModule({
            imports: [EditShipmentComponent, ReactiveFormsModule],
            providers: [
                { provide: ShipmentsListService, useValue: mockShipmentsListService },
                { provide: ProductsListService, useValue: mockProductListService },
                { provide: NgbActiveModal, useValue: mockActiveModal },
                { provide: FormBuilder, useValue: mockFormBuilder },
                DatePipe,
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditShipmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form in edit mode if shipment is provided', () => {
        component.shipment = {
            id: 1,
            companyName: 'Test Company',
            shipmentId: 'SHIP123',
            shipmentDate: new Date().toISOString(),
            statusId: 1,
            products: []
        };
        component.ngOnInit();
        expect(component.isEditMode).toBeTrue();
        expect(component.shipmentForm).toBeTruthy();
        expect(component.shipmentForm.get('companyName')?.value).toEqual('Test Company');
    });

    it('should add a product to the products form array', () => {
        expect(component.products.length).toBe(0);
        component.addProduct({ productId: 1, quantity: 10 });
        expect(component.products.length).toBe(1);
    });

    it('should remove a product from the products form array', () => {
        component.addProduct({ productId: 1, quantity: 10 });
        expect(component.products.length).toBe(1);
        component.removeProduct(0);
        expect(component.products.length).toBe(0);
    });

    it('should not submit if form is invalid', () => {
        component.onSubmit();
        expect(component.activeModal.close).not.toHaveBeenCalled();
    });

    it('should submit and close modal with form value if form is valid', () => {
        const productsArray = component.shipmentForm.get('products') as FormArray;
        const productFormGroup = mockFormBuilder.group({
            productId: [1],
            quantity: [10]
          });

        expect(component.shipmentForm.valid).toBeFalsy();
        component.shipmentForm.controls['companyName'].setValue("Test Company");
        component.shipmentForm.controls['shipmentDate'].setValue("2025-01-01");
        component.shipmentForm.controls['statusId'].setValue(1);
        productsArray.push(productFormGroup);
        expect(component.shipmentForm.valid).toBeTruthy();

        component.onSubmit();
        expect(mockActiveModal.close).toHaveBeenCalledWith(jasmine.objectContaining({
            id: null,
            companyName: 'Test Company',
            shipmentDate: '2025-01-01',
            shipmentId: null,
            statusId: 1,
            products: [{ productId: 1, quantity: 10 }]
        }));
    });

    describe('getMaxQuantity', () => {
        it('should return correct max quantity for new shipment', () => {
          component.isEditMode = false;
          component.addProduct({ productId: 1, quantity: 5 });
          
          expect(component.getMaxQuantity(0)).toBe(10);
        });
    
        it('should return correct max quantity for existing shipment', () => {
          component.isEditMode = true;
          component.shipment = {
            id: 1,
            companyName: 'Test Company',
            shipmentId: 'SHIP123',
            shipmentDate: new Date().toISOString(),
            statusId: 1,
            products: [{ productId: 1, quantity: 5 }]
          } as WarehouseShipment;
    
          component.ngOnInit();
    
          expect(component.getMaxQuantity(0)).toBe(15);
        });
    
        it('should return 0 for non-existent product', () => {
          component.isEditMode = false;
    
          component.addProduct({ productId: 3, quantity: 5 });
          
          expect(component.getMaxQuantity(0)).toBe(0);
        });
      });
});