import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendlyDetailsComponent } from './calendly-details.component';

describe('CalendlyDetailsComponent', () => {
  let component: CalendlyDetailsComponent;
  let fixture: ComponentFixture<CalendlyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendlyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendlyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
