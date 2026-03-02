import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GatesPageRoutingModule } from './gates-routing.module';

import { GatesPage } from './gates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GatesPageRoutingModule,
    GatesPage
  ],
  declarations: []
})
export class GatesPageModule {}
