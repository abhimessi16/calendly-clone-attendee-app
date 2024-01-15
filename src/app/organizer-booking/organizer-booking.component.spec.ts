import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerBookingComponent } from './organizer-booking.component';

describe('OrganizerBookingComponent', () => {
  let component: OrganizerBookingComponent;
  let fixture: ComponentFixture<OrganizerBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
