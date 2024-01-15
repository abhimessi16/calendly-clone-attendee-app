import { Component, Input } from '@angular/core';
import Organizer from '../models/Organizer';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrganizerBookingComponent } from '../organizer-booking/organizer-booking.component';
import { LoggedUser } from '../models/LoggedUser';

@Component({
  selector: 'app-organizer-card',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, OrganizerBookingComponent],
  templateUrl: './organizer-card.component.html',
  styleUrl: './organizer-card.component.css'
})
export class OrganizerCardComponent {
  @Input() organizer: Organizer = {
    name: "",
    email: "",
    slots: []
  }

  @Input() loggedUser: LoggedUser = {
    name: "", 
    email: ""
  }

}
