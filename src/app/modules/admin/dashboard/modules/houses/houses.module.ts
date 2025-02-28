import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousesRoutingModule } from './houses-routing.module';
import { HousesComponent } from './houses.component';
import { ListHouseComponent } from './list-house/list-house.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HousesService } from '../../services/houses/houses.service';
import { AddHouseComponent } from './add-house/add-house.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    HousesComponent,
  ],
  imports: [
    CommonModule,
    HousesRoutingModule,
    ListHouseComponent,
    AddHouseComponent,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    HousesService
  ]
})
export class HousesModule { }
