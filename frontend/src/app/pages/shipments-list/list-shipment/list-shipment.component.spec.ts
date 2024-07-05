import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListShipmentComponent } from "./list-shipment.component";
import { DatePipe } from "@angular/common";

describe('ListShipmentComponent', () => {
    let component: ListShipmentComponent;
    let fixture: ComponentFixture<ListShipmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ListShipmentComponent ],
            providers: [ DatePipe ]
        })
        .compileComponents();
    });

    beforeEach(() => {
    fixture = TestBed.createComponent(ListShipmentComponent);
    component = fixture.componentInstance;
    component.shipment = {
        id: 1,
        companyName: 'Test Company',
        shipmentId: '12345',
        statusId: 1,
        shipmentDate: new Date().toISOString(),
        products: [{
            productId: 2,
            quantity: 1
        }, {
            productId: 1,
            quantity: 2
        }, {
            productId: 3,
            quantity: 3
        }]
    };
    component.statuses = [
        { id: 1, name: 'Created' },
        { id: 2, name: 'Delivered' }
    ];
    fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display company name', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.list-shipment--content span b').textContent).toContain('Test Company');
    });

    it('should display shipment ID', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.list-shipment--content span:nth-child(2)').textContent).toContain('12345');
    });

    it('should display correct status name by ID', () => {
        const statusName = component.getStatusNameById(1);
        expect(statusName).toEqual('Created');
    });

    it('should display "Unknown" for an invalid status ID', () => {
        const statusName = component.getStatusNameById(999);
        expect(statusName).toEqual('Unknown');
    });

    it('should display formatted shipment date', () => {
        const compiled = fixture.debugElement.nativeElement;
        const datePipe = new DatePipe('en-US');
        const expectedDate = datePipe.transform(component.shipment.shipmentDate, 'shortDate');
        expect(compiled.querySelector('.list-shipment span:nth-child(3)').textContent).toContain(`Shipment: ${expectedDate}`);
    });

    it('should display number of products', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.list-shipment span:nth-child(4)').textContent).toContain('Products: 3');
    });

    it('should emit editShipment event when edit button is clicked', () => {
        spyOn(component.editShipment, 'emit');
        const button = fixture.debugElement.nativeElement.querySelector('.list-shipment--button');
        button.click();
        expect(component.editShipment.emit).toHaveBeenCalled();
    });
    
});