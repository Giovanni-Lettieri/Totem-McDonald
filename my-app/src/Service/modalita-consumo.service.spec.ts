import { TestBed } from '@angular/core/testing';

import { ModalitaConsumoService } from './modalita-consumo.service';

describe('ModalitaConsumoService', () => {
  let service: ModalitaConsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalitaConsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
