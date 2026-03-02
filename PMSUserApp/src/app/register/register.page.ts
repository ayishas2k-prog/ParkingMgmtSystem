import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  /**
   * RegisterPage constructor
   * @param fb FormBuilder for creating the registration form
   * @param authService AuthService for handling registration
   * @param navCtrl NavController for navigation
   * @param toastCtrl ToastController for showing messages
   * @param loadingCtrl LoadingController for showing loading indicator
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  /**
   * Custom validator to check if passwords match
   * @param g FormGroup to validate
   * @returns null if passwords match, or an error object
   */
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  /**
   * Handles the registration process
   */
  async onRegister() {
    if (this.registerForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Creating account...',
      });
      await loading.present();

      const { confirmPassword, ...userData } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (res) => {
          loading.dismiss();
          this.showToast('Account created successfully! Please login.', 'success');
          this.navCtrl.navigateBack('/login');
        },
        error: (err) => {
          loading.dismiss();
          this.showToast('Registration failed. Email might already be in use.', 'danger');
        }
      });
    }
  }

  /**
   * Shows a toast message
   * @param message Message to display
   * @param color Color of the toast
   */
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    toast.present();
  }

  /**
   * Navigates back to the login page
   */
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
