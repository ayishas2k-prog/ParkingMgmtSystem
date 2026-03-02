import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService, User } from '../services/auth';
import { VehicleService } from '../services/vehicle';
import { NotificationService } from '../services/notification';

@Component({
  standalone: false,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  user: User | null = null;
  recentParking: any = null;
  unreadCount: number = 0;

  /**
   * Tab1Page constructor
   * @param authService AuthService for user data and logout
   * @param vehicleService VehicleService for parking information
   * @param notificationService NotificationService for notifications
   * @param navCtrl NavController for navigation
   */
  constructor(
    private authService: AuthService,
    private vehicleService: VehicleService,
    private notificationService: NotificationService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  ionViewWillEnter() {
    this.loadDashboardData();
  }

  /**
   * Loads dashboard data including recent parking and notification count
   */
  loadDashboardData() {
    // Get last parking info (Mocking with the first vehicle's last parking for now)
    this.vehicleService.getVehicles().subscribe(vehicles => {
      if (vehicles && vehicles.length > 0) {
        this.vehicleService.getVehicleById(vehicles[0].id!).subscribe(v => {
          this.recentParking = v.lastParkingInfo;
        });
      }
    });

    // Get unread notification count
    this.notificationService.getUnreadNotifications().subscribe(notifications => {
      this.unreadCount = notifications.length;
    });
  }

  /**
   * Navigates to the notifications page
   */
  goToNotifications() {
    this.navCtrl.navigateForward('/tabs/notifications');
  }

  /**
   * Navigates to the vehicles page
   */
  goToVehicles() {
    this.navCtrl.navigateForward('/tabs/vehicles');
  }

  /**
   * Navigates to the payments page
   */
  goToPayments() {
    this.navCtrl.navigateForward('/tabs/payments');
  }

  /**
   * Logs out the user and navigates to the login page
   */
  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
