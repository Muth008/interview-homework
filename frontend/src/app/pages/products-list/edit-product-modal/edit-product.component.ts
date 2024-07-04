import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';
import { ImageModalComponent } from 'src/app/common/image-modal/image-modal.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})

export class EditProductComponent {
  @Input() product?: WarehouseProduct;
  productForm: FormGroup;
  isEditMode: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isEditMode = !!this.product;
    this.initForm();
    this.imagePreview = this.product?.imageUrl || null;
  }

  initForm() {
    this.productForm = this.fb.group({
      id: [this.product?.id],
      name: [this.product?.name, Validators.required],
      description: [this.product?.description],
      imageUrl: [this.product?.imageUrl],
      quantity: [this.product?.quantity, [Validators.required, Validators.min(0)]],
      price: [this.product?.price, [Validators.required, Validators.min(0)]],
      image: [this.product?.image]
    });
  }

  onSubmit() {
    this.productForm.markAllAsTouched();

    if (this.productForm.valid) {
      this.activeModal.close(this.productForm.value);
    }
  }

  /**
   * Retrieves the selected file, updates the 'image' field in the productForm 
   * with the Blob, and reads the file as a DataURL for preview. The imagePreview is then
   * updated with the loaded file, allowing for a preview of the selected image.
   */
  onFileSelected(event: Event) {
    const image = (event.target as HTMLInputElement).files?.[0];
    if (image) {
      this.productForm.patchValue({image: image});
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(image);
    }
  }

  openFullSizeImage() {
    const modalRef = this.modalService.open(ImageModalComponent, { size: 'lg' });
    modalRef.componentInstance.imageUrl = this.productForm.get('imageUrl')?.value;
  }
}
