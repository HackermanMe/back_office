import { Component, OnInit } from '@angular/core';
import { HousesService } from '../../../services/houses/houses.service';
import { House } from '../../../../../../models/house';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-house',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './list-house.component.html',
  styleUrl: './list-house.component.css'
})
export class ListHouseComponent implements OnInit {
  houses: House[] = [];
  allHouses: House[] = [];
  selectedType: string = '';
  searchQuery: string = '';

  constructor(
    private housesService: HousesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  loadHouses(): void {
    this.housesService.findAll().subscribe({
      next: (response) => {
        if (response.data) {
          console.log('response.data', response.data);
          this.houses = response.data;
          this.allHouses = this.houses;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des maisons:', error);
      }
    });
  }

  filterByType(event: Event): void {
    const type = (event.target as HTMLSelectElement).value;
    this.selectedType = type;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.allHouses = this.houses.filter(house => {
      const matchesType = !this.selectedType || house.type === this.selectedType;
      const matchesSearch = !this.searchQuery || 
        house.titre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        house.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        house.ville.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }

  getUniqueTypes(): string[] {
    const types = new Set<string>();
    this.houses.forEach(house => {
      if (house.type) {
        types.add(house.type);
      }
    });
    return Array.from(types);
  }

  editHouse(trackingId: string | undefined): void {
    if (trackingId) {
      this.router.navigate(['admin/dashboard/houses/edit', trackingId]);
    }
  }

  deleteHouse(trackingId: string): void {
    if (trackingId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette maison : ' + trackingId + ' ?')) {
        this.housesService.delete(trackingId).subscribe({
          next: () => {
            this.loadHouses();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression:', error);
          }
        });
      }
    }
  }
}
