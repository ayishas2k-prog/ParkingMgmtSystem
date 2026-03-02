import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'vehicle-scanning',
    loadChildren: () => import('./vehicle-scanning/vehicle-scanning.module').then( m => m.VehicleScanningPageModule)
  },
  {
    path: 'find-vehicle',
    loadChildren: () => import('./find-vehicle/find-vehicle.module').then( m => m.FindVehiclePageModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'parking-slots',
    loadChildren: () => import('./parking-slots/parking-slots.module').then( m => m.ParkingSlotsPageModule)
  },
  {
    path: 'cost',
    loadChildren: () => import('./cost/cost.module').then( m => m.CostPageModule)
  },
  {
    path: 'locations/new',
    loadChildren: () => import('./location-form/location-form.module').then( m => m.LocationFormPageModule)
  },
  {
    path: 'locations/edit/:id',
    loadChildren: () => import('./location-form/location-form.module').then( m => m.LocationFormPageModule)
  },
  {
    path: 'gates',
    loadChildren: () => import('./gates/gates.module').then( m => m.GatesPageModule)
  },
  {
    path: 'gate-form/new',
    loadChildren: () => import('./gate-form/gate-form.module').then( m => m.GateFormPageModule)
  },
  {
    path: 'gate-form/edit/:id',
    loadChildren: () => import('./gate-form/gate-form.module').then( m => m.GateFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicStorageModule.forRoot() // Initialize storage
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
