import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHouseComponent } from './add-house/add-house.component';
import { ListHouseComponent } from './list-house/list-house.component';

const routes: Routes = [
  { path: '', component: ListHouseComponent },
  { path: 'new', component: AddHouseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule { }
