import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLandComponent } from './add-land/add-land.component';
import { ListLandComponent } from './list-land/list-land.component';

const routes: Routes = [
  { path: '', component: ListLandComponent },
  { path: 'new', component: AddLandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandsRoutingModule { }
