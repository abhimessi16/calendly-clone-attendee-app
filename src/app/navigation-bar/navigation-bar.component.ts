import { Component, OnInit , inject } from '@angular/core';
import { LoggedUser } from '../models/LoggedUser';
import { LoggedUserService } from '../Services/LoggedUserService';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit{
  loggedUser: LoggedUser = {
    name: "",
    email: ""
  };
  
  loggedUserService: LoggedUserService = inject(LoggedUserService)

  ngOnInit(): void {
    this.loggedUserService.getLoggedUser().subscribe(user => {
      this.loggedUser = user
    })
  }

  constructor(){
    // console.log(this.loggedUser, 'in nav bar')
    this.loggedUserService.getLoggedUser().subscribe(user => {
      this.loggedUser = user
    })
  }

}
