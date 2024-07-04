import { TestBed } from '@angular/core/testing';

import { ProductsMockService } from './products.mock.service';

describe('ProductsMockService', () => {
  let service: ProductsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
