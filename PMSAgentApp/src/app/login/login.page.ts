import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParkingService, Gate } from '../services/parking';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string;
  selectedGateId: number | undefined;
  gates: Gate[] = [];

  constructor(
    private authService: AuthService,
    private parkingService: ParkingService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadGates();
  }

  async loadGates() {
    try {
      this.gates = await this.parkingService.getGates();
      if (this.gates.length > 0) {
        this.selectedGateId = this.gates[0].Id; // Default to the first gate
      }
    } catch (error) {
      this.presentToast('Failed to load gates. Please try again.', 'danger');
      console.error('Failed to load gates', error);
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Please enter both email and password.', 'warning');
      return;
    }
    if (!this.selectedGateId) {
      this.presentToast('Please select a gate.', 'warning');
      return;
    }

    try {
      // The login response should ideally contain the userId.
      // We'll pass the gateId and userId to be stored.

      const selectedGate = this.gates.find(g => g.Id === this.selectedGateId);
console.log(selectedGate);
      const response = await this.authService.login(this.email, this.password, selectedGate?.Id, 
        selectedGate?.GateName, selectedGate?.GateType);

      this.presentToast('Login successful!', 'success');
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      console.error('Login failed', error);
      const errorMessage =
        error.error?.message || 'Login failed. Please check your credentials.';
      this.presentToast(errorMessage, 'danger');
    }
  }
}
