import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { PaymentService, Payment } from '../services/payment';

@Component({
  standalone: false,
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  payments: Payment[] = [];

  /**
   * PaymentsPage constructor
   * @param paymentService PaymentService for payment operations
   * @param loadingCtrl LoadingController for showing loading status
   * @param toastCtrl ToastController for showing operation results
   * @param alertCtrl AlertController for payment confirmation
   */
  constructor(
    private paymentService: PaymentService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadPayments();
  }

  ionViewWillEnter() {
    this.loadPayments();
  }

  /**
   * Loads all pending payments from the service
   */
  async loadPayments() {
    const loading = await this.loadingCtrl.create({ message: 'Fetching pending payments...' });
    await loading.present();

    this.paymentService.getPendingPayments().subscribe({
      next: (data) => {
        this.payments = data;
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        this.showToast('Failed to load payments.', 'danger');
      }
    });
  }

  /**
   * Initiates payment for a selected pending payment
   * @param payment The payment object to process
   */
  async processPayment(payment: Payment) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Payment',
      message: `Do you want to pay ${payment.amount} for vehicle ${payment.vehicleNumber}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Pay with Google Pay',
          handler: () => {
            this.handleGPay(payment);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Handles the Google Pay transaction flow
   * @param payment The payment object to process
   */
  async handleGPay(payment: Payment) {
    const loading = await this.loadingCtrl.create({ message: 'Processing GPay transaction...' });
    await loading.present();

    this.paymentService.initiateGooglePay(payment.amount).subscribe({
      next: (gpayRes) => {
        if (gpayRes.success) {
          this.paymentService.updatePayment(payment.id, {
            status: 'paid',
            transactionId: gpayRes.transactionId,
            paymentMethod: 'GooglePay'
          }).subscribe({
            next: () => {
              loading.dismiss();
              this.showToast('Payment successful!', 'success');
              this.loadPayments();
            },
            error: () => {
              loading.dismiss();
              this.showToast('Payment confirmed but failed to update record. Please contact support.', 'warning');
            }
          });
        }
      },
      error: () => {
        loading.dismiss();
        this.showToast('Google Pay transaction failed.', 'danger');
      }
    });
  }

  /**
   * Shows a toast message
   * @param message The message to display
   * @param color The color of the toast
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
}
