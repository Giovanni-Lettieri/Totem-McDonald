import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftColComponent } from './left-col.component';

describe('LeftColComponent', () => {
  let component: LeftColComponent;
  let fixture: ComponentFixture<LeftColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftColComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
