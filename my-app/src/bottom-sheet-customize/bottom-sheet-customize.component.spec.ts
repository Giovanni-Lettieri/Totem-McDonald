import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetCustomizeComponent } from './bottom-sheet-customize.component';

describe('BottomSheetCustomizeComponent', () => {
  let component: BottomSheetCustomizeComponent;
  let fixture: ComponentFixture<BottomSheetCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetCustomizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
