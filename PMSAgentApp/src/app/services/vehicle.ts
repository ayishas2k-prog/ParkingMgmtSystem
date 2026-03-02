import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage';
import { AppConstants } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private strorage: StorageService) { }

  getVehicleInfo(vehicleNumber: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.apiUrl}/vehicles/info/${vehicleNumber}`));
  }

  async scanVehicle(imageData: string): Promise<any> {
    const gateName = await this.strorage.get(AppConstants.GATE_NAME_KEY);
    const userId = await this.strorage.get(AppConstants.USER_ID_KEY);
    const payload = {
      VImage: imageData, // The base64 image data
      GateName: gateName,
      UserId: userId
    };
    return firstValueFrom(this.http.post(`${this.apiUrl}/vehicles/inout`, payload));
  }
}
