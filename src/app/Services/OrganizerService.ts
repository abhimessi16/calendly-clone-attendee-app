import { Injectable } from "@angular/core";
import Organizer from "../models/Organizer";

@Injectable({
    providedIn: "root"
})
export class OrganizerService {

    protected organizers: Organizer[] = [];

    getOrganizers(): Organizer[] {
        return this.organizers
    }

    setOrganizers(organizers: Organizer[]): void {
        this.organizers = organizers
    }
}