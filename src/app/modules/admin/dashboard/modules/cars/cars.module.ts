import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarsRoutingModule } from './cars-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CarsService } from '../../services/cars/cars.service';
import { ModeleService } from '../../services/modele/modele.service';
import { MarqueService } from '../../services/marque/marque.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CarsRoutingModule,
    HttpClientModule
  ],
  providers: [
    CarsService,
    ModeleService,
    MarqueService
  ]
})
export class CarsModule { }
