import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product.component';
import { WarehouseProduct } from '../../../core/models/warehouseProduct';

describe('ListProductComponent', () => {
    let component: ListProductComponent;
    let fixture: ComponentFixture<ListProductComponent>;
    const mockProduct: WarehouseProduct = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product',
        imageUrl: 'test.jpg',
        quantity: 10,
        price: 100
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListProductComponent, CommonModule],
        })
        .compileComponents();

        fixture = TestBed.createComponent(ListProductComponent);
        component = fixture.componentInstance;
        component.product = mockProduct;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display product information', () => {
        const nameElement = fixture.debugElement.query(By.css('.list-product--content h5.card-title')).nativeElement;
        expect(nameElement.textContent).toContain(mockProduct.name);

        const descriptionElement = fixture.debugElement.query(By.css('.list-product--content p.card-text')).nativeElement;
        expect(descriptionElement.textContent).toContain(mockProduct.description);

        const quantityElement = fixture.debugElement.query(By.css('.d-flex .badge')).nativeElement;
        expect(quantityElement.textContent).toContain(`${mockProduct.quantity}x`);

        const priceElement = fixture.debugElement.query(By.css('.d-flex .me-3 strong')).nativeElement;
        expect(priceElement.textContent).toContain(`€${mockProduct.price.toFixed(2)}`);
    });

    it('should emit editProduct event when edit button is clicked', () => {
        spyOn(component.editProduct, 'emit');
        const button = fixture.debugElement.query(By.css('.btn.btn-outline-primary')).nativeElement;
        button.click();
        expect(component.editProduct.emit).toHaveBeenCalled();
    });

    it('should display default image when imageUrl is not provided', () => {
        component.product = { ...mockProduct, imageUrl: undefined };
        fixture.detectChanges();
        const defaultImage = fixture.debugElement.query(By.css('.list-product--image img')).nativeElement;
        expect(defaultImage.src).toContain('assets/logo_black.svg');
    });
});