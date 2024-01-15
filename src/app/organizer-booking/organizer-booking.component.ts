import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import Slot from '../models/Slot';
import { NgClass, NgFor } from '@angular/common';
import { LoggedUser } from '../models/LoggedUser';

@Component({
	selector: 'app-organizer-booking',
	standalone: true,
	imports: [RouterModule, MatNativeDateModule, MatDatepickerModule,
		MatFormFieldModule, MatInputModule, MatCardModule, NgFor, NgClass ],
	templateUrl: './organizer-booking.component.html',
	styleUrl: './organizer-booking.component.css'
})
export class OrganizerBookingComponent {

	route: ActivatedRoute = inject(ActivatedRoute)
	organizerId: string = ''
	date: Date | null = null;
	
	selectedSlot: Slot = {
		start: -1,
		end: -1,
		day: "",
		isAvailable: false
	};

	slotsAvailableDetails: {
		id: number,
		slot: Slot,
		isActive: boolean
	}[] = []

	constructor() {
		this.organizerId = this.route.snapshot.params['id']
	}

	weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

	handleDateChange = (event: MatDatepickerInputEvent<Date>) => {

		if (event.value == null) {
			return
		}

		this.date = event.value
		console.log(this.date.toISOString())

		this.getSlotsAvailability()

	}

	getSlotsAvailability = async () => {

		if(this.date == null){
			return
		}
		
		let response: Response = await fetch(
			`http://localhost:8080/api/v1/organizer/${this.organizerId}/availability?dateStr=${this.date.toISOString()}`, {
			method: 'GET', credentials: "include"
		})

		let data = await response.json()
		// console.log(data)
		this.slotsAvailableDetails = []

		for(let index = 0; index < data.length; index++){
			
			console.log(data[index]);
			
			let newSlotDetail = {
				id: index,
				slot: {
					start: data[index].start,
					end: data[index].end,
					day: data[index].day,
					isAvailable: data[index].available
				},
				isActive: false
			}
			this.slotsAvailableDetails.push(newSlotDetail)
		}

	}

	handleSlotSelect = (slotSelected: {
		id: number,
		slot: Slot,
		isActive: boolean
	}) => {

		slotSelected.isActive = true

		this.slotsAvailableDetails.forEach(slot => {
			if(slot !== slotSelected){
				slot.isActive = false
			}
		})

		this.selectedSlot = slotSelected.slot
	}

	handleBookSlotClick = () => {
		
		if(!this.selectedSlot.isAvailable){
			// prompt to show invalid input
			return
		}
		
		this.createUpdateAttendeeAndBookEvent()
		
	}

	createUpdateAttendeeAndBookEvent = async () => {

		let response: Response = await fetch("http://localhost:8080/check/user", 
		{ method: 'GET', credentials: "include"});
		
		let data1 = await response.json()

		let body = {
			name: data1.name,
			email: data1.email,
			events: []
		}

		response = await fetch("http://localhost:8080/api/v1/attendee/add",
		{method: 'POST', credentials: "include", headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}, body: JSON.stringify(body)})

		if(this.date == null){
			return
		}
		
		if(data1.email.length === 0){
			return
		}

		let eventStartDate = new Date(this.date.setHours(this.date.getHours() + this.selectedSlot.start))
		let dateStart = eventStartDate.toISOString()
		let dateEnd = new Date(eventStartDate.setHours(this.date.getHours() + 1)).toISOString()
		

		let body1 = {
			eventName: "Meeting",
			eventDescription: "Interaction",
			start: dateStart,
			end: dateEnd
		}

		response = await fetch(
		`http://localhost:8080/api/v1/attendee/${data1.email}/add-event/${this.organizerId}`, 
		{method: 'POST', credentials: "include", headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }, body: JSON.stringify(body1)})

		let data = await response.text()
		console.log(data);
		
		if(!response.ok){
			alert("There was an error!")
			return
		}

		alert("Event is added. Please check your Google Calendar/Mail.")
		


	}

}
