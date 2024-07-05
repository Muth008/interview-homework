import { TestBed } from '@angular/core/testing';
import { ShipmentsMockService } from './shipments.mock.service';

describe('ShipmentsMockService', () => {
    let service: ShipmentsMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShipmentsMockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
