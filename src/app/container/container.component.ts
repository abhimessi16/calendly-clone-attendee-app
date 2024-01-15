import { Component } from '@angular/core';
import { CalendlyDetailsComponent } from '../calendly-details/calendly-details.component';
import { OrganizerDetailsComponent } from '../organizer-details/organizer-details.component';
import { NgIf } from '@angular/common';
import { OrganizerBookingComponent } from '../organizer-booking/organizer-booking.component';
import { RouterModule } from '@angular/router';

interface OnInit {
  ngOnInit(): void
}

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CalendlyDetailsComponent, OrganizerDetailsComponent,
    NgIf, OrganizerBookingComponent, RouterModule ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  
}
