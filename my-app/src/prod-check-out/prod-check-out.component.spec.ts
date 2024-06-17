import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCheckOutComponent } from './prod-check-out.component';

describe('ProdCheckOutComponent', () => {
  let component: ProdCheckOutComponent;
  let fixture: ComponentFixture<ProdCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdCheckOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
