import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandsRoutingModule } from './lands-routing.module';
import { LandsComponent } from './lands.component';
import { AddLandComponent } from './add-land/add-land.component';
import { ListLandComponent } from './list-land/list-land.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandsService } from '../../services/lands/lands.service';

@NgModule({
  declarations: [
    LandsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LandsRoutingModule,
    FormsModule,
    HttpClientModule,
    ListLandComponent,
    AddLandComponent
  ],
  providers: [
    LandsService
  ]
})
export class LandsModule { }
