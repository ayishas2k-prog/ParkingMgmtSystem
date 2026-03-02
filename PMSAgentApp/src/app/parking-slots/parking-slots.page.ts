import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from '../services/parking';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { CommonModule } from '@angular/common'; // Required for *ngFor

@Component({
  selector: 'app-parking-slots',
  templateUrl: './parking-slots.page.html',
  styleUrls: ['./parking-slots.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] // Add IonicModule and CommonModule here
})
export class ParkingSlotsPage implements OnInit {
  parkingSlots: any[] = []; // Define a proper interface later

  constructor(private parkingService: ParkingService, private router: Router) { }

  ngOnInit() {
    this.loadParkingSlots();
  }

  ionViewWillEnter() {
    this.loadParkingSlots(); // Refresh slots when returning to the page
  }

  async loadParkingSlots() {
    // For now, using mock data. Later this will come from ParkingService
    this.parkingSlots = [
      { Id: 1, SlotNumber: 'G-01', Floor: 'Ground', SlotLocation: 'Near Entrance', SlotLocationWayMarkings: 'First row' },
      { Id: 2, SlotNumber: 'F-10', Floor: 'First', SlotLocation: 'Near Elevator', SlotLocationWayMarkings: 'Second row' },
    ];
    // In a real app:
    // this.parkingSlots = await this.parkingService.getParkingSlots();
  }

  addParkingSlot() {
    console.log('Add new parking slot');
    // Navigate to a new page or open a modal for adding a parking slot
    this.router.navigateByUrl('/parking-slots/new'); // Assuming a route like this
  }

  editParkingSlot(slot: any) {
    console.log('Edit parking slot:', slot);
    // Navigate to a new page or open a modal for editing a parking slot
    this.router.navigateByUrl(`/parking-slots/edit/${slot.Id}`); // Assuming a route like this
  }
}
