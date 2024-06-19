import { TestBed } from '@angular/core/testing';

import { PulsantiExtraService } from '../Service/pulsanti-extra.service';

describe('PulsantiExtraService', () => {
  let service: PulsantiExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PulsantiExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
