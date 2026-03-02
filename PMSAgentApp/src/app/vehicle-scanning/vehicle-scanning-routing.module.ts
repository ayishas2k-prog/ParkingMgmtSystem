import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleScanningPage } from './vehicle-scanning.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleScanningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleScanningPageRoutingModule {}
