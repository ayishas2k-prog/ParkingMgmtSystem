import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CostService {

  constructor() { }

  async getCostSettings(): Promise<any> {
    console.log('Fetching cost settings');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          hourlyRate: 2.50,
          nightChargeHourly: 3.00,
          dailyRate: 20.00,
          weeklyRate: 100.00,
          monthlyRate: 300.00,
        });
      }, 500);
    });
  }

  async updateCostSettings(settings: any): Promise<any> {
    console.log('Updating cost settings:', settings);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Cost settings updated' });
      }, 500);
    });
  }
}
