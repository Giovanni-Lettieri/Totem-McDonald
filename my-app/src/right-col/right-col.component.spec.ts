import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightColComponent } from './right-col.component';

describe('RightColComponent', () => {
  let component: RightColComponent;
  let fixture: ComponentFixture<RightColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightColComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
