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
     * Calculates the maximum quantity of a product that can be added to the shipment.
     * This is determined by the sum of the product's available quantity in the warehouse
     * and the quantity of the product already included in the shipment (if any).
     */
    getMaxQuantity(index: number): number {
        const productFormGroup = this.products.at(index);
        const productId = productFormGroup.get('productId')?.value;
        const selectedProduct = this.allProducts?.find(product => product.id === productId);
    
        let warehouseQuantity = selectedProduct ? selectedProduct.quantity : 0;
        let shipmentQuantity = 0;
    
        if (this.isEditMode && this.shipment?.products) {
            const existingProductInShipment = this.shipment.products.find(product => product.productId === productId);
            if (existingProductInShipment) {
                shipmentQuantity = existingProductInShipment.quantity;
            }
        }
    
        // The total allowed quantity is the sum of what's in the warehouse plus what's already in the shipment.
        let totalAllowedQuantity = warehouseQuantity + shipmentQuantity;
    
        return totalAllowedQuantity;
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
