import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { OrganizerCardComponent } from '../organizer-card/organizer-card.component';
import Organizer from '../models/Organizer';
import { RouterOutlet } from '@angular/router';
import { OrganizerBookingComponent } from '../organizer-booking/organizer-booking.component';
import { LoggedUser } from '../models/LoggedUser';
import { LoggedUserService } from '../Services/LoggedUserService';

interface OnInit {
  ngOnInit(): void
}

@Component({
  selector: 'app-organizer-details',
  standalone: true,
  imports: [ NgFor, NgIf,  OrganizerCardComponent, RouterOutlet ],
  templateUrl: './organizer-details.component.html',
  styleUrl: './organizer-details.component.css'
})
export class OrganizerDetailsComponent implements OnInit {

  organizers: Organizer[] = []
  loggedUser: LoggedUser = {
    name: "",
    email: ""
  }
  loggedUserService: LoggedUserService = inject(LoggedUserService)

  ngOnInit(): void {
    this.loggedUserService.getLoggedUser().subscribe(user => {
      this.loggedUser = user
    })
    this.userLoggedCheck()
    this.getAllOrganizers()
  }

  constructor(){
    this.loggedUserService.getLoggedUser().subscribe(user => {
      this.loggedUser = user
    })
  }

  getAllOrganizers = async () => {

    console.log("coming into creation of organizer card");
    

    let response: Response = await fetch("http://localhost:8080/api/v1/organizer/all",
    {method: 'GET', credentials: "include"})

    let data = await response.json()

    this.organizers = data
  }

  userLoggedCheck = async () => {
    let response = await fetch("http://localhost:8080/check/user", 
    { method: 'GET', credentials: "include"});
    
    let data = await response.json()
    
    console.log(data, ' endpoint response')
    this.loggedUserService.setLoggedUser(data)
    console.log(this.loggedUser)
    
  }

  handleGoogleSignIn = async () => {

    let response = await fetch("http://localhost:8080/check/attendee", { method: 'GET'});
    
    if(!response.ok){
        return
    }

    console.log(response);
    

    let form = document.createElement("form")
		form.setAttribute("method", "get")
		form.setAttribute("action", "http://localhost:8080/login")

		document.body.appendChild(form)
		form.submit()

  }
}
