import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  /**
   * LoginPage constructor
   * @param fb FormBuilder for creating the login form
   * @param authService AuthService for handling login
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  /**
   * Handles the login process
   */
  async onLogin() {
    if (this.loginForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Logging in...',
      });
      await loading.present();

      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          loading.dismiss();
          this.navCtrl.navigateRoot('/tabs/tab1');
        },
        error: async (err) => {
          loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: 'Login failed. Please check your credentials.',
            duration: 3000,
            position: 'bottom',
            color: 'danger'
          });
          toast.present();
        }
      });
    }
  }

  /**
   * Handles Google Login process
   */
  async onGoogleLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating with Google...',
    });
    await loading.present();

    this.authService.googleAuth().subscribe({
      next: (res) => {
        loading.dismiss();
        this.navCtrl.navigateRoot('/tabs/tab1');
      },
      error: async (err) => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Google Login failed.',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  /**
   * Navigates to the registration page
   */
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
