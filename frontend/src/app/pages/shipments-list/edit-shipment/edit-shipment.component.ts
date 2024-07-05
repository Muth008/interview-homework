import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseShipment, WarehouseShipmentProduct, WarehouseShipmentStatus } from 'src/app/core/models/warehouseShipment';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';

@Component({
    selector: 'app-edit-shipment',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [ DatePipe ],
    templateUrl: './edit-shipment.component.html',
    styleUrls: ['./edit-shipment.component.scss'],
})

export class EditShipmentComponent {
    @Input() shipment?: WarehouseShipment;
    @Input() allProducts?: WarehouseProduct[];
    @Input() allStatuses?: WarehouseShipmentStatus[];
    shipmentForm: FormGroup;
    isEditMode: boolean = false;

    constructor(
        public activeModal: NgbActiveModal, 
        private fb: FormBuilder,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.isEditMode = !!this.shipment;
        this.initForm();
    }

    /**
     * Initializes the shipmentForm with the product data if it exists.
     */
    initForm(): void {
        let shipmentDate = this.shipment?.shipmentDate
            ? this.datePipe.transform(this.shipment.shipmentDate, 'yyyy-MM-dd')
            : undefined;    
        this.shipmentForm = this.fb.group({
            id: [this.shipment?.id],
            companyName: [this.shipment?.companyName, Validators.required],
            shipmentId: [this.shipment?.shipmentId],
            shipmentDate: [shipmentDate, Validators.required],
            statusId: [this.shipment?.statusId, Validators.required],
            products: this.fb.array([], Validators.required)
        });

        if (this.shipment?.products) {
            this.shipment.products.forEach(product => {
                this.addProduct(product);
            });
        }
    }

    get products(): FormArray {
        return this.shipmentForm.get('products') as FormArray;
    }

    /**
     * Returns the maximum quantity of a product based on the selected product.
     */
    getMaxQuantity(index: number): number {
        const productId = this.products?.at(index).get('productId')?.value;
        const selectedProduct = this.allProducts?.find(product => product.id === productId);
        return selectedProduct ? selectedProduct.quantity : 0;
    }

    /**
     * Adds a product to the shipmentForm products array.
     */
    addProduct(product?: WarehouseShipmentProduct): void {
        const productForm = this.fb.group({
            productId: [product?.productId, Validators.required],
            quantity: [product?.quantity, [Validators.required, Validators.min(1)]]
        });
        this.products.push(productForm);
    }

    /**
     * Removes a product from the shipmentForm products array.
     */
    removeProduct(index: number): void {
        this.products.removeAt(index);
    }

    /**
     * If the form is valid, closes the modal and 
     * passes the form value to the parent component.
     */
    onSubmit(): void {
        this.shipmentForm.markAllAsTouched();

        if (this.shipmentForm.valid) {
            this.activeModal.close(this.shipmentForm.value);
        }
    }
}