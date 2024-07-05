import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from './image-modal.component';

describe('ImageModalComponent', () => {
  let component: ImageModalComponent;
  let fixture: ComponentFixture<ImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageModalComponent],
      providers: [
        { provide: NgbActiveModal, useValue: { dismiss: jasmine.createSpy('dismiss') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image with the correct URL', () => {
    const testUrl = 'https://example.com/test-image.jpg';
    component.imageUrl = testUrl;
    fixture.detectChanges();

    const imgElement: HTMLImageElement = fixture.debugElement.query(By.css('.img-fluid')).nativeElement;
    expect(imgElement.src).toBe(testUrl);
  });

  it('should call dismiss on close button click', () => {
    const closeButton = fixture.debugElement.query(By.css('.btn-close')).nativeElement;
    closeButton.click();
    expect(component.activeModal.dismiss).toHaveBeenCalled();
  });
});