import { Injectable } from "@angular/core";
import { LoggedUser } from "../models/LoggedUser";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoggedUserService {
    protected loggedUserSubject = new Subject<LoggedUser>();

    getLoggedUser(): Observable<LoggedUser> {
        return this.loggedUserSubject.asObservable()
    }

    setLoggedUser(loggedUser: LoggedUser): void {
        this.loggedUserSubject.next({
            name: loggedUser.name,
            email: loggedUser.email
        })
    }
}