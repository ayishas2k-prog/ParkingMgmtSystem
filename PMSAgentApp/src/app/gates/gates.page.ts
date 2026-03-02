import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { ParkingService, Gate } from '../services/parking';

@Component({
  selector: 'app-gates',
  templateUrl: './gates.page.html',
  styleUrls: ['./gates.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class GatesPage implements OnInit {
  gates: Gate[] = [];

  constructor(
    private parkingService: ParkingService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadGates();
  }

  async loadGates() {
    try {
      this.gates = await this.parkingService.getGates();
    } catch (error) {
      this.presentToast('Failed to load gates.', 'danger');
      console.error('Error loading gates:', error);
    }
  }

  addGate() {
    this.router.navigateByUrl('/gate-form/new');
  }

  editGate(id: number | undefined) {
    if (id) {
      this.router.navigate(['/gate-form/edit', id]);
    }
  }

  async deleteGate(id: number | undefined) {
    if (!id) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this gate?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.parkingService.deleteGate(id);
              this.presentToast('Gate deleted successfully.', 'success');
              this.loadGates(); // Refresh the list
            } catch (error) {
              this.presentToast('Failed to delete gate.', 'danger');
              console.error('Error deleting gate:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
