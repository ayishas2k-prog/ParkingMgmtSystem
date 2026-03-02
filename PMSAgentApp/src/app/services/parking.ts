import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

// Define an interface for the location data
export interface ParkingLocation {
  Id?: number;
  Location: string;
  LocationWayMarkings?: string;
  LocationPremises?: string;
  LocationPrefixCharacter: string;
}

export interface Gate {
  Id?: number;
  GateName: string;
  GateType: 'IN' | 'OUT' | 'BOTH';
  IsActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Location Methods
  getParkingLocations(): Promise<ParkingLocation[]> {
    return firstValueFrom(this.http.get<ParkingLocation[]>(`${this.apiUrl}/parking/location/info`));
  }

  getParkingLocation(id: string): Promise<ParkingLocation> {
    return firstValueFrom(this.http.get<ParkingLocation>(`${this.apiUrl}/parking/location/info/${id}`));
  }

  addLocation(location: ParkingLocation): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}/parking/location/info`, location));
  }

  updateLocation(location: ParkingLocation): Promise<any> {
    return firstValueFrom(this.http.put(`${this.apiUrl}/parking/location/info/${location.Id}`, location));
  }

  // Gate Methods
  getGates(): Promise<Gate[]> {
    return firstValueFrom(this.http.get<Gate[]>(`${this.apiUrl}/gates`));
  }

  getGate(id: number): Promise<Gate> {
    return firstValueFrom(this.http.get<Gate>(`${this.apiUrl}/gates/${id}`));
  }

  createGate(gate: Gate): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}/gates`, gate));
  }

  updateGate(gate: Gate): Promise<any> {
    return firstValueFrom(this.http.put(`${this.apiUrl}/gates/${gate.Id}`, gate));
  }

  deleteGate(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.apiUrl}/gates/${id}`));
  }

  // Parking Slot Methods (placeholder)
  async getParkingSlots(): Promise<any[]> {
    console.log('Fetching parking slots');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { Id: 1, SlotNumber: 'G-01', Floor: 'Ground', SlotLocation: 'Near Entrance', SlotLocationWayMarkings: 'First row' },
          { Id: 2, SlotNumber: 'F-10', Floor: 'First', SlotLocation: 'Near Elevator', SlotLocationWayMarkings: 'Second row' },
        ]);
      }, 500);
    });
  }
}
