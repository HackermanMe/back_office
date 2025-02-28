import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousesRoutingModule } from './houses-routing.module';
import { HousesComponent } from './houses.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { ListHouseComponent } from './list-house/list-house.component';


@NgModule({
  declarations: [
    HousesComponent,
    AddHouseComponent,
    ListHouseComponent
  ],
  imports: [
    CommonModule,
    HousesRoutingModule
  ]
})
export class HousesModule { }
