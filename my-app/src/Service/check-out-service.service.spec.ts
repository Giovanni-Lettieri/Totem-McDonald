import { TestBed } from '@angular/core/testing';

import { CheckOutServiceService } from './check-out-service.service';

describe('CheckOutServiceService', () => {
  let service: CheckOutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
