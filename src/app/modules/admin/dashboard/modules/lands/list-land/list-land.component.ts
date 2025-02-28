import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LandsService } from '../../../services/lands/lands.service';
import { Land } from '../../../../../../models/land';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-land',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './list-land.component.html',
  styleUrl: './list-land.component.css'
})
export class ListLandComponent implements OnInit {
  lands: Land[] = [];
  filteredLands: Land[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedPriceRange: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private landsService: LandsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Initialisation du composant ListLand');
    this.loadLands();
  }

  loadLands(): void {
    this.loading = true;
    this.error = '';
    console.log('Chargement des terrains...');

    this.landsService.findAll().subscribe({
      next: (response) => {
        console.log('Réponse reçue du service:', response);
        if (response.data) {
          this.lands = response.data;
          console.log('Terrains chargés:', this.lands);
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des terrains: ' + error.message;
        console.error(this.error);
        this.loading = false;
      }
    });
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    console.log('Recherche en cours:', this.searchQuery);
    this.applyFilters();
  }

  onStatusChange(event: Event): void {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    console.log('Changement de statut:', this.selectedStatus);
    this.applyFilters();
  }

  onPriceRangeChange(event: Event): void {
    this.selectedPriceRange = (event.target as HTMLSelectElement).value;
    console.log('Changement de plage de prix:', this.selectedPriceRange);
    this.applyFilters();
  }

  resetFilters(): void {
    console.log('Réinitialisation des filtres');
    this.searchQuery = '';
    this.selectedStatus = '';
    this.selectedPriceRange = '';
    this.applyFilters();
  }

  private applyFilters(): void {
    console.log('Application des filtres...');
    this.filteredLands = this.lands.filter(land => {
      let matchesSearch = true;
      let matchesStatus = true;
      let matchesPriceRange = true;

      // Filtre de recherche
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        matchesSearch = land.titre.toLowerCase().includes(searchLower) ||
                       land.ville.toLowerCase().includes(searchLower) ||
                       land.adresse.toLowerCase().includes(searchLower);
        console.log('Correspondance de recherche:', matchesSearch);
      }

      // Filtre de statut (à implémenter selon vos besoins)
      if (this.selectedStatus) {
        // Exemple : matchesStatus = land.status === this.selectedStatus;
        console.log('Correspondance de statut:', matchesStatus);
      }

      // Filtre de prix
      if (this.selectedPriceRange) {
        const [min, max] = this.selectedPriceRange.split('-').map(Number);
        if (max) {
          matchesPriceRange = land.prix >= min && land.prix <= max;
        } else {
          matchesPriceRange = land.prix >= min;
        }
        console.log('Correspondance de prix:', matchesPriceRange);
      }

      return matchesSearch && matchesStatus && matchesPriceRange;
    });
    console.log('Terrains filtrés:', this.filteredLands);
  }

  editLand(trackingId: string): void {
    console.log('Édition du terrain avec ID:', trackingId);
    this.router.navigate(['/dashboard/lands/edit', trackingId]);
  }

  deleteLand(trackingId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce terrain ?')) {
      console.log('Suppression du terrain avec ID:', trackingId);
      this.landsService.delete(trackingId).subscribe({
        next: () => {
          console.log('Terrain supprimé avec succès');
          this.loadLands();
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression: ' + error.message;
          console.error(this.error);
        }
      });
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR');
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price);
  }

  publishLand(trackingId: string): void {
    if (confirm('Êtes-vous sûr de vouloir publier ce terrain ?')) {
      this.landsService.publishLand(trackingId).subscribe({
        next: () => {
          this.loadLands();
        },
        error: (error) => {
          this.error = 'Erreur lors de la publication: ' + error.message;
        }
      });
    }
  }
}
