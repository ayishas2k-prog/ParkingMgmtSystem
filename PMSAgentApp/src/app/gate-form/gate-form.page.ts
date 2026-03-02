import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParkingService, Gate } from '../services/parking';

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.page.html',
  styleUrls: ['./gate-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GateFormPage implements OnInit {
  isEditMode = false;
  gate: Gate = {
    GateName: '',
    GateType: 'BOTH',
    IsActive: true,
  };
  gateId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private parkingService: ParkingService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.gateId = parseInt(id, 10);
      this.loadGateData();
    }
  }

  async loadGateData() {
    if (!this.gateId) return;
    try {
      this.gate = await this.parkingService.getGate(this.gateId);
    } catch (error) {
      this.presentToast('Failed to load gate data.', 'danger');
      console.error(error);
    }
  }

  async saveGate() {
    try {
      if (this.isEditMode) {
        await this.parkingService.updateGate(this.gate);
        this.presentToast('Gate updated successfully.', 'success');
      } else {
        await this.parkingService.createGate(this.gate);
        this.presentToast('Gate created successfully.', 'success');
      }
      this.navCtrl.back();
    } catch (error) {
      this.presentToast('Failed to save gate.', 'danger');
      console.error(error);
    }
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
