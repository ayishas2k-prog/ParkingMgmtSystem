import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingSlotsPageRoutingModule } from './parking-slots-routing.module';

import { ParkingSlotsPage } from './parking-slots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingSlotsPageRoutingModule
  ]
})
export class ParkingSlotsPageModule {}
