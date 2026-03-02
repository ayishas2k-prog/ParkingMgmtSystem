import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { NavController, IonicModule } from '@ionic/angular'; // Import NavController and IonicModule
import { CommonModule } from '@angular/common'; // Import CommonModule

export const AppConstants = {
 TOKEN_KEY: 'auth-token',
 USER_ID_KEY: 'auth-user-id',
 GATE_ID_KEY: 'auth-gate-id',
 GATE_NAME_KEY: 'auth-gate-name',
 GATE_TYPE_KEY: 'auth-gate-type',
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // Add IonicModule and CommonModule here
})
export class AppComponent {


   
  constructor(private navCtrl: NavController) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        this.navCtrl.back();
      } else {
        App.exitApp();
      }
    });
  }
}
