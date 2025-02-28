import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BodyComponent } from './components/body/body.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: BodyComponent },
      { path: 'cars', loadChildren: () => import('./modules/cars/cars.module').then(m => m.CarsModule) },
      { path: 'houses', loadChildren: () => import('./modules/houses/houses.module').then(m => m.HousesModule) },
      { path: 'lands', loadChildren: () => import('./modules/lands/lands.module').then(m => m.LandsModule) },
      { path: 'my-listings', loadChildren: () => import('./modules/my-listing/my-listing.module').then(m => m.MyListingModule) },
      { path: 'favorites', loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
