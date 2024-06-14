import { TestBed } from '@angular/core/testing';

import { PassagioBillService } from './passagio-bill.service';

describe('PassagioBillService', () => {
  let service: PassagioBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassagioBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
