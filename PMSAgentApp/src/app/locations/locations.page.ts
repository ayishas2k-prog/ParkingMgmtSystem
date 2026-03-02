import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from '../services/parking';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { CommonModule } from '@angular/common'; // Required for *ngFor

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] // Add IonicModule and CommonModule here
})
export class LocationsPage implements OnInit {
  locations: any[] = []; // Define a proper interface later

  constructor(private parkingService: ParkingService, private router: Router) { }

  ngOnInit() {
    this.loadLocations();
  }

  ionViewWillEnter() {
    this.loadLocations(); // Refresh locations when returning to the page
  }

  async loadLocations() {
    // For now, using mock data. Later this will come from ParkingService
    this.locations = [
      { Id: 1, Location: 'Ground Floor', LocationWayMarkings: 'Near Entrance', LocationPremises: 'Main Building', LocationPrefixCharacter: 'G' },
      { Id: 2, Location: 'First Floor', LocationWayMarkings: 'Near Elevator', LocationPremises: 'Main Building', LocationPrefixCharacter: 'F' },
    ];
    // In a real app:
    // this.locations = await this.parkingService.getParkingLocations();
  }

  addLocation() {
    console.log('Add new location');
    // Navigate to a new page or open a modal for adding a location
    this.router.navigateByUrl('/locations/new'); // Assuming a route like this
  }

  editLocation(location: any) {
    console.log('Edit location:', location);
    // Navigate to a new page or open a modal for editing a location
    this.router.navigateByUrl(`/locations/edit/${location.Id}`); // Assuming a route like this
  }
}
