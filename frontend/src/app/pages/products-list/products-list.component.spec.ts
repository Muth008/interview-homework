import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductsListService } from './products-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { EditProductComponent } from './edit-product-modal/edit-product.component';

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;
    let mockProductListService: Partial<ProductsListService>;
    let mockModalService: Partial<NgbModal>;
    let mockModalRef: { componentInstance: any, result: Promise<any> };
    const mockProducts: WarehouseProduct[] = [
        { id: 1, name: 'Product 1', description: 'Description 1', imageUrl: 'URL1', quantity: 10, price: 100 },
        { id: 2, name: 'Product 2', description: 'Description 2', imageUrl: 'URL2', quantity: 20, price: 200 }
    ];

    beforeEach(async () => {
        mockProductListService = {
            refreshProducts: jasmine.createSpy('refreshProducts'),
            productsUpdate: new BehaviorSubject<WarehouseProduct[]>(mockProducts),
            updateProduct: jasmine.createSpy('updateProduct').and.callThrough(),
            addProduct: jasmine.createSpy('addProduct').and.callThrough()
        };

        mockModalRef = {
            componentInstance: {},
            result: Promise.resolve(mockProducts[0]) // Simulate selecting the first product for edit
        };
        mockModalService = {
            open: jasmine.createSpy('open').and.returnValue(mockModalRef)
        };

        await TestBed.configureTestingModule({
            imports: [CommonModule, ProductsListComponent, ListProductComponent],
            providers: [
                { provide: ProductsListService, useValue: mockProductListService },
                { provide: NgbModal, useValue: mockModalService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call refreshProducts on init', () => {
        expect(mockProductListService.refreshProducts).toHaveBeenCalled();
    });

    it('should open modal to edit product', () => {
        component.editProduct(1); // Assuming 1 is a valid product ID
        expect(mockModalService.open).toHaveBeenCalledWith(EditProductComponent);
        expect(mockModalRef.componentInstance.product).toEqual(mockProducts[0]);
    });

    it('should update product when modal closes with result', async () => {
        // Use async/await to wait for modal result
        await fixture.whenStable();
        component.editProduct(1);
        fixture.detectChanges();
        await fixture.whenStable(); 

        expect(mockProductListService.updateProduct).toHaveBeenCalledWith(mockProducts[0]);
    });

    it('should add product when modal closes with new product result', async () => {
        const newProduct: WarehouseProduct = { name: 'Product 3', description: 'Description 3', imageUrl: 'URL3', quantity: 30, price: 300 };
        mockModalRef.result = Promise.resolve(newProduct);

        await fixture.whenStable();
        component.addProduct();
        fixture.detectChanges(); 
        await fixture.whenStable(); 

        expect(mockProductListService.addProduct).toHaveBeenCalledWith(newProduct);
    });

    it('should not update or add product when modal is dismissed', async () => {
        mockModalRef.result = Promise.reject();
        await fixture.whenStable();
        component.addProduct();
        expect(mockProductListService.updateProduct).not.toHaveBeenCalledWith();
        expect(mockProductListService.addProduct).not.toHaveBeenCalledWith();
    });
});