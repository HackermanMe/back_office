import { Component } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
import { HousesService } from '../../services/houses/houses.service';
import { Car } from '../../../../../models/cars';
import { House } from '../../../../../models/house';

@Component({
  selector: 'app-body',
  standalone: false,
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  constructor(private housesService: HousesService, private carsService: CarsService) {}

  houses: number = 0;
  cars: number = 0;

  ngOnInit(): void {
    this.housesService.findAll().subscribe(houses => {
      this.houses = houses.data.length;
    });
    this.carsService.findAll().subscribe(cars => {
      this.cars = cars.data.length;
    });
  }
}
