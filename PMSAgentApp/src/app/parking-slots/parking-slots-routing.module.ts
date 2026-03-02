import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingSlotsPage } from './parking-slots.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingSlotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingSlotsPageRoutingModule {}
