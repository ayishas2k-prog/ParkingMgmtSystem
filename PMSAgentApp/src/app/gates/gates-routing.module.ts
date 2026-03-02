import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GatesPage } from './gates.page';

const routes: Routes = [
  {
    path: '',
    component: GatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GatesPageRoutingModule {}
