import { TestBed } from '@angular/core/testing';

import { BottomSheetOpenCloseService } from './bottom-sheet-open-close.service';

describe('BottomSheetOpenCloseService', () => {
  let service: BottomSheetOpenCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BottomSheetOpenCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
