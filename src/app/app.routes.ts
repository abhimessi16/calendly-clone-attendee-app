import { Routes } from '@angular/router';
import { OrganizerBookingComponent } from './organizer-booking/organizer-booking.component';
import { OrganizerDetailsComponent } from './organizer-details/organizer-details.component';


export const routes: Routes = [
    { path: '' , component: OrganizerDetailsComponent },
    { path: 'user/:id', component: OrganizerBookingComponent }
];
