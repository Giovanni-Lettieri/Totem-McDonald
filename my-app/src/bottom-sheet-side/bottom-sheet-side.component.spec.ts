import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetSideComponent } from './bottom-sheet-side.component';

describe('BottomSheetSideComponent', () => {
  let component: BottomSheetSideComponent;
  let fixture: ComponentFixture<BottomSheetSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
