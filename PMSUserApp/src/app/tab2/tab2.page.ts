import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { VehicleService, Vehicle } from '../services/vehicle';

@Component({
  standalone: false,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;

  /**
   * Tab2Page constructor
   * @param vehicleService VehicleService for vehicle CRUD operations
   * @param alertCtrl AlertController for add/edit dialogs
   * @param loadingCtrl LoadingController for showing loading status
   * @param toastCtrl ToastController for showing operation results
   */
  constructor(
    private vehicleService: VehicleService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadVehicles();
  }

  ionViewWillEnter() {
    this.loadVehicles();
  }

  /**
   * Loads all vehicles for the current user
   */
  async loadVehicles() {
    const loading = await this.loadingCtrl.create({ message: 'Loading vehicles...' });
    await loading.present();

    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        loading.dismiss();
      },
      error: (err) => {
        console.error(err);
        loading.dismiss();
        this.showToast('Failed to load vehicles.', 'danger');
      }
    });
  }

  /**
   * Opens an alert dialog to add a new vehicle
   */
  async onAddVehicle() {
    const alert = await this.alertCtrl.create({
      header: 'Add Vehicle',
      inputs: [
        { name: 'vehicleNumber', type: 'text', placeholder: 'Vehicle Number (e.g. MH12AB1234)' },
        { name: 'nickname', type: 'text', placeholder: 'Nickname (e.g. My Car)' },
        { name: 'model', type: 'text', placeholder: 'Model (e.g. Toyota Camry)' },
        { name: 'type', type: 'text', placeholder: 'Type (e.g. Sedan)' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            this.addVehicle(data);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Adds a new vehicle via the service
   * @param vehicleData Data for the new vehicle
   */
  addVehicle(vehicleData: Vehicle) {
    this.vehicleService.addVehicle(vehicleData).subscribe({
      next: () => {
        this.showToast('Vehicle added successfully!', 'success');
        this.loadVehicles();
      },
      error: () => this.showToast('Failed to add vehicle.', 'danger')
    });
  }

  /**
   * Selects a vehicle and loads its detailed information
   * @param vehicle The vehicle to select
   */
  async onSelectVehicle(vehicle: Vehicle) {
    const loading = await this.loadingCtrl.create({ message: 'Loading details...' });
    await loading.present();

    this.vehicleService.getVehicleById(vehicle.id!).subscribe({
      next: (data) => {
        this.selectedVehicle = data;
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        this.showToast('Failed to load vehicle details.', 'danger');
      }
    });
  }

  /**
   * Deletes a vehicle with confirmation
   * @param id The ID of the vehicle to delete
   */
  async onDeleteVehicle(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this vehicle?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.vehicleService.deleteVehicle(id).subscribe({
              next: () => {
                this.showToast('Vehicle deleted successfully!', 'success');
                this.selectedVehicle = null;
                this.loadVehicles();
              },
              error: () => this.showToast('Failed to delete vehicle.', 'danger')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Shows a toast message
   * @param message The message to display
   * @param color The color of the toast
   */
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
