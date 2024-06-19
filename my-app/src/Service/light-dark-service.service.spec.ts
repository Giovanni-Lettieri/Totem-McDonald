import { TestBed } from '@angular/core/testing';

import { LightDarkServiceService } from './light-dark-service.service';

describe('LightDarkServiceService', () => {
  let service: LightDarkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightDarkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
