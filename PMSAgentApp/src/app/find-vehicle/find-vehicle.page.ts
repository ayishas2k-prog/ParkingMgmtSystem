import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { CommonModule } from '@angular/common'; // Required for *ngIf

@Component({
  selector: 'app-find-vehicle',
  templateUrl: './find-vehicle.page.html',
  styleUrls: ['./find-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule] // Add IonicModule, FormsModule, CommonModule here
})
export class FindVehiclePage implements OnInit {
  vehicleNumber!: string;
  vehicleInfo: any; // Define a proper interface later
  searched: boolean = false;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
  }

  async searchVehicle() {
    if (!this.vehicleNumber) {
      console.log('Please enter a vehicle number');
      return;
    }

    this.searched = true;
    try {
      this.vehicleInfo = await this.vehicleService.getVehicleInfo(this.vehicleNumber);
      console.log('Vehicle Info:', this.vehicleInfo);
    } catch (error) {
      console.error('Error finding vehicle:', error);
      this.vehicleInfo = null;
    }
  }
}
