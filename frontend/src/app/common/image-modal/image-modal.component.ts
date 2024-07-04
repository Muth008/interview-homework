import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})

export class ImageModalComponent {
  @Input() imageUrl!: string;
  
  constructor(public activeModal: NgbActiveModal) {}
}