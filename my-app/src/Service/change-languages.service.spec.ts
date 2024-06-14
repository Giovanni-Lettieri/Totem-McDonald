import { TestBed } from '@angular/core/testing';

import { ChangeLanguagesService } from './change-languages.service';

describe('ChangeLanguagesService', () => {
  let service: ChangeLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeLanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
