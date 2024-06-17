import { TestBed } from '@angular/core/testing';

import { InfoBillService } from './info-bill.service';

describe('InfoBillService', () => {
  let service: InfoBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
