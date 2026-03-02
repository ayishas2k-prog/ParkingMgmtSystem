import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindVehiclePageRoutingModule } from './find-vehicle-routing.module';

import { FindVehiclePage } from './find-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindVehiclePageRoutingModule
  ]
})
export class FindVehiclePageModule {}
