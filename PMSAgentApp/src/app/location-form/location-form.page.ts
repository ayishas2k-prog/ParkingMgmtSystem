import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingService } from '../services/parking';
import { NavController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.page.html',
  styleUrls: ['./location-form.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LocationFormPage implements OnInit {
  isEditMode = false;
  location: any = { // Define a proper interface later
    Location: '',
    LocationWayMarkings: '',
    LocationPremises: '',
    LocationPrefixCharacter: ''
  };
  locationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private parkingService: ParkingService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get('id');
    if (this.locationId) {
      this.isEditMode = true;
      // In a real app, you would fetch the location by ID
      // from the service. For now, we'll use a placeholder.
      // this.location = await this.parkingService.getParkingLocation(this.locationId);
      this.location = {
        Id: this.locationId,
        Location: 'Ground Floor (Edit)',
        LocationWayMarkings: 'Near Entrance',
        LocationPremises: 'Main Building',
        LocationPrefixCharacter: 'G'
      };
    }
  }

  async saveLocation() {
    try {
      if (this.isEditMode) {
        // await this.parkingService.updateLocation(this.location);
        console.log('Updating location:', this.location);
      } else {
        // await this.parkingService.addLocation(this.location);
        console.log('Adding new location:', this.location);
      }
      this.navCtrl.back();
    } catch (error) {
      console.error('Error saving location', error);
      // Handle error display
    }
  }
}
