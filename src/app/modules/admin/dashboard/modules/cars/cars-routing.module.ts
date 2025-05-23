import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { ListCarComponent } from './list-car/list-car.component';

const routes: Routes = [
  { path: '', component: ListCarComponent },
  { path: 'new', component: AddCarComponent },
  { path: 'edit/:id', component: AddCarComponent },
  // { path: 'bookings', component: BookingsComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
