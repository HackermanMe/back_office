import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../../services/cars/cars.service';
import { Car } from '../../../../../../models/cars';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-car',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './list-car.component.html',
  styleUrl: './list-car.component.css'
})
export class ListCarComponent implements OnInit {
  cars: Car[] = [];
  allCars: Car[] = [];
  selectedMarque: string = '';
  searchQuery: string = '';

  constructor(
    private carsService: CarsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  

  loadCars(): void {
    this.carsService.findAll().subscribe({
      next: (response) => {
        if (response.data) {
          console.log('response.data', response.data);
          this.cars = response.data;
          this.allCars = this.cars;
          console.log(this.allCars[0].trackingid); // undefined
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
      }
    });
  }

  filterByMarque(event: Event): void {
    const marque = (event.target as HTMLSelectElement).value;
    this.selectedMarque = marque;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.allCars = this.cars.filter(car => {
      const matchesMarque = !this.selectedMarque || car.modele?.marque?.nom === this.selectedMarque;
      const matchesSearch = !this.searchQuery || 
        car.titre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.modele?.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.annee.toString().includes(this.searchQuery);
      return matchesMarque && matchesSearch;
    });
  }

  getUniqueMarques(): string[] {
    const marques = new Set<string>();
    this.cars.forEach(car => {
      if (car.modele?.marque?.nom) {
        marques.add(car.modele.marque.nom);
      }
    });
    return Array.from(marques);
  }

  editCar(trackingId: string): void {
    this.router.navigate(['admin/dashboard/cars/edit', trackingId]);
  }

  deleteCar(trackingId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture : ' + trackingId + ' ?')) {
      this.carsService.delete(trackingId).subscribe({
        next: () => {
          this.loadCars();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}
