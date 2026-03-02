import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindVehiclePage } from './find-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: FindVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindVehiclePageRoutingModule {}
