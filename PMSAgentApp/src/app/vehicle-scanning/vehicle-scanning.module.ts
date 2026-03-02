import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleScanningPageRoutingModule } from './vehicle-scanning-routing.module';

import { VehicleScanningPage } from './vehicle-scanning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleScanningPageRoutingModule
  ]
})
export class VehicleScanningPageModule {}
