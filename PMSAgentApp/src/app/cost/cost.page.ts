import { Component, OnInit } from '@angular/core';
import { CostService } from '../services/cost';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]

@Component({
  selector: 'app-cost',
  templateUrl: './cost.page.html',
  styleUrls: ['./cost.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule] // Add IonicModule and FormsModule here
})
export class CostPage implements OnInit {
  costSettings: any = { // Define a proper interface later
    hourlyRate: 0,
    nightChargeHourly: 0,
    dailyRate: 0,
    weeklyRate: 0,
    monthlyRate: 0,
  };

  constructor(private costService: CostService) { }

  ngOnInit() {
    this.loadCostSettings();
  }

  async loadCostSettings() {
    // For now, using mock data. Later this will come from CostService
    this.costSettings = {
      hourlyRate: 2.50,
      nightChargeHourly: 3.00,
      dailyRate: 20.00,
      weeklyRate: 100.00,
      monthlyRate: 300.00,
    };
    // In a real app:
    // this.costSettings = await this.costService.getCostSettings();
  }

  async saveCosts() {
    try {
      // await this.costService.updateCostSettings(this.costSettings);
      console.log('Cost settings saved:', this.costSettings);
      alert('Cost settings updated successfully!');
    } catch (error) {
      console.error('Error saving cost settings:', error);
      alert('Failed to update cost settings.');
    }
  }
}
