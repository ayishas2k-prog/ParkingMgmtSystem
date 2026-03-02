import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { NotificationService, Notification } from '../services/notification';

@Component({
  standalone: false,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  notifications: Notification[] = [];

  /**
   * Tab3Page constructor
   * @param notificationService NotificationService for fetching and updating notifications
   * @param loadingCtrl LoadingController for showing loading status
   * @param toastCtrl ToastController for showing operation results
   */
  constructor(
    private notificationService: NotificationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadNotifications();
  }

  ionViewWillEnter() {
    this.loadNotifications();
  }

  /**
   * Loads unread notifications from the service
   */
  async loadNotifications() {
    const loading = await this.loadingCtrl.create({ message: 'Fetching notifications...' });
    await loading.present();

    this.notificationService.getUnreadNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        this.showToast('Failed to load notifications.', 'danger');
      }
    });
  }

  /**
   * Marks a notification as read and removes it from the list
   * @param id The ID of the notification to mark as read
   */
  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.showToast('Notification cleared.', 'success');
      },
      error: () => this.showToast('Failed to clear notification.', 'danger')
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
      duration: 2000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
