import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Land } from '../../../../../models/land';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandsService } from '../../services/lands/lands.service';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MyListingComponent implements OnInit {
  lands: Land[] = [];
  filteredLands: Land[] = [];
  selectedStatus: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private landsService: LandsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyLands();
  }

  loadMyLands(): void {
    this.loading = true;
    this.error = '';
    
    this.landsService.findAll().subscribe({
      next: (response) => {
        if (response.data) {
          this.lands = response.data;
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des terrains: ' + error.message;
        this.loading = false;
      }
    });
  }

  onStatusChange(event: Event): void {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredLands = this.lands.filter(land => {
      if (!this.selectedStatus) return true;
      return land.status === this.selectedStatus;
    });
  }

  publishLand(trackingId: string): void {
    if (confirm('Êtes-vous sûr de vouloir publier cette annonce ?')) {
      this.landsService.publishLand(trackingId).subscribe({
        next: () => {
          this.loadMyLands();
        },
        error: (error) => {
          this.error = 'Erreur lors de la publication: ' + error.message;
        }
      });
    }
  }

  archiveLand(trackingId: string): void {
    if (confirm('Êtes-vous sûr de vouloir archiver cette annonce ?')) {
      this.landsService.archiveLand(trackingId).subscribe({
        next: () => {
          this.loadMyLands();
        },
        error: (error) => {
          this.error = 'Erreur lors de l\'archivage: ' + error.message;
        }
      });
    }
  }

  editLand(trackingId: string): void {
    this.router.navigate(['/dashboard/lands/edit', trackingId]);
  }

  deleteLand(trackingId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.landsService.delete(trackingId).subscribe({
        next: () => {
          this.loadMyLands();
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression: ' + error.message;
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

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'BROUILLON': return 'bg-warning';
      case 'PUBLIE': return 'bg-success';
      case 'ARCHIVE': return 'bg-secondary';
      default: return 'bg-primary';
    }
  }
}
