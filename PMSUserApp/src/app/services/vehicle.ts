import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vehicle {
  id?: number;
  VehicleNumber: string;
  Description?: string;
  Model?: string;
  Type?: string;
  Nickname?: string;
  lastParkingInfo?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/user/vehicles`;

  /**
   * VehicleService constructor
   * @param http HttpClient for making API requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets auth headers for API requests
   * @returns HttpHeaders with authorization token
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Gets all vehicles owned by the logged-in user
   * @returns Observable of an array of vehicles
   */
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Gets a specific vehicle with its last parking information
   * @param id The ID of the vehicle
   * @returns Observable of the vehicle object
   */
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  /**
   * Adds a new vehicle
   * @param vehicle Vehicle data to be created
   * @returns Observable of the created vehicle
   */
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle, { headers: this.getHeaders() });
  }

  /**
   * Updates an existing vehicle
   * @param id The ID of the vehicle to update
   * @param vehicle Updated vehicle data
   * @returns Observable of the updated vehicle
   */
  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle, { headers: this.getHeaders() });
  }

  /**
   * Deletes a vehicle
   * @param id The ID of the vehicle to delete
   * @returns Observable of the deletion response
   */
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
