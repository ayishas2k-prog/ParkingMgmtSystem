import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { VehicleService } from '../services/vehicle';
import { AppConstants } from '../app.component';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-scanning',
  templateUrl: './vehicle-scanning.page.html',
  styleUrls: ['./vehicle-scanning.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ZXingScannerModule],
})
export class VehicleScanningPage implements OnInit {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;
  isWeb = false;
  isScanning = false;
  imageData: string | undefined;
  scanResult: string | undefined;

 // private storage: Storage | null = null;
  
  gateName: string | undefined; 
userId: number | undefined;

  constructor(
    private vehicleService: VehicleService,
    private toastController: ToastController,
    private storage: StorageService,
    private router: Router,
  ) {
         async () => {
     // const storage = await this._storage.create();
     // this.storage = storage;
    }
  }

  async ngOnInit() {
    this.isWeb = !Capacitor.isNativePlatform();
    if (!this.isWeb) {
      Camera.requestPermissions();
      this.scanner.previewFitMode = 'scale-down';
      this.scanner.previewElemRef.nativeElement.style.width = '100%';
      this.scanner.previewElemRef.nativeElement.style.height = 'auto';
    }

    this.gateName = await this.storage.get(AppConstants.GATE_NAME_KEY);
    this.userId = await this.storage.get(AppConstants.USER_ID_KEY);

    if (!this.gateName || !this.userId) {
      this.presentToast('Gate information not found. Please log in again.', 'danger');
      //redirect to login page or handle as needed
      this.router.navigateByUrl('/login');
      return;
    }
    
    if (this.isWeb ) {
      this.startWebScan();
    }
    else {
      this.captureImageWithCapacitor();
    }
  }

  // --- Mobile-specific logic ---
  async captureImageWithCapacitor() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.imageData = image.dataUrl;
      this.isScanning = false; // Hide scanner if it was open
    } catch (error) {
      console.error('Error capturing image', error);
      this.presentToast('Error capturing image.', 'danger');
    }
  }

  // --- Web-specific logic ---
  startWebScan() {
    this.isScanning = true;
    this.imageData = undefined; // Clear any previous image
  }

  captureFrame() {
    if (this.scanner) {
      const videoElement = this.scanner.previewElemRef.nativeElement; //
      //const videoElement = (this.scanner as any)  .videoElement.nativeElement;
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        this.imageData = canvas.toDataURL('image/png');
        this.isScanning = false;
      }
    }
  }

  handleScanSuccess(result: string) {
    // This is for QR/barcode, but we can use it to display the result
    // if the scanner incidentally reads something.
    this.scanResult = result;
    console.log('Scan result:', result);
  }

  // --- Common Logic ---
  async uploadImage() {
    if (!this.imageData) {
      this.presentToast('Please capture an image first.', 'warning');
      return;
    }

    try {
      console.log(this.gateName, this.userId);
      // Assuming 'in' gate for now. This could be dynamic.
      const result = await this.vehicleService.scanVehicle(this.imageData);
      this.presentToast('Image uploaded successfully! Vehicle In.', 'success');
      console.log('Upload result:', result);
      this.imageData = undefined; // Clear image after upload
    } catch (error) {
      console.error('Error uploading image', error);
      this.presentToast('Failed to upload image.', 'danger');
    }
  }

  async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
