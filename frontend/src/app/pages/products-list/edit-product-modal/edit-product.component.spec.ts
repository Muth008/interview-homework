import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './edit-product.component';
import { CommonModule } from '@angular/common';

describe('EditProductComponent', () => {
    let component: EditProductComponent;
    let fixture: ComponentFixture<EditProductComponent>;
    let mockActiveModal: Partial<NgbActiveModal>;
    let mockModalService: Partial<NgbModal>;
    let mockFormBuilder: FormBuilder;

    beforeEach(async () => {
        mockActiveModal = {
            close: jasmine.createSpy('close')
        };
        mockModalService = {
            open: jasmine.createSpy('open').and.returnValue({ componentInstance: {} })
        };
        mockFormBuilder = new FormBuilder();

        await TestBed.configureTestingModule({
            imports: [EditProductComponent, CommonModule, ReactiveFormsModule],
            providers: [
                { provide: NgbActiveModal, useValue: mockActiveModal },
                { provide: NgbModal, useValue: mockModalService },
                { provide: FormBuilder, useValue: mockFormBuilder }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.productForm.valid).toBeFalsy();
    });

    it('name field validity', () => {
        let name = component.productForm.controls['name'];
        expect(name.valid).toBeFalsy();

        // Name field is required
        let errors = name.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('submitting a form emits a product', () => {
        expect(component.productForm.valid).toBeFalsy();
        component.productForm.controls['name'].setValue("Test Product");
        component.productForm.controls['quantity'].setValue(10);
        component.productForm.controls['price'].setValue(100);
        expect(component.productForm.valid).toBeTruthy();

        component.onSubmit();
        expect(mockActiveModal.close).toHaveBeenCalledWith(jasmine.objectContaining({
            name: "Test Product",
            quantity: 10,
            price: 100
        }));
    });

    it('should open image modal on full size image view', () => {
        component.openFullSizeImage();
        expect(mockModalService.open).toHaveBeenCalled();
    });
    
    it('form should be valid when required fields are filled', () => {
        component.productForm.controls['name'].setValue('Test Product');
        component.productForm.controls['quantity'].setValue(10);
        component.productForm.controls['price'].setValue(100);
        expect(component.productForm.valid).toBeTruthy();
    });
    
    it('should not submit form if it is invalid', () => {
        component.onSubmit();
        expect(component.activeModal.close).not.toHaveBeenCalled();
    });
    
    it('should mark all fields as touched on submit', () => {
        const spy = spyOn(component.productForm, 'markAllAsTouched');
        component.onSubmit();
        expect(spy).toHaveBeenCalled();
    });
});